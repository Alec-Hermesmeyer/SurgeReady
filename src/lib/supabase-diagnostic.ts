import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Replace these with your actual Supabase URL and key for testing
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://toyvsnymdhiwnywkbufd.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRveXZzbnltZGhpd255d2tidWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTYwNzQsImV4cCI6MjA1MzEzMjA3NH0.sScW1Cr_jkpPe6R1-K9LnWxmIjaMdtrv89TbRBB0ShE";

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to test table access
async function testTableAccess() {
  console.log("Testing basic table access...");
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/emergency_documents?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log("Direct fetch status:", response.status);
    console.log("Direct fetch ok:", response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
    } else {
      const data = await response.json();
      console.log("Response data:", data);
    }
    
    // Try using the Supabase client
    const { data, error } = await supabase
      .from('emergency_documents')
      .select('id')
      .limit(1);
      
    console.log("Supabase client result:", { data, error });
    
    return !error;
  } catch (e) {
    console.error("Table access error:", e);
    return false;
  }
}

// Function to test RPC function
async function testRPCFunction() {
  console.log("Testing RPC function...");
  try {
    const dummyEmbedding = Array(1536).fill(0.1);
    
    // Try direct fetch first
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_documents`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query_embedding: dummyEmbedding,
        match_threshold: 0.5,
        match_count: 1
      })
    });
    
    console.log("Direct RPC fetch status:", response.status);
    console.log("Direct RPC fetch ok:", response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("RPC error response:", errorText);
    }
    
    // Try using the Supabase client
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: dummyEmbedding,
      match_threshold: 0.5,
      match_count: 1
    });
    
    console.log("Supabase RPC client result:", { data, error });
    
    return !error;
  } catch (e) {
    console.error("RPC function error:", e);
    return false;
  }
}

// Function to test INSERT operation
async function testInsert() {
  console.log("Testing INSERT operation...");
  try {
    // Create a minimal record for testing
    const testData = {
      content: "Test document content",
      metadata: { source: "diagnostic-test" },
      // Skip embedding for initial test
    };
    
    // Try direct fetch first
    const response = await fetch(`${SUPABASE_URL}/rest/v1/emergency_documents`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify([testData])
    });
    
    console.log("Direct INSERT status:", response.status);
    console.log("Direct INSERT ok:", response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("INSERT error response:", errorText);
    }
    
    // Try using the Supabase client
    const { data, error } = await supabase
      .from('emergency_documents')
      .insert([testData]);
      
    console.log("Supabase INSERT client result:", { data, error });
    
    return !error;
  } catch (e) {
    console.error("INSERT error:", e);
    return false;
  }
}

// Function to test extension existence
async function testVectorExtension() {
  console.log("Testing vector extension...");
  try {
    // Try using the check_vector_extension RPC function
    const { data, error } = await supabase.rpc('check_vector_extension');
    
    console.log("Vector extension check result:", { data, error });
    
    if (error) {
      // Fall back to direct query
      const { data: queryData, error: queryError } = await supabase.from('pg_extension')
        .select('*')
        .eq('extname', 'vector');
        
      console.log("Direct extension query result:", { data: queryData, error: queryError });
      
      return queryData && queryData.length > 0;
    }
    
    return !!data;
  } catch (e) {
    console.error("Vector extension check error:", e);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log("Running Supabase diagnostic tests...");
  console.log("Supabase URL:", SUPABASE_URL);
  console.log("Supabase key (first 4 chars):", SUPABASE_KEY.substring(0, 4) + "...");
  
  try {
    // Test vector extension
    const vectorExtensionOk = await testVectorExtension();
    console.log("\nVector extension enabled:", vectorExtensionOk);
    
    // Test table access
    const tableAccessOk = await testTableAccess();
    console.log("\nTable access:", tableAccessOk ? "OK" : "FAILED");
    
    // Test RPC function
    const rpcFunctionOk = await testRPCFunction();
    console.log("\nRPC function:", rpcFunctionOk ? "OK" : "FAILED");
    
    // Test INSERT operation
    const insertOk = await testInsert();
    console.log("\nINSERT operation:", insertOk ? "OK" : "FAILED");
    
    console.log("\nDiagnostic Summary:");
    console.log("- Vector Extension: " + (vectorExtensionOk ? "✅" : "❌"));
    console.log("- Table Access: " + (tableAccessOk ? "✅" : "❌"));
    console.log("- RPC Function: " + (rpcFunctionOk ? "✅" : "❌"));
    console.log("- INSERT Operation: " + (insertOk ? "✅" : "❌"));
    
  } catch (error) {
    console.error("Error running diagnostics:", error);
  }
}

// Export the test functions
export { 
  testTableAccess, 
  testRPCFunction, 
  testInsert, 
  testVectorExtension,
  runAllTests
};

// Auto-run if executed directly
if (typeof window !== 'undefined') {
  runAllTests();
}