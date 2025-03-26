import { insertDocument } from "./supabase-client";
import { SimpleSplitter } from "./text-splitter";
import * as pdfjs from 'pdfjs-dist';

// Use the Fetch API to send text to OpenAI's embedding API
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    console.log("Generating embedding via OpenAI API, text length:", text.length);
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is required but not provided in environment variables");
    }
    
    // Truncate text if it exceeds OpenAI's token limit (roughly 8191 tokens for text-embedding-ada-002)
    // This is a very rough approximation (4 chars ~= 1 token)
    const MAX_CHARS = 8000 * 4;
    const truncatedText = text.length > MAX_CHARS ? text.substring(0, MAX_CHARS) : text;
    
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        input: truncatedText,
        model: 'text-embedding-ada-002'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error (${response.status}): ${JSON.stringify(errorData)}`);
    }
    
    const result = await response.json();
    const embedding = result.data[0].embedding;
    
    console.log(`Generated embedding with dimension: ${embedding.length}`);
    
    // Validate embedding to ensure all values are valid numbers
    if (!Array.isArray(embedding)) {
      throw new Error("Generated embedding is not an array");
    }
    
    // Ensure all embedding values are valid numbers
    const validEmbedding = embedding.map(value => {
      if (!Number.isFinite(value)) {
        return 0; // Replace invalid values with 0
      }
      return value;
    });
    
    return validEmbedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Function to extract text from PDF
// In your document-processor.ts

// Simple PDF text extraction without relying on PDF.js worker
// Simpler approach without PDF parsing
async function extractTextFromPDF(file: File): Promise<string> {
    try {
      console.log("Extracting text from PDF using simple approach...");
      
      // Convert to text and heavily sanitize the output
      const rawText = await file.text();
      
      // Multi-stage cleaning
      let cleanedText = rawText
        // Remove control characters
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '')
        // Replace non-ASCII characters with spaces
        .replace(/[^\x00-\x7F]+/g, ' ')
        // Fix invalid Unicode escapes
        .replace(/\\u[0-9a-fA-F]{0,3}[^0-9a-fA-F]/g, ' ')
        // Remove unnecessary backslashes
        .replace(/\\([^"\\/bfnrtu])/g, '$1')
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log(`Extracted text length: ${cleanedText.length}`);
      
      // Filter out sections that appear to be binary data
      const textLines = cleanedText.split('\n');
      const filteredLines = textLines.filter(line => {
        // Calculate ratio of normal characters to total length
        const normalChars = line.replace(/[^a-zA-Z0-9 .,;:!?()[\]{}<>'"+-=*/&%$#@]/g, '').length;
        return line.length === 0 || (normalChars / line.length) > 0.7;
      });
      
      return filteredLines.join('\n');
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

// Process a file
export async function processFile(file: File, metadata: Record<string, any> = {}): Promise<any[]> {
  try {
    console.log("Processing file:", file.name, "type:", file.type);
    
    let textContent = "";
    
    // Extract text based on file type
    if (file.type === "application/pdf") {
      textContent = await extractTextFromPDF(file);
    } else {
      // For text files, just convert to string
      const rawText = await file.text();
      // Sanitize even regular text files
      textContent = rawText
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
        .replace(/\\u[0-9a-fA-F]{0,3}[^0-9a-fA-F]/g, " ");
    }
    
    if (!textContent || textContent.trim() === "") {
      throw new Error("No text content could be extracted from the file");
    }
    
    // Sanitize metadata to prevent JSON issues
    let safeMetadata = {};
    try {
      // Convert to string and back to remove circular references and invalid values
      const metadataStr = JSON.stringify(metadata);
      safeMetadata = JSON.parse(metadataStr);
      
      // Add file info to metadata
      safeMetadata = {
        ...safeMetadata,
        filename: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString()
      };
    } catch (e) {
      console.warn("Metadata sanitization failed, using simplified metadata");
      safeMetadata = { 
        title: metadata?.title || file.name || "Untitled", 
        filename: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        simplified: true
      };
    }
    
    // Process the extracted text
    return processDocument(textContent, safeMetadata);
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Split document into chunks
async function splitDocument(text: string, chunkSize: number = 1000, overlap: number = 200): Promise<string[]> {
  try {
    console.log("Splitting document into chunks...");
    
    // Sanitize the text again before splitting
    const sanitizedText = text
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
      .replace(/\\u[0-9a-fA-F]{0,3}[^0-9a-fA-F]/g, " ");
    
    const splitter = new SimpleSplitter({
      chunkSize,
      chunkOverlap: overlap
    });
    
    const chunks = await splitter.splitText(sanitizedText);
    console.log(`Document split into ${chunks.length} chunks`);
    
    return chunks;
  } catch (error) {
    console.error("Error splitting document:", error);
    throw new Error(`Failed to split document: ${error instanceof Error ? error.message : String(error)}`);
  }
}
// export async function generateEmbedding(text: string): Promise<number[]> {
//     try {
//         console.log("Generating embedding via OpenAI API, text length:", text.length);
//         const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//         if (!OPENAI_API_KEY) {
//             throw new Error("OpenAI API key is required but not provided in environment variables");
//         }
//         const MAX_CHARS = 8000 * 4;
//         const truncatedText = text.length > MAX_CHARS ? text.substring(0, MAX_CHARS) : text;
//         const response = await fetch('https://api.openai.com/v1/embeddings', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${OPENAI_API_KEY}`
//             },
//             body: JSON.stringify({
//                 input: truncatedText,
//                 model: 'text-embedding-ada-002'
//             })
//         });
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(`OpenAI API error (${response.status}): ${JSON.stringify(errorData)}`);
//         }
//         const result = await response.json();
//         const embedding = result.data[0].embedding;
//         console.log(`Generated embedding with dimension: ${embedding.length}`);
//         if (!Array.isArray(embedding)) {
//             throw new Error("Generated embedding is not an array");
//         }
//         const validEmbedding = embedding.map(value => {
//             if (!Number.isFinite(value)) {
//                 return 0;
//             }
//             return value;
//         }
//         );
//         return validEmbedding;
//     } catch (error) {
//         console.error("Error generating embedding:", error);
//         throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : String(error)}`);
//     }
// }
// Main document processing function
export async function processDocument(content: string, metadata: Record<string, any> = {}): Promise<any[]> {
  try {
    console.log("Processing document with metadata keys:", Object.keys(metadata));
    
    // Ensure content is sanitized
    const sanitizedContent = content
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
      .replace(/\\u[0-9a-fA-F]{0,3}[^0-9a-fA-F]/g, " ");
    
    // 1. Split the document into chunks
    const chunks = await splitDocument(sanitizedContent);
    
    // 2. Process each chunk
    const results: { error?: string; chunkIndex?: number }[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Processing chunk ${i+1}/${chunks.length}, length: ${chunk.length}`);
      
      try {
        // 3. Generate embedding
        const embedding = await generateEmbedding(chunk);
        
        // 4. Add chunk metadata
        let chunkMetadata;
        try {
          // Ensure metadata is JSON-serializable
          const metadataStr = JSON.stringify({
            ...metadata,
            chunkIndex: i,
            totalChunks: chunks.length
          });
          
          chunkMetadata = JSON.parse(metadataStr);
        } catch (e) {
          console.warn("Error serializing chunk metadata, using simplified version");
          chunkMetadata = {
            title: metadata?.title || "Untitled",
            chunkIndex: i,
            totalChunks: chunks.length,
            simplified: true
          };
        }
        
        // 5. Store in Supabase
        console.log(`Storing chunk ${i+1} in Supabase`);
        const result = await insertDocument(chunk, chunkMetadata, embedding);
        if (Array.isArray(result)) {
          console.error(`Unexpected array result for chunk ${i+1}`);
          results.push({ error: "Unexpected array result", chunkIndex: i });
        } else {
          results.push(result);
        }
      } catch (chunkError) {
        console.error(`Error processing chunk ${i+1}:`, chunkError);
        // Continue with other chunks instead of failing the entire process
        results.push({ error: chunkError instanceof Error ? chunkError.message : String(chunkError), chunkIndex: i });
      }
    }
    
    console.log(`Completed processing ${chunks.length} chunks, ${results.filter((r: { error?: string }) => !r.error).length} successful`);
    return results;
  } catch (error) {
    console.error("Error in document processing:", error);
    throw new Error(`Document processing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}