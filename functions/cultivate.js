let players = globalThis.players || (globalThis.players = {});

export async function onRequest({ request }) {
  const { playerId } = await request.json();
  if (!players[playerId]) {
    players[playerId] = { realm: "Luyện Khí tầng 1", exp: 0, hp: 100 };
  }
  const p = players[playerId];

  if (Math.random() < 0.1) {
    p.hp -= 20;
    return Response.json({ msg: "⚠️ Tẩu hỏa nhập ma!", hp: p.hp });
  }

  p.exp += 20;
  if (p.exp >= 100) {
    p.exp = 0;
    p.realm = "Luyện Khí tầng 2";
    return Response.json({ msg: "✨ Đột phá Luyện Khí tầng 2!", realm: p.realm, exp: p.exp });
  }

  return Response.json({ msg: "🧘 Tu luyện thành công", exp: p.exp });
}
