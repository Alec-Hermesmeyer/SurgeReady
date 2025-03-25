'use client';

import { useState, useEffect } from 'react';
import { runAllTests } from '@/lib/supabase-diagnostic';

export default function DiagnosticPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  // Override console.log to capture logs
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      originalLog(...args);
      setLogs(prev => [...prev, args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')]);
    };
    
    console.error = (...args) => {
      originalError(...args);
      setLogs(prev => [...prev, '❌ ERROR: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')]);
    };
    
    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);
  
  const runDiagnostics = async () => {
    setIsRunning(true);
    setLogs([]);
    try {
      await runAllTests();
    } catch (error) {
      console.error("Error running diagnostics:", error);
    } finally {
      setIsRunning(false);
    }
  };
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Diagnostics</h1>
      
      <button 
        onClick={runDiagnostics}
        disabled={isRunning}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        {isRunning ? 'Running...' : 'Run Diagnostics'}
      </button>
      
      <div className="mt-4 border rounded p-2 bg-black text-green-400 font-mono text-sm">
        <div className="overflow-auto max-h-[600px]">
          {logs.length === 0 && !isRunning && (
            <p className="text-gray-400">Click "Run Diagnostics" to start the tests...</p>
          )}
          {logs.map((log, i) => (
            <pre key={i} className="whitespace-pre-wrap">{log}</pre>
          ))}
          {isRunning && <div className="animate-pulse">Running tests...</div>}
        </div>
      </div>
    </div>
  );
}