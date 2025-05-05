import { QdrantClient } from "@qdrant/js-client-rest"
import { createEmbedding } from "./createEmbeddings"
import crypto from "crypto" // For UUIDs if needed

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333",
  apiKey: process.env.QDRANT_API_KEY,
})

const COLLECTION_NAME = "documents"

export async function ingestDocument(
  title: string,
  content: string,
  category: string,
  fileUrl?: string,
  metadata: Record<string, any> = {},
) {
  try {
    const vector = await createEmbedding(content)

    const id = crypto.randomUUID()

    const point = {
      id,
      vector,
      payload: {
        title,
        category,
        content,
        fileUrl,
        metadata,
        createdAt: new Date().toISOString(),
      },
    }

    await qdrant.upsert(COLLECTION_NAME, {
      points: [point],
    })

    return point
  } catch (error) {
    console.error("Error in document ingestion:", error)
    throw error
  }
}

export async function ingestMultipleDocuments(
  documents: Array<{
    title: string
    content: string
    category: string
    fileUrl?: string
    metadata?: Record<string, any>
  }>,
) {
  try {
    const vectors = await Promise.all(documents.map((doc) => createEmbedding(doc.content)))

    const points = documents.map((doc, index) => ({
      id: crypto.randomUUID(),
      vector: vectors[index],
      payload: {
        title: doc.title,
        category: doc.category,
        content: doc.content,
        fileUrl: doc.fileUrl,
        metadata: doc.metadata || {},
        createdAt: new Date().toISOString(),
      },
    }))

    await qdrant.upsert(COLLECTION_NAME, { points })

    return points
  } catch (error) {
    console.error("Error ingesting multiple documents:", error)
    throw error
  }
}

export async function deleteDocument(id: string) {
  try {
    await qdrant.delete(COLLECTION_NAME, {
      points: [id],
    })

    return true
  } catch (error) {
    console.error("Error deleting document:", error)
    throw error
  }
}

export async function updateDocument(
  id: string,
  updates: {
    title?: string
    content?: string
    category?: string
    fileUrl?: string
    metadata?: Record<string, any>
  },
) {
  try {
    // If content is updated, we need to re-embed
    const vector = updates.content ? await createEmbedding(updates.content) : undefined

    const point = {
      id,
      ...(vector && { vector }),
      payload: {
        ...(updates.title && { title: updates.title }),
        ...(updates.category && { category: updates.category }),
        ...(updates.fileUrl && { fileUrl: updates.fileUrl }),
        ...(updates.metadata && { metadata: updates.metadata }),
        ...(updates.content && { content: updates.content }),
        updatedAt: new Date().toISOString(),
      },
    }

    await qdrant.upsert(COLLECTION_NAME, {
      points: [point],
    })

    return point
  } catch (error) {
    console.error("Error updating document:", error)
    throw error
  }
}
