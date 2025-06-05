import { NextRequest, NextResponse } from "next/server";
import { processDocument, processFile, validateFile } from "@/lib/simple-document-processor";
import { getAllDocuments, deleteDocument, searchDocuments } from "@/lib/simple-document-storage";

// GET: Fetch documents with pagination and optional search
export async function GET(request: NextRequest) {
  try {
    console.log("GET request to /api/documents");
    
    const url = new URL(request.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "20");
    const offset = Number.parseInt(url.searchParams.get("offset") || "0");
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";
    const emergency_type = url.searchParams.get("emergency_type") || "";
    
    console.log(`Fetching documents with limit=${limit}, offset=${offset}, search="${search}"`);
    
    let result;
    
    if (search.trim()) {
      // Use search functionality
      const documents = await searchDocuments(
        search,
        category || undefined,
        emergency_type || undefined
      );
      
      // Apply pagination to search results
      const paginatedDocs = documents.slice(offset, offset + limit);
      
      result = {
        documents: paginatedDocs,
        count: documents.length,
        limit,
        offset
      };
    } else {
      // Use regular pagination
      result = await getAllDocuments(
        limit,
        offset,
        category || undefined,
        emergency_type || undefined
      );
      
      result = {
        ...result,
        limit,
        offset
      };
    }
    
    return NextResponse.json(result);
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
    
    // Extract form data
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string | null;
    const title = formData.get("title") as string | null;
    const category = formData.get("category") as string | null;
    const emergency_type = formData.get("emergency_type") as string | null;
    const tagsStr = formData.get("tags") as string | null;
    
    console.log("Form data received:", {
      hasFile: !!file,
      fileType: file?.type,
      hasText: !!text,
      textLength: text?.length,
      title,
      category,
      emergency_type,
      tags: tagsStr
    });
    
    if (!file && !text) {
      return NextResponse.json(
        { error: "Either file or text content is required" },
        { status: 400 }
      );
    }
    
    // Parse tags
    let tags: string[] = [];
    if (tagsStr) {
      try {
        tags = JSON.parse(tagsStr);
        if (!Array.isArray(tags)) {
          tags = [tagsStr];
        }
      } catch (e) {
        tags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      }
    }
    
    // Prepare metadata
    const metadata = {
      title: title || undefined,
      category: category || "General",
      emergency_type: emergency_type || undefined,
      tags: tags,
    };
    
    let documentIds: string[];
    
    if (file) {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
      
      // Process file
      documentIds = await processFile(file, metadata);
    } else if (text) {
      // Process text
      documentIds = await processDocument(text, metadata);
    } else {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      documentIds,
      documentCount: documentIds.length,
      message: `Successfully processed ${documentIds.length} document(s)`
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
    
    const success = await deleteDocument(id);
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        message: "Document deleted successfully"
      });
    } else {
      return NextResponse.json(
        { error: "Document not found or could not be deleted" },
        { status: 404 }
      );
    }
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