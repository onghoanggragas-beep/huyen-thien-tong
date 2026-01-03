/* =====================================
   GAME BOOTSTRAP & UI CONTROLLER
   TU TIEN RPG – MOBILE WEB
===================================== */

let currentCharacter = null;

/* =========================
   LOG SYSTEM
========================= */
function log(message) {
  const logBox = document.getElementById("log");
  if (!logBox) return;

  const line = document.createElement("div");
  line.className = "log-line";
  line.innerText = message;
  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
}

/* =========================
   CORE UI UPDATE
========================= */
function updateUI(char) {
  if (!char) return;

  const $ = id => document.getElementById(id);

  $("charName").innerText = char.name;
  $("charGender").innerText = char.gender === "male" ? "Nam" : "Nữ";
  $("charStage").innerText = `Cảnh giới: ${char.stage}`;
  $("charExp").innerText =
    `Linh khí: ${Math.floor(char.exp)} / ${Math.floor(char.expMax)}`;
  $("charHp").innerText =
    `HP: ${Math.floor(char.hp)} / ${Math.floor(char.maxHp)}`;
  $("charAtk").innerText = `ATK: ${Math.floor(char.atk)}`;
  $("charDef").innerText = `DEF: ${Math.floor(char.def)}`;

  renderLinhCan(char);
  renderTienThien(char);
  renderCongPhap(char);
}

/* =========================
   RENDER LINH CĂN
========================= */
function renderLinhCan(char) {
  const box = document.getElementById("linhCan");
  if (!box) return;
  box.innerHTML = "";

  char.linh_can.forEach(id => {
    const lc = LINH_CAN.find(l => l.id === id);
    if (!lc) return;

    const div = document.createElement("div");
    div.className = "tag linh-can";
    div.innerText = lc.name;
    box.appendChild(div);
  });
}

/* =========================
   RENDER TIÊN THIÊN
========================= */
function renderTienThien(char) {
  const box = document.getElementById("tienThien");
  if (!box) return;
  box.innerHTML = "";

  char.tien_thien.forEach(tt => {
    const div = document.createElement("div");
    div.className = `tag pham-${tt.pham}`;
    div.innerText = `${tt.name} (${PHAM_CHAT[tt.pham].name})`;
    box.appendChild(div);
  });
}

/* =========================
   RENDER CÔNG PHÁP
========================= */
function renderCongPhap(char) {
  const box = document.getElementById("congPhap");
  if (!box) return;
  box.innerHTML = "";

  if (!char.cong_phap) {
    box.innerText = "Chưa tu luyện công pháp";
    return;
  }

  const cp = CONG_PHAP.find(c => c.id === char.cong_phap);
  if (!cp) return;

  box.innerText = `${cp.name} (${cp.cap.toUpperCase()} – ${PHAM_CHAT[cp.pham].name})`;
}

/* =========================
   BATTLE UI
========================= */
function updateBattleUI(state) {
  const box = document.getElementById("battle");
  if (!box) return;

  if (!state) {
    box.style.display = "none";
    return;
  }

  box.style.display = "block";
  document.getElementById("enemyName").innerText = state.enemy.name;
  document.getElementById("enemyHp").innerText =
    `HP: ${Math.floor(state.enemy.hp)} / ${state.enemy.maxHp}`;
}

/* =========================
   INVENTORY UI
========================= */
function updateInventoryUI(char) {
  const box = document.getElementById("inventory");
  if (!box) return;

  box.innerHTML = "";
  char.inventory.forEach(id => {
    const item = TRANG_BI.find(i => i.id === id);
    if (!item) return;

    const btn = document.createElement("button");
    btn.className = `item ${item.rarity}`;
    btn.innerText = item.name;
    btn.onclick = () => InventorySystem.equipItem(id);
    box.appendChild(btn);
  });
}

/* =========================
   MAP UI
========================= */
function updateMapUI(map) {
  document.getElementById("mapName").innerText = map.name;
  document.getElementById("mapDesc").innerText = map.description;
}

/* =========================
   ANIMATION HOOK (TẠM)
========================= */
function playAnimation(animationKey) {
  log(`🎬 Hiệu ứng: ${animationKey}`);
}

/* =========================
   BREAKTHROUGH BUTTON
========================= */
function showBreakthroughButton() {
  const btn = document.getElementById("breakBtn");
  if (btn) btn.style.display = "block";
}

function hideBreakthroughButton() {
  const btn = document.getElementById("breakBtn");
  if (btn) btn.style.display = "none";
}

/* =========================
   GAME INIT
========================= */
function initGame() {
  currentCharacter = CharacterSystem.loadCharacter();

  if (!currentCharacter) {
    log("⚠️ Chưa có nhân vật. Hãy tạo nhân vật trước.");
    return;
  }

  log(`👤 Xin chào ${currentCharacter.name}`);
  updateUI(currentCharacter);

  CultivationSystem.applyOfflineProgress();
  CultivationSystem.start();
  hideBreakthroughButton();
}

/* =========================
   GLOBAL BUTTON HOOK
========================= */
window.startCultivation = () => {
  CultivationSystem.start();
  log("🧘 Bắt đầu tu luyện");
};

window.stopCultivation = () => {
  CultivationSystem.stop();
  log("⏸️ Dừng tu luyện");
};

window.breakthrough = () => {
  CultivationSystem.breakthrough();
  hideBreakthroughButton();
};

window.enterMap = id => MapSystem.enterMap(id);
window.exploreMap = id => MapSystem.explore(id);

window.useSkill = id => BattleSystem.useSkill(id);

/* =========================
   AUTO BOOT
========================= */
window.onload = initGame;
