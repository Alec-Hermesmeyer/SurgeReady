import { OpenAI } from "openai"
import { generateEmbedding } from "@/lib/document-processor"
import { searchDocuments } from "@/lib/supabase-client"
import { type NextRequest, NextResponse } from "next/server"
import type { RAGQuery, RAGResponse } from "@/types/rag"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = (await request.json()) as RAGQuery
    const { query, filters = {} } = body

    if (!query || query.trim() === "") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)

    // Search for relevant documents
    const documents = await searchDocuments(
      queryEmbedding,
      filters,
      0.7, // similarity threshold
      5, // number of documents to retrieve
    )

    if (!documents || documents.length === 0) {
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
      })

      return NextResponse.json({
        answer: completion.choices[0].message.content,
        sources: [],
      } as RAGResponse)
    }

    // Prepare context from retrieved documents
    interface Document {
      content: string
      metadata: Record<string, unknown>
    }

    const context: string = documents
      .map((doc: Document) => `${doc.content}\n\nSource: ${JSON.stringify(doc.metadata)}`)
      .join("\n\n")

    // Generate response using the context
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
    })

    // Return the response with sources
    return NextResponse.json({
      answer: completion.choices[0].message.content,
      sources: documents,
    } as RAGResponse)
  } catch (error) {
    console.error("Error in RAG endpoint:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}

