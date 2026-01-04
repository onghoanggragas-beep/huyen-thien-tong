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

function openMethodPanel() {
  document.getElementById("method-panel").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("map-panel").classList.add("hidden");
  document.getElementById("method-panel").classList.add("hidden");
}
