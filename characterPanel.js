/* =====================================================
   CHARACTER PANEL (SAFE MODULE)
   - Render khi click
   - Có guard + try/catch
   - Lỗi không ảnh hưởng game
===================================================== */

function openCharacterPanel() {
  try {
    hideAllScreens();

    var panel = document.getElementById("character-panel");
    if (!panel) {
      alert("Không tìm thấy bảng nhân vật");
      showGame();
      return;
    }

    panel.classList.remove("hidden");
    renderCharacterPanel();
  } catch (e) {
    alert("Lỗi bảng nhân vật");
    showGame();
  }
}

function closeCharacterPanel() {
  showGame();
}

function renderCharacterPanel() {
  var box = document.getElementById("character-panel-content");
  if (!box) return;

  var c = loadChar();
  if (!c) {
    box.innerHTML = "Không có dữ liệu nhân vật";
    return;
  }

  var realmName = "Không rõ";
  if (typeof REALMS !== "undefined" && REALMS[c.realmIndex]) {
    realmName = REALMS[c.realmIndex].name;
  }

  var html = "";
  html += "<b>Tên:</b> " + c.name + "<br>";
  html += "<b>Giới tính:</b> " + c.gender + "<br>";
  html += "<b>Cảnh giới:</b> " + realmName + "<br>";
  html += "<b>Tầng:</b> " + c.stage + "<br>";
  html += "<b>Linh khí:</b> " + Math.floor(c.qi) + "<br>";
  html += "<hr>";

  if (c.root) {
    html += "<b>Linh căn:</b> " + c.root.name + "<br>";
    html += "<small>" + c.root.desc + "</small><br>";
  }

  html += "<hr>";
  html += "<b>Tiên thiên:</b><br>";

  if (c.talents && c.talents.length > 0) {
    for (var i = 0; i < c.talents.length; i++) {
      html +=
        "- " +
        c.talents[i].name +
        " (" +
        c.talents[i].grade +
        ")<br>";
    }
  } else {
    html += "Không có<br>";
  }

  box.innerHTML = html;
}
