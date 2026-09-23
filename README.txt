南京大学生创业政策智能咨询助手
Vercel 部署版

部署时只需要：
1. 把整个项目上传到 Vercel。
2. Vercel -> Settings -> Environment Variables
3. 添加 DIFY_API_KEY = 你的 Dify API Key
4. 可选：DIFY_BASE_URL = https://api.dify.ai/v1
5. Redeploy / Deploy。
6. 打开 Vercel 分配的网址测试。

注意：
- 不要把 Dify API Key 写进 public/index.html。
- 本项目通过 /api/chat 在服务器端调用 Dify。
- 如果你的 Dify 工作区使用自定义 API 地址，请修改 DIFY_BASE_URL。
