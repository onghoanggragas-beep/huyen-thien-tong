const logBox = document.getElementById("log");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const cultivateBtn = document.getElementById("cultivateBtn");
const fightBtn = document.getElementById("fightBtn");

function addMsg(text, role = "npc") {
  const div = document.createElement("div");
  div.className = role;
  div.textContent = text;
  logBox.appendChild(div);
  logBox.scrollTop = logBox.scrollHeight;
}

let playerId = "p_" + Math.random().toString(36).slice(2);

async function enterGame() {
  const res = await fetch("/enter");
  const data = await res.json();
  addMsg(data.intro || "Ngươi bước vào Huyền Thiên Tông.", "npc");
}

sendBtn.onclick = async () => {
  const msg = input.value.trim();
  if (!msg) return;
  addMsg(msg, "player");
  input.value = "";

  const res = await fetch("/talk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  addMsg(data.reply || "NPC im lặng.", "npc");
};

cultivateBtn.onclick = async () => {
  const res = await fetch("/cultivate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId })
  });
  const data = await res.json();
  addMsg(data.msg || "Tu luyện xong.", "npc");
};

fightBtn.onclick = async () => {
  const res = await fetch("/fight", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId })
  });
  const data = await res.json();
  addMsg(data.msg || "Chiến đấu kết thúc.", "npc");
};

enterGame();
