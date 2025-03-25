// Document types
export interface EmergencyDocument {
    id: string
    content: string
    metadata: DocumentMetadata
    created_at: string
    similarity?: number
  }
  
  export interface DocumentMetadata {
    title?: string
    category?: string
    emergencyType?: string
    source?: string
    author?: string
    dateCreated?: string
    version?: string
    tags?: string[]
    [key: string]: any
  }
  
  // RAG query types
  export interface RAGQuery {
    query: string
    filters?: DocumentMetadata
  }
  
  export interface RAGResponse {
    answer: string
    sources: EmergencyDocument[]
  }
  
  // Message types for the chat interface
  export interface Message {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    timestamp: number
    sources?: EmergencyDocument[]
  }
  
  // Document processing types
  export interface DocumentUpload {
    file?: File
    text?: string
    metadata: DocumentMetadata
  }
  
  export interface ProcessingResult {
    success: boolean
    documentCount: number
    error?: string
  }
  
  