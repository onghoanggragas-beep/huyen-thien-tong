let players = globalThis.players || (globalThis.players = {});

export async function onRequest({ request }) {
  const body = await request.json().catch(() => ({}));
  const id = body.playerId || "guest";

  if (!players[id]) {
    players[id] = {
      realm: "Luyện Khí tầng 1",
      exp: 0,
      hp: 100
    };
  }

  const p = players[id];

  // 10% tẩu hỏa
  if (Math.random() < 0.1) {
    p.hp -= 30;
    return new Response(JSON.stringify({
      type: "fail",
      msg: "Tẩu hỏa nhập ma! HP giảm mạnh.",
      hp: p.hp
    }), { headers: { "Content-Type": "application/json" }});
  }

  p.exp += 10;

  if (p.exp >= 100) {
    p.exp = 0;
    p.realm = "Luyện Khí tầng 2";
    return new Response(JSON.stringify({
      type: "breakthrough",
      msg: "Đột phá cảnh giới! Luyện Khí tầng 2."
    }), { headers: { "Content-Type": "application/json" }});
  }

  return new Response(JSON.stringify({
    type: "success",
    msg: "Tu luyện thành công, linh lực tăng.",
    exp: p.exp
  }), { headers: { "Content-Type": "application/json" }});
}
