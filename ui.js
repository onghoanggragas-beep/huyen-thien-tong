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
  alert("🗺 Bản đồ\n\n• Linh Sơn\n• Hỏa Vực\n• Băng Nguyên");
}

function openMethodPanel() {
  alert("📘 Công pháp\n\n• Ngũ Hành Dẫn Khí Quyết\n• Kim Linh Quyết\n• Mộc Linh Trường Sinh Công");
}
