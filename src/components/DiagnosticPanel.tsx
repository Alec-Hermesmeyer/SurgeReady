import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, RotateCw, Bug } from "lucide-react";

interface DiagnosticPanelProps {
  onSimulateWakeWord: (wakeWord: string, agentId?: string) => Promise<void>;
  onTestMicrophone: () => Promise<void>;
  onRestartService: () => Promise<void>;
  wsConnected: boolean;
}

const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({
  onSimulateWakeWord,
  onTestMicrophone,
  onRestartService,
  wsConnected
}) => {
  const [wakeWord, setWakeWord] = useState("Picovoice");
  const [agentId, setAgentId] = useState("general");
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Try to get available wake words when the panel is shown
  const [availableWakeWords, setAvailableWakeWords] = useState<string[]>([]);
  const [fetchingWakeWords, setFetchingWakeWords] = useState(false);

  const fetchAvailableWakeWords = async () => {
    if (fetchingWakeWords) return;
    
    setFetchingWakeWords(true);
    try {
      const response = await fetch('http://localhost:8080/api/wake-word-v2');
      if (response.ok) {
        const data = await response.json();
        if (data.wakeWords && Array.isArray(data.wakeWords)) {
          setAvailableWakeWords(data.wakeWords);
          
          // If we have wake words, select the first one
          if (data.wakeWords.length > 0) {
            setWakeWord(data.wakeWords[0]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching wake words:", error);
    } finally {
      setFetchingWakeWords(false);
    }
  };

  const handleShowDiagnostics = () => {
    const newValue = !showDiagnostics;
    setShowDiagnostics(newValue);
    
    if (newValue) {
      fetchAvailableWakeWords();
    }
  };

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShowDiagnostics}
        className="flex items-center gap-1 mb-2"
      >
        <Bug className="h-4 w-4" />
        <span>{showDiagnostics ? "Hide Diagnostics" : "Show Diagnostics"}</span>
      </Button>

      {showDiagnostics && (
        <Card>
          <CardHeader>
            <CardTitle>Voice Detection Diagnostics</CardTitle>
            <CardDescription>
              Tools to test and troubleshoot wake word detection
              {wsConnected ? 
                ' (WebSocket connected)' : 
                ' (WebSocket disconnected - wake word detection unavailable)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="wake-word">Wake Word</Label>
                <div className="flex gap-2 mt-1">
                  {availableWakeWords.length > 0 ? (
                    <Select value={wakeWord} onValueChange={setWakeWord}>
                      <SelectTrigger id="wake-word">
                        <SelectValue placeholder="Select wake word" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableWakeWords.map(word => (
                          <SelectItem key={word} value={word}>{word}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input 
                      id="wake-word" 
                      value={wakeWord} 
                      onChange={(e) => setWakeWord(e.target.value)} 
                      placeholder="Enter wake word" 
                    />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="agent-id">Agent ID</Label>
                <Select value={agentId} onValueChange={setAgentId}>
                  <SelectTrigger id="agent-id">
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

              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => onSimulateWakeWord(wakeWord, agentId)}
                  disabled={!wakeWord.trim()}
                >
                  Simulate Wake Word
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={onTestMicrophone}
                >
                  <Mic className="h-4 w-4 mr-1" />
                  Test Microphone
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={onRestartService}
                >
                  <RotateCw className="h-4 w-4 mr-1" />
                  Restart Detection
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={fetchAvailableWakeWords}
                  disabled={fetchingWakeWords}
                >
                  Refresh Wake Words
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagnosticPanel;