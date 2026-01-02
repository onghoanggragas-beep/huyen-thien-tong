const log = document.getElementById("log");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

// Hàm ghi log ra màn hình
function write(text, who = "npc") {
  const div = document.createElement("div");
  div.className = who;
  div.innerText = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

// Khi vào game
async function enterGame() {
  try {
    const res = await fetch("/enter");
    const data = await res.json();
    write(data.intro, "npc");
  } catch (e) {
    write("❌ Không thể kết nối tông môn.", "npc");
  }
}

// Gửi tin nhắn cho NPC
async function talk(message) {
  try {
    const res = await fetch("/talk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    write(data.reply, "npc");
  } catch (e) {
    write("❌ NPC không trả lời.", "npc");
  }
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
