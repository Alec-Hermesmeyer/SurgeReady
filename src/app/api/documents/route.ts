import { NextRequest, NextResponse } from "next/server";
import { processDocument, processFile } from "@/lib/simplified-document-processor";
import { getAllDocuments } from "@/lib/supabase-client";

// GET: Fetch documents with pagination
export async function GET(request: NextRequest) {
  try {
    console.log("GET request to /api/admin/documents");
    
    // Parse query parameters
    const url = new URL(request.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "20");
    const offset = Number.parseInt(url.searchParams.get("offset") || "0");
    
    console.log(`Fetching documents with limit=${limit}, offset=${offset}`);
    
    // Get documents from Supabase
    const { documents, count } = await getAllDocuments(limit, offset);
    
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
    console.log("POST request to /api/admin/documents");
    
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
    
    // Process the document
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