/* =====================================================
   CHARACTER CREATION
   - Select gender
   - Roll spirit root
   - Roll talents
   - Confirm character
   (BẢN ĐÃ CHẠY ỔN – KHÔNG RÚT GỌN)
===================================================== */

/* ================= STATE ================= */

var selectedGender = null;
var rolledRoot = null;
var rolledTalents = [];

/* ================= SELECT ================= */

function selectGender(gender) {
  selectedGender = gender;
}

/* ================= ROLL ================= */

function rollCharacter() {
  // Roll linh căn
  rolledRoot = randomOne(SPIRIT_ROOTS);

  // Roll 3 tiên thiên (bản cũ: tự động chọn, KHÔNG click chọn)
  rolledTalents = randomMany(TALENTS, 3);

  // Render kết quả
  var resultBox = document.getElementById("roll-result");
  if (!resultBox) return;

  var html = "";
  html += "<b>🌿 Linh căn:</b><br>";
  html += rolledRoot.name + "<br>";
  html += "<small>" + rolledRoot.desc + "</small>";
  html += "<hr>";
  html += "<b>✨ Tiên thiên:</b><br>";

  for (var i = 0; i < rolledTalents.length; i++) {
    html +=
      "<div>" +
      rolledTalents[i].name +
      " (" +
      rolledTalents[i].grade +
      ")" +
      "</div>";
  }

  resultBox.innerHTML = html;
}

/* ================= CONFIRM ================= */

function confirmCharacter() {
  var nameInput = document.getElementById("char-name");
  if (!nameInput) return;

  var name = nameInput.value.trim();

  if (!name) {
    alert("Vui lòng nhập tên nhân vật");
    return;
  }

  if (!selectedGender) {
    alert("Vui lòng chọn giới tính");
    return;
  }

  if (!rolledRoot || rolledTalents.length === 0) {
    alert("Vui lòng roll linh căn và tiên thiên");
    return;
  }

  // Tạo nhân vật (BẢN CŨ – ĐƠN GIẢN)
  var character = {
    name: name,
    gender: selectedGender,

    realmIndex: 0,
    stage: 1,
    qi: 0,

    root: rolledRoot,
    talents: rolledTalents,

    cultivating: false
  };

  // Lưu nhân vật
  saveChar(character);

  // Vào game
  showGame();
      }
