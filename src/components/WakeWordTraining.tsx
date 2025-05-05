"use client"
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WakeWordTrainingProps {
  onLog: (message: string) => void;
  backendUrl: string;
}

const WakeWordTraining: React.FC<WakeWordTrainingProps> = ({ onLog, backendUrl }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingName, setRecordingName] = useState("emergency");
  const [recordingAgent, setRecordingAgent] = useState("general");
  const [status, setStatus] = useState<{type: "success" | "error" | "info"; message: string} | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Check for Safari browser
  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1;
  };

  const startRecording = async () => {
    setStatus({type: "info", message: "Starting recording..."});
    audioChunksRef.current = [];
    
    try {
      // Request audio stream - simpler constraints that work across browsers
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true
      });
      
      // Create MediaRecorder with browser-compatible options
      let options = {};
      
      // Safari doesn't support many MIME types, so we need to adapt
      if (isSafari()) {
        // Safari may only support the default format
        onLog("Safari detected, using default audio format");
      } else {
        // For other browsers, try to use audio/webm
        options = { mimeType: 'audio/webm' };
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create blob from collected chunks with a generic audio type
        // Let the browser determine the best format
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType || 'audio/webm' 
        });
        
        setRecordedBlob(audioBlob);
        
        // Create an audio URL for playback testing
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        setIsRecording(false);
        onLog(`Recording completed: ${(audioBlob.size / 1024).toFixed(2)} KB (format: ${mediaRecorder.mimeType || 'unknown'})`);
        setStatus({type: "success", message: "Recording completed successfully"});
      };
      
      mediaRecorderRef.current = mediaRecorder;
      
      // Start recording with a short interval to improve reliability
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      onLog("Started recording wake word audio");
      setStatus({type: "info", message: "Recording... (speak your wake word clearly)"});
      
      // Automatically stop after 3 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        }
      }, 3000);
      
    } catch (error) {
      onLog(`Error starting recording: ${error instanceof Error ? error.message : String(error)}`);
      setStatus({type: "error", message: `Microphone access error: ${error instanceof Error ? error.message : String(error)}`});
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };
  
  const handleUploadWakeWord = async () => {
    if (!recordedBlob) {
      onLog("No recording available. Please record a wake word first.");
      setStatus({type: "error", message: "No recording available. Please record a wake word first."});
      return;
    }
    
    onLog(`Uploading wake word "${recordingName}" with agent "${recordingAgent}"...`);
    setStatus({type: "info", message: "Uploading wake word..."});
    
    try {
      const formData = new FormData();
      formData.append("name", recordingName);
      
      // Create a file with explicit name and extension to help the server identify it
      // Safari may not provide a useful MIME type, so the .wav extension helps
      const audioFile = new File([recordedBlob], `${recordingName}.wav`, { 
        type: 'audio/wav' 
      });
      formData.append("audio", audioFile);
      
      if (recordingAgent) {
        formData.append("agentId", recordingAgent);
      }
      
      const res = await fetch(`${backendUrl}/api/wake-word-v2/train-with-agent`, {
        method: "POST",
        body: formData,
      });
      
      // Check response status
      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || "Failed to train wake word";
        } catch {
          errorMessage = errorText || "Failed to train wake word";
        }
        
        throw new Error(errorMessage);
      }
      
      // Try to parse the JSON response
      const data = await res.json();
      
      onLog(`Wake word training successful: ${JSON.stringify(data)}`);
      setStatus({type: "success", message: `Wake word "${recordingName}" trained successfully!`});
      setRecordedBlob(null); // Clear the recording after successful upload
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    } catch (error) {
      const errorMsg = `Upload wake word error: ${error instanceof Error ? error.message : String(error)}`;
      onLog(errorMsg);
      setStatus({type: "error", message: errorMsg});
    }
  };
  
  // Optional function to check if audio recording is supported
  const isAudioRecordingSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wake Word Training</CardTitle>
        <CardDescription>Record and train a new wake word for voice activation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="recording-name">Wake Word Name</Label>
              <Input 
                id="recording-name" 
                value={recordingName} 
                onChange={(e) => setRecordingName(e.target.value)} 
                placeholder="Enter wake word name"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="recording-agent">Associate with Agent</Label>
              <Select value={recordingAgent} onValueChange={setRecordingAgent}>
                <SelectTrigger id="recording-agent">
                  <SelectValue placeholder="Select agent type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="mass_casualty">Mass Casualty</SelectItem>
                  <SelectItem value="chemical">Chemical Exposure</SelectItem>
                  <SelectItem value="active_shooter">Active Shooter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!isAudioRecordingSupported() ? (
            <Alert className="bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              <AlertDescription>
                Your browser doesn't support audio recording. Please try using Chrome or Firefox.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={isRecording ? stopRecording : startRecording}
                  className="flex-1"
                  disabled={isSafari() && isRecording} // Safari can be buggy with stopping recordings
                >
                  {isRecording ? (
                    <>
                      <span className="mr-2">⚫</span> {isSafari() ? "Recording..." : "Stop Recording"}
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" /> Record Wake Word
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUploadWakeWord}
                  disabled={!recordedBlob}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Upload & Train Wake Word
                </Button>
              </div>
              
              {status && (
                <Alert className={`${
                  status.type === 'error' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300' : 
                  status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' :
                  'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
                }`}>
                  <AlertDescription>
                    {status.message}
                  </AlertDescription>
                </Alert>
              )}
              
              {audioUrl && (
                <div className="mt-2">
                  <Label htmlFor="audio-preview">Audio Preview</Label>
                  <audio 
                    ref={audioRef}
                    id="audio-preview" 
                    controls 
                    src={audioUrl} 
                    className="w-full mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Test your recording before uploading</p>
                </div>
              )}
              
              {isSafari() && (
                <p className="text-xs text-amber-500 mt-1">
                  Note: Safari has limited audio recording capabilities. For best results, consider using Chrome or Firefox.
                </p>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WakeWordTraining;