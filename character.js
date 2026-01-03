let selectedGender = null;
let rolledData = null;

function selectGender(g) {
  selectedGender = g;
}

/* ===== TEST: BẤM ROLL PHẢI HIỆN ALERT ===== */
function rollCharacter() {
  alert("ROLL ĐÃ ĐƯỢC GỌI"); // ← nếu KHÔNG hiện → JS chưa load

  const root = rollSpiritRoot();

  let talents = [];
  while (talents.length < 6) {
    const t = TALENTS[Math.floor(Math.random() * TALENTS.length)];
    if (!talents.includes(t)) talents.push(t);
  }

  rolledData = { root, talents };

  document.getElementById("roll-result").innerHTML = `
    <h3>🌿 Linh căn</h3>
    <p><b>${root.typeName}</b></p>
    <p>${root.elements.join(", ")}</p>

    <h3>✨ Tiên thiên</h3>
    ${talents.map(t => `<div>${t.name} (${t.grade})</div>`).join("")}
  `;
}

function confirmCharacter() {
  if (!rolledData) {
    alert("CHƯA ROLL");
    return;
  }

  const name = document.getElementById("char-name").value.trim();
  if (!name || !selectedGender) {
    alert("Thiếu tên hoặc giới tính");
    return;
  }

  const character = {
    name,
    gender: selectedGender,
    root: rolledData.root,
    talents: rolledData.talents.slice(0, 3),
    realmIndex: 0,
    stage: 1,
    qi: 0,
    cultivating: false,
    lastUpdate: Date.now()
  };

  saveChar(character);
  showGame();
}
