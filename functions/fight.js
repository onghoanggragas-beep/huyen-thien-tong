let players = globalThis.players || (globalThis.players = {});

export async function onRequest({ request }) {
  const body = await request.json();
  const id = body.playerId || "guest";

  if (!players[id]) {
    players[id] = { hp: 100 };
  }

  const enemyHp = 50 + Math.floor(Math.random() * 30);
  const damage = Math.floor(Math.random() * 40);

  if (damage > enemyHp) {
    return new Response(JSON.stringify({
      result: "win",
      msg: "Ngươi đánh bại ngoại môn đệ tử!"
    }), { headers: { "Content-Type": "application/json" }});
  } else {
    players[id].hp -= 20;
    return new Response(JSON.stringify({
      result: "lose",
      msg: "Bị đánh bại! HP giảm.",
      hp: players[id].hp
    }), { headers: { "Content-Type": "application/json" }});
  }
         }
