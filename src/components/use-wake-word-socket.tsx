"use client"
import { useState, useEffect, useRef, useCallback } from 'react';

export interface WakeWordEvent {
  type: 'wake_word_detected';
  wakeWord: string;
  agentId?: string;
  timestamp: number;
}

interface WakeWordWebSocketHookResult {
  connected: boolean;
  error: Error | null;
  wakeWordEvent: WakeWordEvent | null;
  setWakeWordEvent: (event: WakeWordEvent | null) => void;
  lastMessage: string | null;
  reconnect: () => void;
}

export const useWakeWordWebSocket = (
  // Match the backend WebSocket URL path
  socketUrl: string = 'ws://localhost:8080/ws/wake-word',
  debug: boolean = true
): WakeWordWebSocketHookResult => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [wakeWordEvent, setWakeWordEvent] = useState<WakeWordEvent | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  
  // Use a ref for the WebSocket to persist across renders
  const socketRef = useRef<WebSocket | null>(null);
  // Track reconnection attempts
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Logging function
  const log = useCallback((message: string) => {
    if (debug) {
      console.log(`[WakeWordWS] ${message}`);
    }
  }, [debug]);
  
  // Reconnect function that can be called manually
  const reconnect = useCallback(() => {
    log("Manual reconnection requested");
    
    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    // Reset reconnection attempts to force a fresh connection
    reconnectAttemptsRef.current = 0;
    
    // Close existing socket if open
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
      log("Closing existing connection before reconnecting");
      socketRef.current.close();
    }
    
    // Schedule immediate reconnection
    reconnectTimeoutRef.current = setTimeout(() => {
      setupWebSocket();
    }, 100);
  }, []);
  
  // Function to create and configure the WebSocket
  const setupWebSocket = useCallback(() => {
    try {
      log(`Connecting to ${socketUrl} (attempt ${reconnectAttemptsRef.current + 1})`);
      
      // Close existing socket if any
      if (socketRef.current) {
        socketRef.current.close();
      }
      
      // Create new WebSocket connection
      const socket = new WebSocket(socketUrl);
      socketRef.current = socket;
      
      // Connection opened
      socket.onopen = () => {
        log('Connection established');
        setConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
      };
      
      // Connection error
      socket.onerror = (event) => {
        log('WebSocket error observed:');
        console.error(event);
        setError(new Error('WebSocket connection error'));
      };
      
      // Connection closed
      socket.onclose = (event) => {
        log(`Connection closed (${event.code}: ${event.reason || 'No reason provided'})`);
        setConnected(false);
        
        // Attempt reconnection if not closed cleanly
        if (event.code !== 1000 && event.code !== 1001) {
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
            log(`Reconnecting in ${delay}ms...`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current++;
              setupWebSocket();
            }, delay);
          } else {
            setError(new Error(`Failed to connect after ${maxReconnectAttempts} attempts`));
            log('Maximum reconnection attempts reached');
          }
        }
      };
      
      // Listen for messages
      socket.onmessage = (event) => {
        setLastMessage(event.data);
        log(`Received message: ${event.data}`);
        
        try {
          const data = JSON.parse(event.data);
          
          // Check if this is a wake word event
          if (data && data.type === 'wake_word_detected') {
            // Create a proper wake word event object
            const wakeEvent: WakeWordEvent = {
              type: 'wake_word_detected',
              wakeWord: data.wakeWord || 'unknown',
              agentId: data.agentId || undefined,
              timestamp: data.timestamp || Date.now()
            };
            
            log(`Detected wake word: ${wakeEvent.wakeWord} (agent: ${wakeEvent.agentId || 'none'})`);
            setWakeWordEvent(wakeEvent);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          log(`Failed to parse message: ${event.data}`);
        }
      };
      
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
      setError(error instanceof Error ? error : new Error('Unknown WebSocket setup error'));
      
      // Still attempt reconnection on setup failure
      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
        log(`Error in setup. Reconnecting in ${delay}ms...`);
        
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current++;
          setupWebSocket();
        }, delay);
      }
    }
  }, [socketUrl, log]);
  
  // Setup WebSocket on component mount
  useEffect(() => {
    log('Initializing WebSocket hook');
    setupWebSocket();
    
    // Cleanup on unmount
    return () => {
      log('Cleaning up WebSocket connection');
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close(1000, 'Component unmounted');
        socketRef.current = null;
      }
    };
  }, [setupWebSocket, log]);
  
  return {
    connected,
    error,
    wakeWordEvent,
    setWakeWordEvent,
    lastMessage,
    reconnect
  };
};