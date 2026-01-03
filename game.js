/* =================================================
   ACCOUNT + STORAGE (ĐƠN GIẢN – ỔN ĐỊNH)
================================================= */

function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts") || "{}");
}

function saveAccounts(acc) {
  localStorage.setItem("accounts", JSON.stringify(acc));
}

/* =================================================
   LOGIN
================================================= */

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Vui lòng nhập tài khoản và mật khẩu");
    return;
  }

  let accounts = getAccounts();

  // Đăng ký nếu chưa tồn tại
  if (!accounts[user]) {
    accounts[user] = {
      password: pass,
      character: null
    };
    saveAccounts(accounts);
  }
  // Đăng nhập
  else if (accounts[user].password !== pass) {
    alert("Sai mật khẩu");
    return;
  }

  localStorage.setItem("currentUser", user);

  // Điều hướng màn hình
  if (accounts[user].character) {
    localStorage.setItem(
      "character",
      JSON.stringify(accounts[user].character)
    );
    showGame();
  } else {
    showCreate();
  }
}

/* =================================================
   SCREEN CONTROL (ĐÚNG ID HTML)
================================================= */

function hideAllScreens() {
  [
    "login-screen",
    "create-screen",
    "game-screen"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function showCreate() {
  hideAllScreens();
  document
    .getElementById("create-screen")
    .classList.remove("hidden");
}

function showGame() {
  hideAllScreens();
  document
    .getElementById("game-screen")
    .classList.remove("hidden");
  render();
}

/* =================================================
   CHARACTER STORAGE
================================================= */

function loadChar() {
  return JSON.parse(localStorage.getItem("character"));
}

function saveChar(char) {
  const user = localStorage.getItem("currentUser");
  let accounts = getAccounts();

  accounts[user].character = char;
  saveAccounts(accounts);

  localStorage.setItem("character", JSON.stringify(char));
}

/* =================================================
   GAME RENDER
================================================= */

function render() {
  const c = loadChar();
  if (!c) return;

  const realm = REALMS[c.realmIndex];

  document.getElementById("charInfo").innerText =
    `${c.name} (${c.gender}) - ${c.root.typeName}`;

  document.getElementById("realmInfo").innerText =
    `${realm.name} - Tầng ${c.stage}`;

  document.getElementById("qiInfo").innerText =
    `Linh khí: ${c.qi.toFixed(1)} / ${realm.maxQi}`;
}

/* =================================================
   AUTO LOOP (TU LUYỆN TREO)
================================================= */

setInterval(() => {
  if (typeof updateCultivation === "function") {
    updateCultivation();
    render();
  }
}, 1000);
