"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { Message, RAGResponse } from "@/types/rag"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Send,
  Loader2,
  Brain,
  Filter,
  Mic,
  Volume2,
  AlertCircle,
  MicOff,
  Settings,
  MessageSquare,
  Save,
  Bug,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import RAGMessage from "./rag-message"
import { v4 as uuidv4 } from "uuid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useWakeWordWebSocket } from "./use-wake-word-socket"
import { useSpeechToText } from "@/hooks/uesSpeechToText"
import DiagnosticPanel from "@/components/DiagnosticPanel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WakeWordTraining from "./WakeWordTraining"
import WebSocketDiagnostic from "./WebSocketDiagnostic"

export default function RAGAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-welcome",
      role: "assistant",
      content: "Welcome to the SurgeReady Knowledge Assistant. How can I help you with emergency protocols today?",
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // UI state for toggleable panels
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  // Wake word state from our custom hook
  const { connected: wsConnected, error: wsError, wakeWordEvent, setWakeWordEvent } = useWakeWordWebSocket()
  const [wakeWordNotification, setWakeWordNotification] = useState<{ wakeWord: string, agent: string | null } | null>(null)

  // Logging state
  const [debugLogs, setDebugLogs] = useState<string[]>([])

  // Add to debug logs
  const addDebugLog = (message: string) => {
    console.log(message) // Also log to console
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // Speech-to-text state
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    error: sttError
  } = useSpeechToText({
    sttEngine: 'deepgram',
    autoStop: 2000 // Auto-stop after 2 seconds of silence
  })

  // Filters
  const [emergencyType, setEmergencyType] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [useFilters, setUseFilters] = useState(false)

  // Process wake word events
  useEffect(() => {
    if (wakeWordEvent && wakeWordEvent.type === 'wake_word_detected') {
      addDebugLog(`Wake word detected: ${wakeWordEvent.wakeWord}`)
      setWakeWordNotification({
        wakeWord: wakeWordEvent.wakeWord,
        agent: wakeWordEvent.agentId || null
      })

      // Auto-set filters based on agent type
      if (wakeWordEvent.agentId) {
        if (wakeWordEvent.agentId === 'mass_casualty') {
          setEmergencyType('Mass Casualty')
          setUseFilters(true)
        } else if (wakeWordEvent.agentId === 'chemical') {
          setEmergencyType('Chemical Exposure')
          setUseFilters(true)
        } else if (wakeWordEvent.agentId === 'active_shooter') {
          setEmergencyType('Active Shooter')
          setUseFilters(true)
        }
      }

      // Start listening for speech input
      startListening()

      // Clear the wake word notification after 3 seconds
      setTimeout(() => {
        setWakeWordNotification(null)
      }, 3000)

      // Clear the event so we don't process it again
      setWakeWordEvent(null)
    }
  }, [wakeWordEvent, startListening, setWakeWordEvent, addDebugLog])

  const [submittedTranscripts, setSubmittedTranscripts] = useState<Set<string>>(new Set());
  // Process speech-to-text results
  useEffect(() => {
    if (!transcript || isLoading || transcript.trim() === '') return;

    const trimmedTranscript = transcript.trim();
    addDebugLog(`Got transcript: ${trimmedTranscript}`);

    // Always update the input field with what was transcribed
    setInput(trimmedTranscript);

    // Check if this transcript has already been submitted to avoid duplicates
    if (submittedTranscripts.has(trimmedTranscript)) {
      addDebugLog(`Transcript already submitted, ignoring: ${trimmedTranscript}`);
      return;
    }

    // Check if this is a "complete" transcript (ends with punctuation)
    const isCompleteTranscript = /[.!?]$/.test(trimmedTranscript);

    if (isCompleteTranscript && !isListening) {
      addDebugLog(`Auto-submitting complete transcript: ${trimmedTranscript}`);

      // Add to set of submitted transcripts to prevent resubmission
      setSubmittedTranscripts(prev => {
        const newSet = new Set(prev);
        newSet.add(trimmedTranscript);
        return newSet;
      });

      // Submit the query
      submitQuery(trimmedTranscript);
    }
  }, [transcript, isLoading, isListening]);


  const handleStopListening = () => {
    // First, capture the current transcript before stopping
    const currentTranscript = transcript.trim();
    const hasBeenSubmitted = submittedTranscripts.has(currentTranscript);

    // Stop listening
    stopListening();

    // Submit the query if we have text but it didn't auto-submit and hasn't been submitted yet
    if (currentTranscript && !isLoading && !hasBeenSubmitted) {
      addDebugLog(`Manually submitting transcript after stopping: ${currentTranscript}`);
      submitQuery(currentTranscript);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Diagnostic functions
  const handleSimulateWakeWord = async (wakeWord: string, agentId?: string) => {
    addDebugLog(`Simulating wake word: ${wakeWord} with agent: ${agentId || 'none'}`)
    try {
      // Check if the wake word exists and if it has an agent mapping
      let agentMapping = null;
      try {
        const agentResponse = await fetch(`${BACKEND_URL}/api/wake-word-v2/agent/${encodeURIComponent(wakeWord)}`);
        if (agentResponse.ok) {
          agentMapping = await agentResponse.json();
          addDebugLog(`Found agent mapping: ${JSON.stringify(agentMapping)}`);
        }
      } catch (e) {
        addDebugLog(`Could not fetch agent mapping: ${e}`);
      }

      // Use the diagnostics API if available, otherwise just use wake word event
      const url = `${BACKEND_URL}/api/audio-diagnostics/test-wake-word?wakeWord=${encodeURIComponent(wakeWord)}${agentId ? `&agentId=${encodeURIComponent(agentId)}` : ''}`

      const response = await fetch(url)

      // Check response status before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API returned status ${response.status}: ${errorText}`)
      }

      // Try to parse the JSON response
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${await response.text()}`)
      }

      addDebugLog(`Simulation response: ${JSON.stringify(data)}`)
    } catch (error) {
      addDebugLog(`Simulation error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleTestMicrophone = async () => {
    addDebugLog('Testing microphone...')
    try {
      const response = await fetch(`${BACKEND_URL}/api/audio-diagnostics/test-audio-levels?seconds=2`)

      // Check response status
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API returned status ${response.status}: ${errorText}`)
      }

      // Try to parse the JSON response
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${await response.text()}`)
      }

      if (data.success) {
        addDebugLog(`Mic test successful. Avg level: ${data.averageLevel.toFixed(2)}, Max: ${data.maxLevel.toFixed(2)}`)
      } else {
        addDebugLog(`Mic test failed: ${data.error}`)
      }
    } catch (error) {
      addDebugLog(`Mic test error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleRestartService = async () => {
    addDebugLog('Restarting wake word service...')
    try {
      const response = await fetch(`${BACKEND_URL}/api/audio-diagnostics/restart-detection`, {
        method: 'POST'
      })

      // Check response status
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API returned status ${response.status}: ${errorText}`)
      }

      // Try to parse the JSON response
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${await response.text()}`)
      }

      addDebugLog(`Restart response: ${JSON.stringify(data)}`)
    } catch (error) {
      addDebugLog(`Restart error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Submit a query to the RAG system
  const submitQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    // Add to set of submitted transcripts to prevent resubmission
    setSubmittedTranscripts(prev => {
      const newSet = new Set(prev);
      newSet.add(queryText.trim());
      return newSet;
    });

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: queryText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare filters if enabled
      const filters = useFilters
        ? {
          ...(emergencyType ? { emergencyType } : {}),
          ...(category ? { category } : {}),
        }
        : {};

      addDebugLog(`Submitting query: "${queryText.substring(0, 30)}..." with filters: ${JSON.stringify(filters)}`);

      // Send request to RAG endpoint
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage.content,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = (await response.json()) as RAGResponse;
      addDebugLog('Received RAG response');

      // Add assistant message with sources
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.answer,
        timestamp: Date.now(),
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      addDebugLog(`Error getting response: ${error}`);

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    submitQuery(input)
  }

  // Backend URL
  const BACKEND_URL = "http://localhost:8080";

  // Upload wake word function with correct backend URL
  const uploadWakeWord = async (audioBlob: Blob, wakeWord: string, agentId?: string) => {
    try {
      const formData = new FormData();
      formData.append("name", wakeWord); // Changed "wakeWord" to "name" to match backend
      formData.append("audio", audioBlob);
      if (agentId) formData.append("agentId", agentId);

      const res = await fetch(`${BACKEND_URL}/api/wake-word-v2/train-with-agent`, {
        method: "POST",
        body: formData,
      })

      // Check response status
      if (!res.ok) {
        const errorText = await res.text()
        let errorMessage

        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error || "Failed to train wake word"
        } catch {
          errorMessage = errorText || "Failed to train wake word"
        }

        throw new Error(errorMessage)
      }

      // Try to parse the JSON response
      let data
      try {
        data = await res.json()
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${await res.text()}`)
      }

      addDebugLog(`Wake word training successful: ${JSON.stringify(data)}`)
      return data
    } catch (error) {
      addDebugLog(`Wake word training error: ${error instanceof Error ? error.message : String(error)}`)
      throw error
    }
  }

  // Record audio for wake word training
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingName, setRecordingName] = useState("emergency");
  const [recordingAgent, setRecordingAgent] = useState("general");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedBlob(audioBlob);
        setIsRecording(false);
        addDebugLog(`Recording completed: ${(audioBlob.size / 1024).toFixed(2)} KB`);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      addDebugLog("Started recording wake word audio");

      // Automatically stop after 3 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();

          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        }
      }, 3000);

    } catch (error) {
      addDebugLog(`Error starting recording: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleUploadWakeWord = async () => {
    if (!recordedBlob) {
      addDebugLog("No recording available. Please record a wake word first.");
      return;
    }

    addDebugLog(`Uploading wake word "${recordingName}" with agent "${recordingAgent}"...`);
    try {
      await uploadWakeWord(recordedBlob, recordingName, recordingAgent);
      addDebugLog("Wake word uploaded and trained successfully");
      setRecordedBlob(null); // Clear the recording after successful upload
    } catch (error) {
      addDebugLog(`Upload wake word error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main Interface with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-red-600" />
            <h3 className="font-medium">Emergency Knowledge Assistant</h3>
            {/* Wake Word Status Indicator */}
            {wsConnected && (
              <Badge
                variant="outline"
                className="ml-3 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Voice Ready
              </Badge>
            )}
            {wsError && (
              <Badge
                variant="outline"
                className="ml-3 bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Voice Unavailable
              </Badge>
            )}
            {/* STT Status Indicator */}
            {isListening && (
              <Badge
                variant="outline"
                className="ml-2 animate-pulse bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
              >
                <Mic className="h-3 w-3 mr-1" />
                Listening...
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Knowledge Filters</SheetTitle>
                  <SheetDescription>Filter the knowledge base to get more relevant responses.</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="use-filters"
                      checked={useFilters}
                      onCheckedChange={(checked) => setUseFilters(checked as boolean)}
                    />
                    <Label htmlFor="use-filters">Enable filters</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-type">Emergency Type</Label>
                    <Select value={emergencyType} onValueChange={setEmergencyType} disabled={!useFilters}>
                      <SelectTrigger id="emergency-type">
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="Mass Casualty">Mass Casualty</SelectItem>
                        <SelectItem value="Chemical Exposure">Chemical Exposure</SelectItem>
                        <SelectItem value="Active Shooter">Active Shooter</SelectItem>
                        <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} disabled={!useFilters}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="Protocol">Protocol</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                        <SelectItem value="Triage">Triage</SelectItem>
                        <SelectItem value="HICS">HICS</SelectItem>
                        <SelectItem value="Decontamination">Decontamination</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Wake Word Detection Alert */}
        {wakeWordNotification && (
          <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
            <Mic className="h-4 w-4 mr-2" />
            <AlertDescription>
              <span className="font-medium">{wakeWordNotification.wakeWord}</span> detected!
              {wakeWordNotification.agent && ` Using the ${wakeWordNotification.agent} agent.`}
            </AlertDescription>
          </Alert>
        )}

        {/* Speech-to-Text Error Alert */}
        {sttError && (
          <Alert className="mb-4 bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              <span className="font-medium">Speech recognition error:</span> {sttError}
            </AlertDescription>
          </Alert>
        )}

        {/* Chat Tab Content */}
        <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
          <Card className="flex-1 overflow-hidden border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <RAGMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening for your question..." : "Ask about emergency protocols, procedures, or best practices..."}
                  disabled={isLoading}
                  className={`flex-1 ${isListening ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                />
                {isListening ? (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleStopListening}
                  >
                    <MicOff className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={startListening}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Toggle Debug Panel Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDebugPanel(!showDebugPanel)}
            className="mt-2 flex items-center gap-1 self-start"
          >
            <Bug className="h-4 w-4" />
            <span>Debug Logs</span>
            {showDebugPanel ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {/* Collapsible Debug Panel */}
          {showDebugPanel && (
            <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
              <div className="max-h-[150px] overflow-y-auto">
                {debugLogs.map((log, index) => (
                  <p key={index} className="text-xs text-gray-600 dark:text-gray-400">{log}</p>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Admin Tab Content */}
        <TabsContent value="admin" className="mt-0 space-y-4">
          {/* Diagnostic Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnostics</CardTitle>
              <CardDescription>Test and troubleshoot voice detection features</CardDescription>
            </CardHeader>
            <CardContent>
              <DiagnosticPanel
                onSimulateWakeWord={handleSimulateWakeWord}
                onTestMicrophone={handleTestMicrophone}
                onRestartService={handleRestartService}
                wsConnected={wsConnected}
              />
            </CardContent>
          </Card>

          {/* Import the new WakeWordTraining component */}
          <WakeWordTraining onLog={addDebugLog} backendUrl={BACKEND_URL} />
          <WebSocketDiagnostic />
        </TabsContent>
      </Tabs>
    </div>
  )
}