import { NextRequest, NextResponse } from "next/server";
import { processDocument, processFile } from "@/lib/simplified-document-processor";
import { QdrantClient } from "@qdrant/js-client-rest";

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333",
  apiKey: process.env.QDRANT_API_KEY,
});

const COLLECTION_NAME = "documents";

// Function to get all documents from Qdrant with pagination
async function getAllDocumentsFromQdrant(limit: number = 20, offset: number = 0) {
  try {
    // Get the total count of documents
    const countInfo = await qdrant.getCollection(COLLECTION_NAME);
    const count = countInfo.points_count || 0;

    // Scroll through documents with pagination
    const response = await qdrant.scroll(COLLECTION_NAME, {
      limit: limit,
      offset: offset,
      with_payload: true,
      with_vector: false,
    });

    // Format the documents to match the expected format in the frontend
    const documents = response.points.map((point) => ({
      id: point.id,
      content: point.payload?.content ?? "",
      metadata: {
        title: point.payload?.title ?? "",
        category: point.payload?.category,
        emergencyType: (point.payload?.metadata as { emergencyType?: string })?.emergencyType,
        tags: (point.payload?.metadata as { tags?: string[] })?.tags || [],
        ...(point.payload?.metadata || {}),
      },
      created_at: point.payload?.createdAt || new Date().toISOString(),
    }));

    return { documents, count };
  } catch (error) {
    console.error("Error fetching documents from Qdrant:", error);
    throw error;
  }
}

// GET: Fetch documents with pagination
export async function GET(request: NextRequest) {
  try {
    console.log("GET request to /api/documents");
    // Parse query parameters
    const url = new URL(request.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "20");
    const offset = Number.parseInt(url.searchParams.get("offset") || "0");
    console.log(`Fetching documents with limit=${limit}, offset=${offset}`);
    
    // Get documents from Qdrant
    const { documents, count } = await getAllDocumentsFromQdrant(limit, offset);
    
    return NextResponse.json({
      documents,
      count,
      limit,
      offset
    });
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST: Upload and process a new document
export async function POST(request: NextRequest) {
  try {
    console.log("POST request to /api/documents");
    const formData = await request.formData();
    
    // Extract file or text content
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string | null;
    const metadataStr = formData.get("metadata") as string | null;
    
    console.log("Form data received:", {
      hasFile: !!file,
      fileType: file?.type,
      hasText: !!text,
      textLength: text?.length,
      hasMetadata: !!metadataStr
    });
    
    if (!file && !text) {
      return NextResponse.json(
        { error: "Either file or text content is required" },
        { status: 400 }
      );
    }
    
    // Parse metadata
    let metadata = {};
    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid metadata format" },
          { status: 400 }
        );
      }
    }
    
    // Process the document - Make sure this function uses Qdrant internally
    // If processFile and processDocument are still using Supabase, they'll need to be updated too
    let result;
    if (file) {
      // Process file
      result = await processFile(file, metadata);
    } else if (text) {
      // Process text
      result = await processDocument(text, metadata);
    }
    
    return NextResponse.json({
      success: true,
      documentCount: Array.isArray(result) ? result.length : 1
    });
  } catch (error: any) {
    console.error("Error processing document:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process document"
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a document by ID
export async function DELETE(request: NextRequest) {
  try {
    console.log("DELETE request to /api/documents");
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }
    
    // Delete from Qdrant
    await qdrant.delete(COLLECTION_NAME, {
      points: [id],
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to delete document" 
      },
      { status: 500 }
    );
  }
}