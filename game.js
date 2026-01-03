/* ================= BASIC STORAGE ================= */

function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts") || "{}");
}

function saveAccounts(data) {
  localStorage.setItem("accounts", JSON.stringify(data));
}

/* ================= LOGIN ================= */

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Nhập tài khoản và mật khẩu");
    return;
  }

  let accounts = getAccounts();

  // Tạo mới nếu chưa có
  if (!accounts[user]) {
    accounts[user] = {
      password: pass,
      character: null
    };
    saveAccounts(accounts);
    console.log("Đăng ký:", user);
  } 
  // Đã tồn tại thì kiểm tra pass
  else if (accounts[user].password !== pass) {
    alert("Sai mật khẩu");
    console.log("Sai mật khẩu:", user);
    return;
  }

  // Set user hiện tại
  localStorage.setItem("currentUser", user);

  // QUY TẮC DUY NHẤT:
  // Có character -> vào game
  // Không có -> tạo nhân vật
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

/* ================= SCREEN CONTROL ================= */

function hideAll() {
  ["login","create","game","battle","inventory"].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function showCreate() {
  hideAll();
  document.getElementById("create").classList.remove("hidden");
}

function showGame() {
  hideAll();
  document.getElementById("game").classList.remove("hidden");
  render();
}

/* ================= CHARACTER ================= */

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

/* ================= GAME ================= */

function render() {
  const c = loadChar();
  if (!c) return;

  const r = REALMS[c.realm];

  document.getElementById("charInfo").innerText =
    `${c.name} (${c.gender}) - ${c.root.typeName}`;

  document.getElementById("realmInfo").innerText =
    `${r.name} - Tầng ${c.stage}`;

  document.getElementById("qiInfo").innerText =
    `Linh khí: ${c.qi.toFixed(1)} / ${r.maxQi}`;

  document.getElementById("cultivationInfo").innerText =
    `Trạng thái: ${c.cultivating ? "Đang tu luyện" : "Dừng"}`;
}

/* ================= LOOP ================= */

setInterval(() => {
  if (typeof updateCultivation === "function") {
    updateCultivation();
    render();
  }
}, 1000);
