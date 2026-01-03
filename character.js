/* =================================================
   CREATE CHARACTER – FIX REROLL
================================================= */

let selectedGender = null;
let rolledData = null;

/* ===== CHỌN GIỚI TÍNH ===== */
function selectGender(gender) {
  selectedGender = gender;
}

/* ===== ROLL LINH CĂN + TIÊN THIÊN ===== */
function rollCharacter() {
  const root = rollSpiritRoot();

  let talents = [];
  while (talents.length < 6) {
    const t = TALENTS[Math.floor(Math.random() * TALENTS.length)];
    if (!talents.includes(t)) talents.push(t);
  }

  rolledData = {
    root,
    talents
  };

  renderRollResult();
}

/* ===== HIỂN THỊ KẾT QUẢ ROLL ===== */
function renderRollResult() {
  const box = document.getElementById("roll-result");

  if (!rolledData) {
    box.innerHTML = "<p>Chưa roll linh căn & tiên thiên</p>";
    return;
  }

  box.innerHTML = `
    <h3>🌿 Linh căn</h3>
    <p><b>${rolledData.root.typeName}</b></p>
    <p>Thuộc tính: ${rolledData.root.elements.join(", ")}</p>
    <p style="font-size:13px;opacity:0.8">
      ${rolledData.root.desc}
    </p>

    <h3>✨ Tiên thiên (chọn 3 / 6)</h3>
    ${rolledData.talents.map((t, i) => `
      <div style="font-size:14px">
        ${i + 1}. ${t.name} (${t.grade})
      </div>
    `).join("")}
  `;
}

/* ===== XÁC NHẬN TẠO NHÂN VẬT ===== */
function confirmCharacter() {
  const name = document.getElementById("char-name").value.trim();

  if (!name) {
    alert("Vui lòng nhập tên nhân vật");
    return;
  }

  if (!selectedGender) {
    alert("Vui lòng chọn giới tính");
    return;
  }

  if (!rolledData) {
    alert("Vui lòng roll linh căn & tiên thiên trước");
    return;
  }

  // LẤY 3 TIÊN THIÊN ĐẦU (sau này sẽ cho chọn)
  const chosenTalents = rolledData.talents.slice(0, 3);

  const character = {
    name,
    gender: selectedGender,
    root: rolledData.root,
    talents: chosenTalents,

    realmIndex: 0,
    stage: 1,
    qi: 0,

    cultivating: false,
    lastUpdate: Date.now()
  };

  saveChar(character);
  showGame();
}
