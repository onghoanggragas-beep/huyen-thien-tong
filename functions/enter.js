export async function onRequest() {
  return new Response(JSON.stringify({
    intro: "Ngươi bước vào Huyền Thiên Tông. Con đường tu tiên bắt đầu."
  }), { headers: { "Content-Type": "application/json" }});
}
