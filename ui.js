/* =====================================================
   UI.JS – QUẢN LÝ PANEL & MODAL (BẢN FIX ỔN ĐỊNH)
   KHÔNG auto mở panel
   KHÔNG gọi trong render / interval
===================================================== */

let selectedMapId = null;
let isMapConfirmOpen = false;

/* ===================== MAP ===================== */

function openMapPanel() {
  closeModal();
  document.getElementById("map-panel").classList.remove("hidden");
}

function confirmEnterMap(mapId) {
  if (isMapConfirmOpen) return;

  const map = MAPS[mapId];
  if (!map) return;

  isMapConfirmOpen = true;
  selectedMapId = mapId;

  document.getElementById("map-name").innerText = map.name;
  document.getElementById("map-desc").innerText = map.desc;
  document.getElementById("map-danger").innerText = map.danger;

  const enterBtn = document.getElementById("enter-map-btn");
  enterBtn.onclick = function () {
    closeModal();
    goMap(selectedMapId);
  };

  document
    .getElementById("map-confirm-panel")
    .classList.remove("hidden");
}

/* ===================== CÔNG PHÁP ===================== */

function openMethodPanel() {
  closeModal();
  document.getElementById("method-panel").classList.remove("hidden");
}

function learnMethod(methodId) {
  const method = METHODS.find(m => m.id === methodId);
  if (!method) return;

  player.method = method;
  saveGame();

  alert("📘 Đã học công pháp: " + method.name);
  closeModal();
}

/* ===================== ĐÓNG PANEL ===================== */

function closeModal() {
  isMapConfirmOpen = false;

  const panels = [
    "map-panel",
    "method-panel",
    "map-confirm-panel"
  ];

  panels.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

/* ===================== KHO ĐỒ ===================== */

function openInventory() {
  closeModal();
  showInventory();
}

/* ===================== ĐĂNG XUẤT ===================== */

function logout() {
  if (!confirm("Bạn chắc chắn muốn đăng xuất?")) return;
  localStorage.removeItem("currentUser");
  location.reload();
                      }
