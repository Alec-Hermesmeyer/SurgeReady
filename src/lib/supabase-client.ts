import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Cache the client to avoid creating new instances on every call
let supabaseClientInstance: SupabaseClient | null = null;

// Initialize the Supabase client
const getSupabaseClient = (): SupabaseClient => {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  // Use environment variables or hardcoded values for testing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://toyvsnymdhiwnywkbufd.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRveXZzbnltZGhpd255d2tidWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTYwNzQsImV4cCI6MjA1MzEzMjA3NH0.sScW1Cr_jkpPe6R1-K9LnWxmIjaMdtrv89TbRBB0ShE";
  


  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or anon key is missing");
    throw new Error("Supabase URL and anon key must be provided");
  }

  try {
    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized successfully");
    return supabaseClientInstance;
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
    throw new Error(`Supabase client initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Validate embedding format
const validateEmbedding = (embedding: any): number[] => {
  if (!embedding) {
    throw new Error("Embedding cannot be null or undefined");
  }
  
  if (!Array.isArray(embedding)) {
    throw new Error("Embedding must be an array");
  }
  
  if (embedding.length === 0) {
    throw new Error("Embedding array cannot be empty");
  }
  
  // Ensure all values are numbers
  for (let i = 0; i < embedding.length; i++) {
    if (typeof embedding[i] !== "number") {
      throw new Error(`Embedding at index ${i} is not a number: ${typeof embedding[i]}`);
    }
    
    // Check for NaN or Infinity values which can cause issues
    if (isNaN(embedding[i]) || !isFinite(embedding[i])) {
      throw new Error(`Embedding at index ${i} is invalid: ${embedding[i]}`);
    }
  }
  
  return embedding;
};

// Helper function to check if pgvector is enabled
export async function isPgvectorEnabled(): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    console.log("Checking pgvector extension...");
    
    const { data, error } = await supabase.rpc("check_vector_extension");

    if (error) {
      console.error("Error checking pgvector extension:", error);
      return false;
    }

    console.log("pgvector extension check result:", data);
    return !!data;
  } catch (error) {
    console.error("Exception in isPgvectorEnabled:", error);
    return false;
  }
}

// Test basic Supabase connectivity
export async function testConnection(): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    console.log("Testing Supabase connection...");
    
    // Try a simple query to test connectivity
    const { data, error } = await supabase
      .from("emergency_documents")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("Connection test error:", error);
      return false;
    }

    console.log("Connection test successful");
    return true;
  } catch (error) {
    console.error("Exception in testConnection:", error);
    return false;
  }
}

// Function to search for similar documents
export async function searchDocuments(
  queryEmbedding: number[],
  metadata: Record<string, any> = {},
  matchThreshold = 0.7,
  matchCount = 5,
): Promise<any[]> {
  try {
    // Validate the embedding
    validateEmbedding(queryEmbedding);
    
    const supabase = getSupabaseClient();
    console.log("Searching documents with:", {
      embeddingLength: queryEmbedding.length,
      threshold: matchThreshold,
      count: matchCount,
      metadataFilter: metadata,
    });
    
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
      filter_metadata: metadata,
    });

    if (error) {
      console.error("Error searching documents:", error);
      console.error("Error details:", error.details || "No details provided");
      console.error("Error hint:", error.hint || "No hint provided");
      throw new Error(`Failed to search documents: ${error.message}`);
    }

    console.log(`Search returned ${data?.length || 0} results`);
    return data || [];
  } catch (error) {
    console.error("Exception in searchDocuments:", error);
    throw new Error(`Document search failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Function to insert a document with its embedding
export async function insertDocument(
  content: string, 
  metadata: Record<string, any>, 
  embedding: number[]
): Promise<any[]> {
  try {
    // Input validation
    if (!content || content.trim() === "") {
      throw new Error("Document content cannot be empty");
    }

    // Validate the embedding
    const validatedEmbedding = validateEmbedding(embedding);
    
    // Ensure metadata is a valid object
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
      throw new Error("Metadata must be a valid object");
    }

    const supabase = getSupabaseClient();
    console.log("Inserting document:", {
      contentLength: content.length,
      metadataKeys: Object.keys(metadata),
      embeddingLength: validatedEmbedding.length,
      embeddingSample: validatedEmbedding.slice(0, 3),
    });

    // First, try to verify we can access the table without inserting
    const { error: accessError } = await supabase
      .from("emergency_documents")
      .select("id", { count: "exact", head: true });
      
    if (accessError) {
      console.error("Error accessing documents table:", accessError);
      throw new Error(`Cannot access documents table: ${accessError.message}`);
    }

    // Now try the insertion
    const { data, error } = await supabase
      .from("emergency_documents")
      .insert([
        {
          content: content.trim(),
          metadata: metadata,
          embedding: validatedEmbedding,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting document:", error);
      console.error("Error code:", error.code || "No code provided");
      console.error("Error details:", error.details || "No details provided");
      console.error("Error hint:", error.hint || "No hint provided");
      throw new Error(`Failed to insert document: ${error.message}`);
    }

    console.log("Document inserted successfully, ID:", data?.[0]?.id || "unknown");
    return data || [];
  } catch (error) {
    console.error("Exception in insertDocument:", error);
    throw new Error(`Document insertion failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Function to get all documents (for admin purposes)
export async function getAllDocuments(limit = 100, offset = 0): Promise<{ documents: any[], count: number }> {
  try {
    const supabase = getSupabaseClient();
    console.log(`Fetching documents with limit ${limit}, offset ${offset}`);
    
    const { data, error, count } = await supabase
      .from("emergency_documents")
      .select("id, content, metadata, created_at", { count: "exact" })
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching documents:", error);
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }

    console.log(`Retrieved ${data?.length || 0} documents out of ${count || 0} total`);
    return { documents: data || [], count: count || 0 };
  } catch (error) {
    console.error("Exception in getAllDocuments:", error);
    throw new Error(`Document retrieval failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Function to delete a document
export async function deleteDocument(id: string): Promise<boolean> {
  try {
    if (!id) {
      throw new Error("Document ID is required");
    }

    const supabase = getSupabaseClient();
    console.log(`Deleting document with ID: ${id}`);
    
    const { error } = await supabase
      .from("emergency_documents")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting document:", error);
      throw new Error(`Failed to delete document: ${error.message}`);
    }

    console.log("Document deleted successfully");
    return true;
  } catch (error) {
    console.error("Exception in deleteDocument:", error);
    throw new Error(`Document deletion failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Add a function to inspect the Supabase schema
export async function inspectSchema(): Promise<any> {
  try {
    const supabase = getSupabaseClient();
    console.log("Inspecting database schema...");
    
    // Check for table existence
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public");
      
    if (tablesError) {
      console.error("Error inspecting tables:", tablesError);
      throw new Error(`Schema inspection failed: ${tablesError.message}`);
    }
    
    // Get column information for the emergency_documents table
    const { data: columns, error: columnsError } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type, udt_name")
      .eq("table_name", "emergency_documents")
      .eq("table_schema", "public");
      
    if (columnsError) {
      console.error("Error inspecting columns:", columnsError);
      throw new Error(`Schema inspection failed: ${columnsError.message}`);
    }
    
    return {
      tables: tables?.map(t => t.table_name) || [],
      emergencyDocumentsColumns: columns || []
    };
  } catch (error) {
    console.error("Exception in inspectSchema:", error);
    throw new Error(`Schema inspection failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}