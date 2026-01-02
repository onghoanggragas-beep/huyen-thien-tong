export async function onRequest() {
  return new Response(
    JSON.stringify({ realm: Math.floor(Math.random() * 3) + 1 }),
    { headers: { "Content-Type": "application/json" } }
  );
}
