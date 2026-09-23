export async function onRequestPost(context) {
  const key = context.env.DIFY_API_KEY;
  const base = (context.env.DIFY_BASE_URL || "https://api.dify.ai/v1").replace(/\/+$/, "");
  if (!key) return Response.json({error:"服务器尚未设置 DIFY_API_KEY"}, {status:500});
  try {
    const body = await context.request.json();
    const query = (body.query || "").trim();
    const conversation_id = body.conversation_id || "";
    if (!query) return Response.json({error:"问题不能为空"}, {status:400});
    const r = await fetch(`${base}/chat-messages`, {
      method:"POST",
      headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},
      body:JSON.stringify({inputs:{},query,response_mode:"blocking",conversation_id,user:"web-user"})
    });
    const data = await r.json();
    if (!r.ok) return Response.json({error:data.message || data.code || "Dify API 请求失败"}, {status:r.status});
    return Response.json({answer:data.answer || "",conversation_id:data.conversation_id || conversation_id});
  } catch(e) {
    return Response.json({error:e.message || "服务器错误"}, {status:500});
  }
}