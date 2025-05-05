"use client"
import React, { useState, useEffect } from 'react';
import { useWakeWordWebSocket, WakeWordEvent } from './use-wake-word-socket';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Volume2, AlertCircle, RefreshCw, Check, Mic } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WebSocketDiagnostic: React.FC = () => {
  // Allow custom WebSocket URL for testing
  const [wsUrl, setWsUrl] = useState('ws://localhost:8080/ws/wake-word');
  const [customUrl, setCustomUrl] = useState('');
  
  // Track wake word events
  const [wakeWordLog, setWakeWordLog] = useState<WakeWordEvent[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Use the WebSocket hook
  const { 
    connected, 
    error, 
    wakeWordEvent, 
    setWakeWordEvent,
    lastMessage, 
    reconnect 
  } = useWakeWordWebSocket(wsUrl, true);
  
  // Handle wake word events
  useEffect(() => {
    if (wakeWordEvent) {
      // Add to the log
      setWakeWordLog(prev => [wakeWordEvent, ...prev].slice(0, 10));
      
      // Show success alert
      setShowSuccessAlert(true);
      
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
      
      // Clear the event so we don't process it again
      setWakeWordEvent(null);
    }
  }, [wakeWordEvent, setWakeWordEvent]);
  
  // Handle custom URL change
  const handleUrlChange = () => {
    if (customUrl && customUrl.startsWith('ws')) {
      setWsUrl(customUrl);
      reconnect();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wake Word WebSocket Diagnostics</CardTitle>
        <CardDescription>
          Test and diagnose wake word detection via WebSocket
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Connection Status:</h3>
          {connected ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Check className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              Disconnected
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={reconnect}
            className="ml-auto"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reconnect
          </Button>
        </div>
        
        {/* Error Display */}
        {error && (
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Connection Error: {error.message}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Wake Word Detection Alert */}
        {showSuccessAlert && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <Mic className="h-4 w-4 mr-2" />
            <AlertDescription>
              Wake word detected!
            </AlertDescription>
          </Alert>
        )}
        
        {/* WebSocket URL Configuration */}
        <div className="space-y-2">
          <Label htmlFor="ws-url">WebSocket URL</Label>
          <div className="flex gap-2">
            <Input 
              id="ws-url" 
              value={customUrl} 
              onChange={e => setCustomUrl(e.target.value)}
              placeholder={wsUrl}
            />
            <Button onClick={handleUrlChange}>Apply</Button>
          </div>
          <p className="text-xs text-gray-500">
            Current URL: {wsUrl}
          </p>
        </div>
        
        {/* Last Message */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Last Message:</h3>
          <div className="p-2 bg-gray-50 rounded border text-xs overflow-x-auto">
            {lastMessage || 'No messages received yet'}
          </div>
        </div>
        
        {/* Wake Word Log */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Wake Word History:</h3>
          {wakeWordLog.length > 0 ? (
            <div className="border rounded overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1 text-xs font-medium text-gray-500">Time</th>
                    <th className="px-2 py-1 text-xs font-medium text-gray-500">Wake Word</th>
                    <th className="px-2 py-1 text-xs font-medium text-gray-500">Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {wakeWordLog.map((event, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1 text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-2 py-1 text-xs font-medium">
                        {event.wakeWord}
                      </td>
                      <td className="px-2 py-1 text-xs">
                        {event.agentId || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No wake words detected yet</p>
          )}
        </div>
        
        {/* Additional Instructions */}
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <Volume2 className="h-4 w-4 mr-2" />
          <AlertDescription>
            Speak your wake word clearly to trigger detection. The backend should be running and listening for wake words.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default WebSocketDiagnostic;