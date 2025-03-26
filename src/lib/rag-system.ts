import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@supabase/supabase-js"

// This would be your Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to search for relevant documents
async function searchDocuments(query: string) {
  // This assumes you have a 'documents' table with a full-text search index
  // and columns: id, content, title, category
  const { data, error } = await supabase
    .from("documents")
    .select("id, content, title, category")
    .textSearch("content", query, {
      type: "websearch",
      config: "english",
    })
    .limit(5)

  if (error) {
    console.error("Error searching documents:", error)
    return []
  }

  return data || []
}

// Function to generate a response using RAG
export async function generateRagResponse(question: string, patientContext?: string) {
  try {
    // 1. Retrieve relevant documents based on the question
    const relevantDocs = await searchDocuments(question)

    // 2. Format the context from retrieved documents
    let context = relevantDocs
      .map((doc) => `Title: ${doc.title}\nCategory: ${doc.category}\nContent: ${doc.content}`)
      .join("\n\n")

    // 3. Add patient context if available
    if (patientContext) {
      context = `Patient Information: ${patientContext}\n\n${context}`
    }

    // 4. Create a prompt that includes the context and question
    const prompt = `
You are Dr. Spenser Miller, a neurologist specializing in brain treatments at the Brain Treatment Center Dallas.
You provide helpful, accurate, and compassionate responses to patient questions.

Here is some relevant information to help answer the patient's question:
${context}

Patient Question: ${question}

Please provide a thorough, accurate response based on the information provided. 
If you cannot answer the question based on the available information, acknowledge this and suggest 
that the patient discuss this with Dr. Miller during their next appointment.
Your response should be professional but conversational, as if Dr. Miller is speaking directly to the patient.
`

    // 5. Generate the response using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "You are an AI assistant for Dr. Spenser Miller at the Brain Treatment Center Dallas. Provide accurate, helpful information based on Dr. Miller's expertise and the provided context. Never make up information not supported by the context.",
    })

    return {
      response: text,
      sources: relevantDocs.map((doc) => ({ title: doc.title, category: doc.category })),
    }
  } catch (error) {
    console.error("Error generating RAG response:", error)
    throw new Error("Failed to generate response. Please try again.")
  }
}

