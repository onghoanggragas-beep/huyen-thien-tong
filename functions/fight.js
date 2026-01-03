let players = globalThis.players || (globalThis.players = {});

export async function onRequest({ request }) {
  const { playerId } = await request.json();
  if (!players[playerId]) players[playerId] = { hp: 100 };

  const win = Math.random() > 0.4;
  if (win) {
    return Response.json({ msg: "⚔️ Ngươi đánh bại ngoại môn đệ tử!" });
  } else {
    players[playerId].hp -= 30;
    return Response.json({ msg: "💀 Bị đánh bại!", hp: players[playerId].hp });
  }
}
