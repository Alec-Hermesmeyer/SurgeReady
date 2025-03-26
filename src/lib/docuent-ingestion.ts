import { createClient } from "@supabase/supabase-js"

// This would be your Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to ingest a document into the RAG system
export async function ingestDocument(
  title: string,
  content: string,
  category: string,
  metadata: Record<string, any> = {},
) {
  try {
    // Insert the document into the documents table
    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          title,
          content,
          category,
          metadata,
        },
      ])
      .select()

    if (error) {
      console.error("Error ingesting document:", error)
      throw new Error("Failed to ingest document")
    }

    return data[0]
  } catch (error) {
    console.error("Error in document ingestion:", error)
    throw error
  }
}

// Function to ingest multiple documents
export async function ingestMultipleDocuments(
  documents: Array<{
    title: string
    content: string
    category: string
    metadata?: Record<string, any>
  }>,
) {
  try {
    const { data, error } = await supabase
      .from("documents")
      .insert(
        documents.map((doc) => ({
          title: doc.title,
          content: doc.content,
          category: doc.category,
          metadata: doc.metadata || {},
        })),
      )
      .select()

    if (error) {
      console.error("Error ingesting multiple documents:", error)
      throw new Error("Failed to ingest documents")
    }

    return data
  } catch (error) {
    console.error("Error in multiple document ingestion:", error)
    throw error
  }
}

// Function to delete a document
export async function deleteDocument(id: number) {
  try {
    const { error } = await supabase.from("documents").delete().eq("id", id)

    if (error) {
      console.error("Error deleting document:", error)
      throw new Error("Failed to delete document")
    }

    return true
  } catch (error) {
    console.error("Error in document deletion:", error)
    throw error
  }
}

// Function to update a document
export async function updateDocument(
  id: number,
  updates: {
    title?: string
    content?: string
    category?: string
    metadata?: Record<string, any>
  },
) {
  try {
    const { data, error } = await supabase.from("documents").update(updates).eq("id", id).select()

    if (error) {
      console.error("Error updating document:", error)
      throw new Error("Failed to update document")
    }

    return data[0]
  } catch (error) {
    console.error("Error in document update:", error)
    throw error
  }
}

