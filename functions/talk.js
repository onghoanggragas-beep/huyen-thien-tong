export async function onRequest({ request }) {
  const { message } = await request.json();
  return Response.json({
    reply: `📜 Tông môn ghi nhận lời nói: "${message}"`
  });
}
