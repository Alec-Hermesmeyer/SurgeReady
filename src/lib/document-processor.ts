import { insertDocument } from "./supabase-client";
// Import from our custom text splitter instead of LangChain
import { RecursiveCharacterTextSplitter } from "./text-splitter";
// Updated imports for the latest LangChain packages
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// Function to extract text from a PDF file
async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  try {
    console.log("Extracting text from PDF...");
    
    // Using the PDFLoader from langchain (browser version)
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    
    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob);
    
    // Load PDF with langchain's PDFLoader
    const loader = new PDFLoader(blobUrl);
    const docs = await loader.load();
    
    // Combine all pages into a single text
    const fullText = docs.map(doc => doc.pageContent).join("\n\n");
    console.log(`Extracted ${docs.length} pages, total text length: ${fullText.length}`);
    
    // Clean up
    URL.revokeObjectURL(blobUrl);
    
    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Generate embeddings using OpenAI API
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    console.log("Generating embedding for text length:", text.length);
    
    // Initialize the OpenAI embeddings model
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-ada-002" // Or the latest model you prefer
    });
    
    const embedding = await embeddings.embedQuery(text);
    console.log(`Generated embedding with dimension: ${embedding.length}`);
    
    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Split document into chunks
async function splitDocument(text: string, chunkSize: number = 1000, overlap: number = 200): Promise<string[]> {
  try {
    console.log("Splitting document into chunks...");
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap: overlap
    });
    
    const chunks = await splitter.splitText(text);
    console.log(`Document split into ${chunks.length} chunks`);
    
    return chunks;
  } catch (error) {
    console.error("Error splitting document:", error);
    throw new Error(`Failed to split document: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Process a file (PDF handling)
export async function processFile(file: File, metadata: Record<string, any> = {}): Promise<any[]> {
  try {
    console.log("Processing file:", file.name, "type:", file.type);
    
    // Read file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer()
      .then(buffer => new Uint8Array(buffer))
      .then(array => Buffer.from(array));
    
    let textContent = "";
    
    // Extract text based on file type
    if (file.type === "application/pdf") {
      textContent = await extractTextFromPDF(fileBuffer);
    } else {
      // For text files, just convert to string
      textContent = new TextDecoder().decode(fileBuffer);
    }
    
    if (!textContent || textContent.trim() === "") {
      throw new Error("No text content could be extracted from the file");
    }
    
    // Update metadata with file info
    const enhancedMetadata = {
      ...metadata,
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadDate: new Date().toISOString()
    };
    
    // Process the extracted text
    return processDocument(textContent, enhancedMetadata);
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Main document processing function
export async function processDocument(content: string, metadata: Record<string, any> = {}): Promise<any[]> {
  try {
    console.log("Processing document with metadata:", Object.keys(metadata));
    
    // 1. Split the document into chunks
    const chunks = await splitDocument(content);
    
    // 2. Process each chunk
    const results = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Processing chunk ${i+1}/${chunks.length}, length: ${chunk.length}`);
      
      // 3. Generate embedding
      const embedding = await generateEmbedding(chunk);
      
      // 4. Add chunk metadata
      const chunkMetadata = {
        ...metadata,
        chunkIndex: i,
        totalChunks: chunks.length
      };
      
      // 5. Store in Supabase
      console.log(`Storing chunk ${i+1} in Supabase`);
      const result = await insertDocument(chunk, chunkMetadata, embedding);
      results.push(result);
    }
    
    console.log(`Successfully processed ${chunks.length} chunks`);
    return results;
  } catch (error) {
    console.error("Error in document processing:", error);
    throw new Error(`Document processing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}