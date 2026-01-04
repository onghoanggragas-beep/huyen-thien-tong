/* =====================================================
   UI ACCORDION MENU
===================================================== */

function toggleMenu(id) {
  var menus = document.querySelectorAll(".menu-content");

  for (var i = 0; i < menus.length; i++) {
    if (menus[i].id !== id) {
      menus[i].classList.add("hidden");
    }
  }

  var target = document.getElementById(id);
  if (!target) return;

  target.classList.toggle("hidden");
}
function openMapPanel() {
  document.getElementById("map-panel").classList.remove("hidden");
}
let selectedMapId = null;

function confirmEnterMap(mapId) {
  const map = MAPS[mapId];
  if (!map) return;

  selectedMapId = mapId;

  document.getElementById("map-name").innerText = "🗺 " + map.name;
  document.getElementById("map-desc").innerText = map.desc;
  document.getElementById("map-danger").innerText = map.danger;

  document.getElementById("enter-map-btn").onclick = function () {
    closeModal();
    goMap(selectedMapId);
  };

  document
    .getElementById("map-confirm-panel")
    .classList.remove("hidden");
}
function openMethodPanel() {
  document.getElementById("method-panel").classList.remove("hidden");
}
function closeModal() {
  const ids = [
    "map-panel",
    "method-panel",
    "map-confirm-panel"
  ];

  ids.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}
