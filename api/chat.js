export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.DIFY_API_KEY;
  const base = (process.env.DIFY_BASE_URL || "https://api.dify.ai/v1").replace(/\/+$/, "");
  if (!key) return res.status(500).json({ error: "服务器尚未设置 DIFY_API_KEY" });

  try {
    const { query, conversation_id = "" } = req.body || {};
    if (!query || !query.trim()) return res.status(400).json({ error: "问题不能为空" });

    const r = await fetch(`${base}/chat-messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: {},
        query: query.trim(),
        response_mode: "blocking",
        conversation_id,
        user: "web-user"
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || data.code || "Dify API 请求失败" });

    return res.status(200).json({
      answer: data.answer || "",
      conversation_id: data.conversation_id || conversation_id
    });
  } catch (e) {
    return res.status(500).json({ error: e.message || "服务器错误" });
  }
}
