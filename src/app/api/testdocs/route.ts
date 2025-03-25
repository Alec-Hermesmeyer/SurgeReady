export async function GET(request) {
    return Response.json({
      message: "Documents test API is working",
      timestamp: new Date().toISOString()
    });
  }
  
  export async function POST(request) {
    // Log what we received
    console.log("POST to /api/testdocs received");
    
    try {
      const formData = await request.formData();
      const text = formData.get("text");
      const metadata = formData.get("metadata");
      
      console.log("Received:", { 
        hasText: !!text, 
        textLength: text?.length,
        hasMetadata: !!metadata 
      });
      
      // Return success
      return Response.json({
        success: true,
        message: "Document received"
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }