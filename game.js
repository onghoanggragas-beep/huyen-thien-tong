document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const rollBtn = document.getElementById("rollBtn");
  const confirmBtn = document.getElementById("confirmBtn");
  const cultivateBtn = document.getElementById("cultivateBtn");
  const breakBtn = document.getElementById("breakBtn");
  const inventoryBtn = document.getElementById("inventoryBtn");
  const backGameBtn = document.getElementById("backGameBtn");

  if (loginBtn) loginBtn.onclick = login;
  if (rollBtn) rollBtn.onclick = rollCharacter;
  if (confirmBtn) confirmBtn.onclick = confirmCharacter;
  if (cultivateBtn) cultivateBtn.onclick = toggleCultivation;
  if (breakBtn) breakBtn.onclick = breakThrough;
  if (inventoryBtn) inventoryBtn.onclick = openInventory;
  if (backGameBtn) backGameBtn.onclick = showGame;

  document.querySelectorAll("[data-gender]").forEach(btn => {
    btn.onclick = () => selectGender(btn.dataset.gender);
  });

  document.querySelectorAll("[data-map]").forEach(btn => {
    btn.onclick = () => goMap(btn.dataset.map);
  });

});

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
}

function showGame() {
  hideAllScreens();
  const g = document.getElementById("game-screen");
  if (g) g.classList.remove("hidden");
  renderCharacterInfo();
}

function showCreate() {
  hideAllScreens();
  const c = document.getElementById("create-screen");
  if (c) c.classList.remove("hidden");
}

function loadChar() {
  const c = localStorage.getItem("character");
  return c ? JSON.parse(c) : null;
}

function saveChar(c) {
  localStorage.setItem("character", JSON.stringify(c));
}

function renderCharacterInfo() {
  const el = document.getElementById("characterInfo");
  if (!el) return;

  const c = loadChar();
  if (!c) {
    el.innerHTML = "Chưa có nhân vật";
    return;
  }

  el.innerHTML = `
    <div><b>${c.name}</b> (${c.gender})</div>
    <div>Tu vi: ${REALMS[c.realmIndex].name} - Tầng ${c.stage}</div>
    <div>HP: ${c.stats.hp}</div>
    <div>ATK: ${c.stats.atk}</div>
    <div>DEF: ${c.stats.def}</div>
  `;
}
