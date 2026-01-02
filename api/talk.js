import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req, res) {
  const { message } = req.body;
  const r = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "Ngươi là tông chủ tu tiên, nói chuyện cổ phong." },
      { role: "user", content: message }
    ]
  });
  res.json({ reply: r.choices[0].message.content });
}
