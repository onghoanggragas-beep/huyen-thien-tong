/* =================================================
   CREATE CHARACTER – FINAL VERSION
================================================= */

let selectedGender = null;
let rolledData = null;
let selectedTalents = [];

/* ===== CHỌN GIỚI TÍNH ===== */
function selectGender(gender) {
  selectedGender = gender;
}

/* ===== ROLL LINH CĂN + 6 TIÊN THIÊN ===== */
function rollCharacter() {
  const root = rollSpiritRoot();

  let talents = [];
  while (talents.length < 6) {
    const t = TALENTS[Math.floor(Math.random() * TALENTS.length)];
    if (!talents.includes(t)) talents.push(t);
  }

  rolledData = { root, talents };
  selectedTalents = [];

  renderRollResult();
}

/* ===== CLICK CHỌN / BỎ CHỌN TIÊN THIÊN ===== */
function toggleTalent(index) {
  const talent = rolledData.talents[index];
  const idx = selectedTalents.indexOf(talent);

  if (idx !== -1) {
    selectedTalents.splice(idx, 1);
  } else {
    if (selectedTalents.length >= 3) {
      alert("Chỉ được chọn tối đa 3 tiên thiên");
      return;
    }
    selectedTalents.push(talent);
  }

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

    <h3>✨ Tiên thiên (chọn ${selectedTalents.length}/3)</h3>
    ${rolledData.talents.map((t, i) => {
      const selected = selectedTalents.includes(t);
      return `
        <div
          onclick="toggleTalent(${i})"
          style="
            padding:6px;
            margin:4px 0;
            border-radius:6px;
            cursor:pointer;
            background:${selected ? '#ffd36b' : 'rgba(255,255,255,0.1)'};
            color:${selected ? '#000' : '#fff'};
          "
        >
          ${t.name} (${t.grade})
        </div>
      `;
    }).join("")}
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
    alert("Vui lòng roll linh căn & tiên thiên");
    return;
  }

  if (selectedTalents.length !== 3) {
    alert("Phải chọn đúng 3 tiên thiên");
    return;
  }

  const character = {
    name,
    gender: selectedGender,
    root: rolledData.root,
    talents: selectedTalents,

    realmIndex: 0,
    stage: 1,
    qi: 0,

    cultivating: false,
    lastUpdate: Date.now()
  };

  saveChar(character);
  showGame();
                                                   }
