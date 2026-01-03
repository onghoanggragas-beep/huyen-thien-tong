let selectedGender = null;
let rolledRoot = null;
let rolledTalents = [];
let selectedTalents = [];

function selectGender(g) {
  selectedGender = g;
}

function rollCharacter() {
  rolledRoot = rollSpiritRoot();

  // roll 5 tiên thiên
  rolledTalents = [...TALENTS]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  selectedTalents = [];

  renderRoll();
}

function toggleTalent(id) {
  const t = rolledTalents.find(x => x.id === id);
  if (!t) return;

  if (selectedTalents.includes(t)) {
    selectedTalents = selectedTalents.filter(x => x !== t);
  } else {
    if (selectedTalents.length >= 3) {
      alert("Chỉ được chọn 3 tiên thiên");
      return;
    }
    selectedTalents.push(t);
  }

  renderRoll();
}

function renderRoll() {
  const el = document.getElementById("roll-result");
  if (!el) return;

  el.innerHTML = `
    <div><b>🌿 Linh căn:</b> ${rolledRoot.typeName}</div>
    <hr>
    <div><b>✨ Tiên thiên (chọn 3):</b></div>
    ${rolledTalents.map(t => `
      <div 
        onclick="toggleTalent(${t.id})"
        style="
          padding:6px;
          margin:4px 0;
          border-radius:6px;
          background:${selectedTalents.includes(t) ? '#ffd36b' : '#333'};
          color:#000;
        ">
        ${t.name} (${t.grade})<br>
        <small>${t.desc}</small>
      </div>
    `).join("")}
  `;
}

function confirmCharacter() {
  const name = document.getElementById("char-name").value.trim();
  if (!name || !selectedGender || !rolledRoot) {
    alert("Thiếu thông tin");
    return;
  }

  if (selectedTalents.length !== 3) {
    alert("Phải chọn đúng 3 tiên thiên");
    return;
  }

  const c = {
    name,
    gender: selectedGender,
    age: 16,
    lifespan: 120,

    realmIndex: 0,
    stage: 1,
    qi: 0,

    root: rolledRoot,
    talents: selectedTalents,

    stats: { hp: 100, atk: 10, def: 5 },
    cultivating: false
  };

  recalcStats(c);
  saveChar(c);
  showGame();
  }
