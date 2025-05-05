"use client"

import { useState, useRef, useEffect, useCallback } from 'react'

interface UseSpeechToTextReturn {
  isListening: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  error: string | null
}

interface SpeechToTextOptions {
  sttEngine?: 'deepgram' | 'whisper'
  autoStop?: number // milliseconds of silence to auto-stop
}

export function useSpeechToText(options: SpeechToTextOptions = {}): UseSpeechToTextReturn {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const finalTranscriptReceivedRef = useRef(false)
  const lastTranscriptRef = useRef('')
  const wsRef = useRef<WebSocket | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const autoStopTimerRef = useRef<NodeJS.Timeout | null>(null)

  const sttEngine = options.sttEngine || 'deepgram'
  const autoStop = options.autoStop || 0

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  const resetAutoStopTimer = useCallback(() => {
    if (!autoStop) return
    if (autoStopTimerRef.current) clearTimeout(autoStopTimerRef.current)
    autoStopTimerRef.current = setTimeout(() => {
      console.log('Auto-stopping due to silence')
      stopListening()
    }, autoStop)
  }, [autoStop])

  const stopListening = useCallback(() => {
    if (!isListening) return
    console.log('Stopping speech recognition')
    setIsListening(false)

    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current)
      autoStopTimerRef.current = null
    }

    // Stop MediaRecorder (non-Safari)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop()
      } catch (e) {
        console.error('Error stopping MediaRecorder:', e)
      }
      mediaRecorderRef.current = null
    }

    // Stop AudioContext and processor (Safari)
    if (processorRef.current) {
      try {
        processorRef.current.disconnect()
      } catch (e) {
        console.error('Error disconnecting processor:', e)
      }
      processorRef.current = null
    }
    
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close()
      } catch (e) {
        console.error('Error closing AudioContext:', e)
      }
      audioContextRef.current = null
    }

    // Stop mic stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop()
        } catch (e) {
          console.error('Error stopping track:', e)
        }
      })
      streamRef.current = null
    }

    // Close WebSocket
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || 
          wsRef.current.readyState === WebSocket.CONNECTING) {
        try {
          wsRef.current.close(1000, 'Stopped listening')
        } catch (e) {
          console.error('Error closing WebSocket:', e)
        }
      }
      wsRef.current = null
    }

    console.log('Successfully stopped all listening resources')
  }, [isListening])

  const startListening = useCallback(async () => {
    // Guard against multiple startListening calls
    if (isListening || wsRef.current) {
      console.log('Already listening, ignoring start request')
      return
    }

    try {
      console.log('Starting speech recognition')
      setError(null)
      setTranscript('')
      lastTranscriptRef.current = ''
      finalTranscriptReceivedRef.current = false
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Create a new WebSocket connection
      const wsUrl = 'ws://localhost:8080/ws/audio'
      const socket = new WebSocket(wsUrl)
      wsRef.current = socket

      socket.onopen = () => {
        console.log('🎧 WebSocket connected for speech recognition')
        setIsListening(true)

        if (isSafari) {
          // Safari: use Web Audio API
          const audioContext = new AudioContext({ sampleRate: 16000 }) // Deepgram prefers 16kHz
          audioContextRef.current = audioContext

          const source = audioContext.createMediaStreamSource(stream)
          const processor = audioContext.createScriptProcessor(4096, 1, 1)
          processorRef.current = processor

          processor.onaudioprocess = (e) => {
            // Only send audio if we haven't received a final transcript
            if (finalTranscriptReceivedRef.current) {
              return
            }
            
            if (socket.readyState !== WebSocket.OPEN) {
              return
            }
            
            const input = e.inputBuffer.getChannelData(0)
            const pcmBuffer = convertFloat32ToInt16(input)
            socket.send(pcmBuffer)
            resetAutoStopTimer()
          }

          source.connect(processor)
          processor.connect(audioContext.destination)
        } else {
          // Other browsers: use MediaRecorder
          let mimeType = ''
          if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            mimeType = 'audio/webm;codecs=opus'
          } else if (MediaRecorder.isTypeSupported('audio/webm')) {
            mimeType = 'audio/webm'
          } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
            mimeType = 'audio/ogg;codecs=opus'
          } else {
            setError('No supported audio mimeType found')
            return
          }

          const mediaRecorder = new MediaRecorder(stream, { mimeType })
          mediaRecorderRef.current = mediaRecorder

          mediaRecorder.ondataavailable = (event) => {
            // Only send audio if we haven't received a final transcript
            if (finalTranscriptReceivedRef.current) {
              return
            }
            
            if (socket.readyState !== WebSocket.OPEN) {
              return
            }
            
            if (event.data.size > 0) {
              socket.send(event.data)
              resetAutoStopTimer()
            }
          }

          mediaRecorder.start(100)
        }
      }

      socket.onmessage = (event) => {
        try {
          // Guard against processing messages after component unmount
          if (finalTranscriptReceivedRef.current) {
            console.log('Ignoring message received after final transcript')
            return
          }

          console.log('Received message from WebSocket:', event.data)
          const data = JSON.parse(event.data)
          let text = ''
          let isFinal = false

          if (sttEngine === 'deepgram') {
            // Extract transcript from Deepgram format
            if (data.channel?.alternatives?.[0]) {
              text = data.channel.alternatives[0].transcript
              
              // Check if this is marked as final by our backend
              isFinal = data.isFinal === true;
              
              // Or check Deepgram's native "is_final" flag
              if (data.is_final === true) {
                isFinal = true;
              }
            }
          } else {
            // Handle Whisper format
            text = data.text || ''
            isFinal = data.isFinal === true;
          }

          // Only process if we have actual text
          if (text && text.trim()) {
            const trimmedText = text.trim()
            
            // Detect if this is a final transcript by punctuation
            const hasFinalPunctuation = /[.?!]$/.test(trimmedText)
            
            // Set as final if backend marked it or it has final punctuation
            if (isFinal || hasFinalPunctuation) {
              console.log('Final transcript detected:', trimmedText)
              finalTranscriptReceivedRef.current = true
              
              // Make sure we set the transcript one last time
              if (trimmedText !== lastTranscriptRef.current) {
                lastTranscriptRef.current = trimmedText
                setTranscript(trimmedText)
              }
              
              // Stop listening immediately to prevent more transcriptions
              stopListening()
              return
            }
            
            // Only update the transcript if it's different from the last one
            if (trimmedText !== lastTranscriptRef.current) {
              lastTranscriptRef.current = trimmedText
              setTranscript(trimmedText)
              resetAutoStopTimer()
            }
          }
        } catch (e) {
          console.error('Error processing transcription:', e)
        }
      }

      socket.onerror = (err) => {
        console.error('WebSocket error:', err)
        setError('WebSocket connection failed')
        stopListening()
      }

      socket.onclose = (event) => {
        console.log(`WebSocket closed: ${event.code} ${event.reason}`)
        // Only call stopListening if we're still in the listening state
        if (isListening) {
          stopListening()
        }
      }

    } catch (err) {
      console.error('Microphone error:', err)
      setError(err instanceof Error ? err.message : 'Microphone access error')
      stopListening()
    }
  }, [isListening, sttEngine, resetAutoStopTimer, stopListening, isSafari])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('Component unmounting, cleaning up speech recognition')
      stopListening()
    }
  }, [stopListening])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error
  }
}

// Helper: Convert Float32 PCM → Int16 PCM (required by Deepgram for raw audio)
function convertFloat32ToInt16(buffer: Float32Array): ArrayBuffer {
  const l = buffer.length
  const result = new Int16Array(l)
  for (let i = 0; i < l; i++) {
    const s = Math.max(-1, Math.min(1, buffer[i]))
    result[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
  }
  return result.buffer
}