export async function GET(request) {
    return Response.json({
      message: "Test API is working",
      timestamp: new Date().toISOString()
    });
  }