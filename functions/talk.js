export async function onRequest(context) {
  const body = await context.request.json();
  return new Response(
    JSON.stringify({ reply: `Tông chủ nhìn ${body.message}` }),
    { headers: { "Content-Type": "application/json" } }
  );
}
