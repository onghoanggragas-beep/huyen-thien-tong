// ====== DOM ======
const logBox = document.getElementById("log");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

// ====== Helper ======
function addMsg(text, role = "npc") {
  const div = document.createElement("div");
  div.className = role;
  div.textContent = text;
  logBox.appendChild(div);
  logBox.scrollTop = logBox.scrollHeight;
}

// ====== Enter game ======
async function enterGame() {
  try {
    const res = await fetch("/enter");
    const data = await res.json();
    addMsg(data.intro || "Ngươi bước vào Huyền Thiên Tông.", "npc");
  } catch (e) {
    addMsg("❌ Không thể kết nối tông môn.", "npc");
  }
}

// ====== Talk to NPC ======
async function talkNPC(message) {
  try {
    const res = await fetch("/talk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    addMsg(data.reply || "NPC im lặng.", "npc");
  } catch (e) {
    addMsg("❌ NPC không trả lời.", "npc");
  }
}

// ====== Cultivate ======
async function cultivate() {
  try {
    const res = await fetch("/cultivate");
    const data = await res.json();
    if (data.dead) {
      addMsg("💀 Tẩu hỏa nhập ma, thân tử đạo tiêu.", "npc");
    } else {
      addMsg(`🧘 Tu luyện thành công, cảnh giới hiện tại: ${data.realm}`, "npc");
    }
  } catch (e) {
    addMsg("❌ Tu luyện thất bại.", "npc");
  }
}

// ====== Events ======
sendBtn.addEventListener("click", () => {
  const msg = input.value.trim();
  if (!msg) return;

  addMsg(msg, "player");
  input.value = "";

  if (msg.toLowerCase().includes("tu luyện")) {
    cultivate();
  } else {
    talkNPC(msg);
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// ====== Start ======
enterGame();  }
}

// Tu luyện
async function cultivate() {
  try {
    const res = await fetch("/cultivate");
    const data = await res.json();
    write(`🧘‍♂️ Ngươi tu luyện, cảnh giới tăng lên: ${data.realm}`, "npc");
  } catch (e) {
    write("❌ Tu luyện thất bại.", "npc");
  }
}

// Nút gửi
sendBtn.onclick = () => {
  const msg = input.value.trim();
  if (!msg) return;

  write(msg, "player");
  input.value = "";

  if (msg.toLowerCase().includes("tu luyện")) {
    cultivate();
  } else {
    talk(msg);
  }
};

// Enter để gửi
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendBtn.click();
});

// Bắt đầu game
enterGame();
