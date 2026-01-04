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
let selectedMapId = null;
let isMapConfirmOpen = false;

function confirmEnterMap(mapId) {
  if (isMapConfirmOpen) return; // CHỐNG TỰ NỔI

  const map = MAPS[mapId];
  if (!map) return;

  isMapConfirmOpen = true;
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

  document
    .getElementById("map-confirm-panel")
    .classList.remove("hidden");
}
function openMethodPanel() {
  document.getElementById("method-panel").classList.remove("hidden");
}
function closeModal() {
  isMapConfirmOpen = false;

  ["map-panel", "method-panel", "map-confirm-panel"].forEach(
    function (id) {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    }
  );
}
  ];

  ids.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}
