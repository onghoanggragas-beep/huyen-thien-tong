let selectedGender = null;
let rolledRoot = null;

function selectGender(g) {
  selectedGender = g;
}

function rollCharacter() {
  rolledRoot = rollSpiritRoot();
  const el = document.getElementById("roll-result");
  if (el) el.innerText = rolledRoot.typeName;
}

function confirmCharacter() {
  const name = document.getElementById("char-name").value.trim();
  if (!name || !selectedGender || !rolledRoot) {
    alert("Thiếu thông tin");
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
    stats: { hp: 100, atk: 10, def: 5 },
    cultivating: false
  };

  recalcStats(c);
  saveChar(c);
  showGame();
}
