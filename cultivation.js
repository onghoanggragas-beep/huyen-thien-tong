/* =========================
   CULTIVATION SYSTEM
========================= */

let cultivating = false;
let cultivateTimer = null;

/* =========================
   TOGGLE CULTIVATION
========================= */
function toggleCultivation() {
  cultivating = !cultivating;

  const btn = document.getElementById("cultivate-btn");
  if (!btn) return;

  if (cultivating) {
    btn.innerText = "⏸ Dừng tu luyện";
    startCultivation();
  } else {
    btn.innerText = "🧘 Tu luyện";
    stopCultivation();
  }
}

/* =========================
   START / STOP
========================= */
function startCultivation() {
  if (cultivateTimer) return;

  cultivateTimer = setInterval(() => {
    gainQi();
  }, 1000);
}

function stopCultivation() {
  clearInterval(cultivateTimer);
  cultivateTimer = null;
}

/* =========================
   GAIN QI
========================= */
function gainQi() {
  if (!player) return;

  const gain = player.qiGain || 1;
  player.qi += gain;

  if (player.qi >= player.qiMax) {
    player.qi = player.qiMax;
    stopCultivation();
    cultivating = false;

    showBreakthroughButton(); // 🔥 QUAN TRỌNG
  }

  updateQiUI();
  saveGame();
}

/* =========================
   BREAKTHROUGH BUTTON
========================= */
function showBreakthroughButton() {
  let btn = document.getElementById("breakthrough-btn");

  if (!btn) {
    btn = document.createElement("button");
    btn.id = "breakthrough-btn";
    btn.innerText = "⚡ Đột phá";
    btn.onclick = breakthrough;

    btn.className = "breakthrough-btn";
    document.querySelector(".character-area").appendChild(btn);
  }

  btn.style.display = "block";
}

/* =========================
   BREAKTHROUGH
========================= */
function breakthrough() {
  if (!player) return;
  if (player.qi < player.qiMax) return;

  player.qi = 0;
  player.realmLevel += 1;
  player.qiMax = Math.floor(player.qiMax * 1.5);
  player.qiGain += 0.5;

  updateQiUI();
  updateHeader();
  hideBreakthroughButton();
  saveGame();

  alert("✨ Đột phá thành công!");
}

/* =========================
   HIDE BUTTON
========================= */
function hideBreakthroughButton() {
  const btn = document.getElementById("breakthrough-btn");
  if (btn) btn.style.display = "none";
}

/* =========================
   UPDATE UI
========================= */
function updateQiUI() {
  const fill = document.getElementById("qi-fill");
  const text = document.getElementById("qi-text");

  if (!fill || !text) return;

  const percent = (player.qi / player.qiMax) * 100;
  fill.style.width = percent + "%";
  text.innerText = `${player.qi.toFixed(1)} / ${player.qiMax}`;
     }
