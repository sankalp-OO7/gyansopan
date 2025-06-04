// app/api/request-demo/route.js
export async function POST(req) {
    try {
      const data = await req.json();
      // data = { name, email, mobile, message, project }
      console.log("Demo request received:", data);
  
      // TODO: hook into your emailing service or database here.
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ status: "error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  