import { createDocument, DocumentMetadata } from "./simple-document-storage";
import * as pdfjs from 'pdfjs-dist';

// Simple text splitter for long documents
export class SimpleSplitter {
  private chunkSize: number;
  private chunkOverlap: number;

  constructor(options: { chunkSize: number; chunkOverlap: number }) {
    this.chunkSize = options.chunkSize;
    this.chunkOverlap = options.chunkOverlap;
  }

  async splitText(text: string): Promise<string[]> {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + this.chunkSize, text.length);
      const chunk = text.slice(start, end);
      
      // Try to find a good break point (end of sentence or paragraph)
      if (end < text.length) {
        const lastPeriod = chunk.lastIndexOf('.');
        const lastNewline = chunk.lastIndexOf('\n');
        const breakPoint = Math.max(lastPeriod, lastNewline);
        
        if (breakPoint > start + this.chunkSize * 0.5) {
          chunks.push(text.slice(start, start + breakPoint + 1).trim());
          start = start + breakPoint + 1 - this.chunkOverlap;
        } else {
          chunks.push(chunk.trim());
          start = end - this.chunkOverlap;
        }
      } else {
        chunks.push(chunk.trim());
        break;
      }
    }

    return chunks.filter(chunk => chunk.length > 0);
  }
}

// Extract text from PDF files
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    console.log("Extracting text from PDF...");
    
    const arrayBuffer = await file.arrayBuffer();
    
    // Set up PDF.js worker
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    console.log(`Extracted ${fullText.length} characters from PDF`);
    return fullText.trim();
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    // Fallback to simple text extraction
    try {
      const text = await file.text();
      return text.replace(/[^\x00-\x7F]+/g, ' ').replace(/\s+/g, ' ').trim();
    } catch (fallbackError) {
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

// Process uploaded files
export async function processFile(
  file: File, 
  metadata: Partial<DocumentMetadata> = {}
): Promise<string[]> {
  try {
    console.log("Processing file:", file.name, "type:", file.type);
    
    let textContent = "";
    
    // Extract text based on file type
    if (file.type === "application/pdf") {
      textContent = await extractTextFromPDF(file);
    } else if (file.type.startsWith("text/") || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      textContent = await file.text();
    } else {
      throw new Error(`Unsupported file type: ${file.type}. Please upload PDF or text files.`);
    }
    
    if (!textContent || textContent.trim() === "") {
      throw new Error("No text content could be extracted from the file");
    }

    // Clean and normalize the text
    textContent = textContent
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Prepare metadata
    const documentMetadata: DocumentMetadata = {
      title: metadata.title || file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      category: metadata.category || "General",
      emergency_type: metadata.emergency_type,
      tags: metadata.tags || [],
      file_url: metadata.file_url,
    };

    // If the document is large, split it into chunks
    if (textContent.length > 10000) {
      const splitter = new SimpleSplitter({
        chunkSize: 8000,
        chunkOverlap: 200
      });
      
      const chunks = await splitter.splitText(textContent);
      const documentIds: string[] = [];

      // Create a document for each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunkMetadata = {
          ...documentMetadata,
          title: `${documentMetadata.title} (Part ${i + 1}/${chunks.length})`,
          tags: [...(documentMetadata.tags || []), "chunked"],
        };

        const document = await createDocument(chunks[i], chunkMetadata);
        documentIds.push(document.id);
      }

      return documentIds;
    } else {
      // Create a single document
      const document = await createDocument(textContent, documentMetadata);
      return [document.id];
    }
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Process raw text content
export async function processDocument(
  content: string,
  metadata: Partial<DocumentMetadata> = {}
): Promise<string[]> {
  try {
    console.log("Processing document, content length:", content.length);
    
    if (!content || content.trim() === "") {
      throw new Error("Document content cannot be empty");
    }

    // Clean and normalize the text
    const cleanContent = content
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Prepare metadata
    const documentMetadata: DocumentMetadata = {
      title: metadata.title || "Untitled Document",
      category: metadata.category || "General",
      emergency_type: metadata.emergency_type,
      tags: metadata.tags || [],
      file_url: metadata.file_url,
    };

    // If the document is large, split it into chunks
    if (cleanContent.length > 10000) {
      const splitter = new SimpleSplitter({
        chunkSize: 8000,
        chunkOverlap: 200
      });
      
      const chunks = await splitter.splitText(cleanContent);
      const documentIds: string[] = [];

      // Create a document for each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunkMetadata = {
          ...documentMetadata,
          title: `${documentMetadata.title} (Part ${i + 1}/${chunks.length})`,
          tags: [...(documentMetadata.tags || []), "chunked"],
        };

        const document = await createDocument(chunks[i], chunkMetadata);
        documentIds.push(document.id);
      }

      return documentIds;
    } else {
      // Create a single document
      const document = await createDocument(cleanContent, documentMetadata);
      return [document.id];
    }
  } catch (error) {
    console.error("Error processing document:", error);
    throw new Error(`Failed to process document: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Validate file before processing
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(txt|md|pdf|doc|docx)$/i)) {
    return { valid: false, error: "File type not supported. Please upload PDF, TXT, MD, DOC, or DOCX files." };
  }

  return { valid: true };
} 