import { OpenAI } from "openai";
import { searchDocuments } from "@/lib/supabase-client";
import { type NextRequest, NextResponse } from "next/server";
import type { RAGQuery, RAGResponse } from "@/types/rag";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simplified embedding generation directly in this file
// This avoids importing from document-processor which doesn't export this function
async function generateQueryEmbedding(text: string): Promise<number[]> {
  try {
    console.log("Generating query embedding, text length:", text.length);
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is required");
    }
    
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        input: text,
        model: 'text-embedding-ada-002'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error (${response.status}): ${JSON.stringify(errorData)}`);
    }
    
    const result = await response.json();
    const embedding = result.data[0].embedding;
    
    console.log(`Generated query embedding with dimension: ${embedding.length}`);
    return embedding;
  } catch (error) {
    console.error("Error generating query embedding:", error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("RAG query endpoint called");
    
    // Parse the request body
    const body = (await request.json()) as RAGQuery;
    const { query, filters = {} } = body;
    
    console.log("Query:", query);
    console.log("Filters:", filters);
    
    if (!query || query.trim() === "") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    
    // Generate embedding for the query
    console.log("Generating embedding for query");
    const queryEmbedding = await generateQueryEmbedding(query);
    
    // Search for relevant documents with debug logging
    console.log("Searching for relevant documents with embedding dimension:", queryEmbedding.length);
    console.log("Using filters:", JSON.stringify(filters));
    
    const documents = await searchDocuments(
      queryEmbedding,
      filters,
      0.7, // similarity threshold
      5,   // number of documents to retrieve
    );
    
    console.log(`Search returned ${documents?.length || 0} documents`);
    
    if (!documents || documents.length === 0) {
      console.log("No relevant documents found, providing general response");
      
      // If no relevant documents found, still provide a response
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an emergency response assistant for SurgeReady Solutions.
            You help healthcare professionals with emergency protocols and procedures.
            If you don't know the answer, be honest about it.`,
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.5,
      });
      
      return NextResponse.json({
        answer: completion.choices[0].message.content,
        sources: [],
      } as RAGResponse);
    }
    
    // Prepare context from retrieved documents
    console.log("Preparing context from retrieved documents");
    interface Document {
      content: string;
      metadata: Record<string, unknown>;
      similarity?: number;
    }
    
    const context: string = documents
      .map((doc: Document, index: number) => {
        console.log(`Document ${index+1} similarity: ${doc.similarity || 'unknown'}`);
        return `${doc.content}\n\nSource: ${JSON.stringify(doc.metadata)}`;
      })
      .join("\n\n");
    
    // Generate response using the context
    console.log("Generating response using retrieved context");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an emergency response assistant for SurgeReady Solutions.
          You help healthcare professionals with emergency protocols and procedures.
          Use the following information to answer the user's question.
          If the answer cannot be found in the provided information, say so clearly.`,
        },
        {
          role: "user",
          content: `Context information:
          ${context}
          
          User question: ${query}
          
          Answer the question based on the context information provided. Include specific details from the context.
          If the context doesn't contain the answer, say "I don't have specific information about that in my knowledge base."`,
        },
      ],
      temperature: 0.5,
    });
    
    // Return the response with sources
    console.log("Returning RAG response with sources");
    return NextResponse.json({
      answer: completion.choices[0].message.content,
      sources: documents,
    } as RAGResponse);
  } catch (error) {
    console.error("Error in RAG endpoint:", error);
    return NextResponse.json({ 
      error: `Failed to process query: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 });
  }
}