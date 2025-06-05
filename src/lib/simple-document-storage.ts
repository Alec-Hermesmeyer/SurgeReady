import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client for basic document storage
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://toyvsnymdhiwnywkbufd.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRveXZzbnltZGhpd255d2tidWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTYwNzQsImV4cCI6MjA1MzEzMjA3NH0.sScW1Cr_jkpPe6R1-K9LnWxmIjaMdtrv89TbRBB0ShE";
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

export interface EmergencyDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  emergency_type?: string;
  tags: string[];
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentMetadata {
  title: string;
  category: string;
  emergency_type?: string;
  tags?: string[];
  file_url?: string;
}

// Create a new document
export async function createDocument(
  content: string,
  metadata: DocumentMetadata
): Promise<EmergencyDocument> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("surge_documents")
      .insert([
        {
          title: metadata.title,
          content: content.trim(),
          category: metadata.category,
          emergency_type: metadata.emergency_type,
          tags: metadata.tags || [],
          file_url: metadata.file_url,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating document:", error);
      throw new Error(`Failed to create document: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception in createDocument:", error);
    throw new Error(`Document creation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Get all documents with pagination
export async function getAllDocuments(
  limit = 20,
  offset = 0,
  category?: string,
  emergency_type?: string
): Promise<{ documents: EmergencyDocument[], count: number }> {
  try {
    const supabase = getSupabaseClient();
    
    let query = supabase
      .from("surge_documents")
      .select("*", { count: "exact" });

    // Apply filters if provided
    if (category) {
      query = query.eq("category", category);
    }
    
    if (emergency_type) {
      query = query.eq("emergency_type", emergency_type);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching documents:", error);
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }

    return {
      documents: data || [],
      count: count || 0
    };
  } catch (error) {
    console.error("Exception in getAllDocuments:", error);
    throw new Error(`Document fetch failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Search documents by content or title
export async function searchDocuments(
  searchQuery: string,
  category?: string,
  emergency_type?: string
): Promise<EmergencyDocument[]> {
  try {
    const supabase = getSupabaseClient();
    
    let query = supabase
      .from("surge_documents")
      .select("*");

    // Apply text search
    if (searchQuery.trim()) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    // Apply filters
    if (category) {
      query = query.eq("category", category);
    }
    
    if (emergency_type) {
      query = query.eq("emergency_type", emergency_type);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error searching documents:", error);
      throw new Error(`Failed to search documents: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error("Exception in searchDocuments:", error);
    throw new Error(`Document search failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Update a document
export async function updateDocument(
  id: string,
  updates: Partial<DocumentMetadata & { content: string }>
): Promise<EmergencyDocument> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("surge_documents")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating document:", error);
      throw new Error(`Failed to update document: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception in updateDocument:", error);
    throw new Error(`Document update failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Delete a document
export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from("surge_documents")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting document:", error);
      throw new Error(`Failed to delete document: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception in deleteDocument:", error);
    throw new Error(`Document deletion failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Get document by ID
export async function getDocumentById(id: string): Promise<EmergencyDocument | null> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("surge_documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Document not found
      }
      console.error("Error fetching document:", error);
      throw new Error(`Failed to fetch document: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception in getDocumentById:", error);
    throw new Error(`Document fetch failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
} 