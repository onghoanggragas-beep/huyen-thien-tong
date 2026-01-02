export async function onRequest() {
  return new Response(
    JSON.stringify({ intro: "Ngươi bước vào Huyền Thiên Tông." }),
    { headers: { "Content-Type": "application/json" } }
  );
}
