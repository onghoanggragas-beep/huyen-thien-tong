/* =====================================================
   CHARACTER HEADER (TOP INFO BAR)
   - Hiển thị info nhân vật ở đầu game screen
   - Tự cập nhật mỗi 1s
   - An toàn, không phá core
===================================================== */

function renderCharacterHeader() {
  var box = document.getElementById("character-header");
  if (!box) return;

  var c = loadChar();
  if (!c) {
    box.innerHTML = "Không có dữ liệu nhân vật";
    return;
  }

  // Cảnh giới
  var realmName = "Không rõ";
  var maxQi = 100;

  if (typeof REALMS !== "undefined" && REALMS[c.realmIndex]) {
    realmName = REALMS[c.realmIndex].name;
    maxQi = REALMS[c.realmIndex].maxQi || 100;
  }

  // Linh căn
  var rootName = c.root ? c.root.name : "Không rõ";

  var html = "";
  html += "<h3>" + c.name + " (" + c.gender + ") – " + rootName + "</h3>";
  html += "<div>" + realmName + " – Tầng " + c.stage + "</div>";
  html +=
    "<div>Linh khí: " +
    c.qi.toFixed(1) +
    " / " +
    maxQi +
    "</div>";

  box.innerHTML = html;
}

/* ================= AUTO UPDATE ================= */

// Cập nhật mỗi 1 giây (đồng bộ với tu luyện)
setInterval(function () {
  renderCharacterHeader();
}, 1000);
