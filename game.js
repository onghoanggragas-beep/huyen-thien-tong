/* ================= ACCOUNT SYSTEM ================= */

function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts") || "{}");
}

function saveAccounts(acc) {
  localStorage.setItem("accounts", JSON.stringify(acc));
}

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Vui lòng nhập tài khoản và mật khẩu");
    return;
  }

  let accounts = getAccounts();

  // ĐĂNG KÝ
  if (!accounts[user]) {
    accounts[user] = {
      password: pass,
      character: null
    };
    saveAccounts(accounts);
  }
  // ĐĂNG NHẬP
  else {
    if (accounts[user].password !== pass) {
      alert("Sai mật khẩu");
      return;
    }
  }

  // set user hiện tại
  localStorage.setItem("currentUser", user);

  // ẨN LOGIN
  document.getElementById("login").classList.add("hidden");
  document.getElementById("create").classList.add("hidden");
  document.getElementById("game").classList.add("hidden");

  // CHƯA CÓ NHÂN VẬT → TẠO
  if (!accounts[user].character) {
    document.getElementById("create").classList.remove("hidden");
    return;
  }

  // ĐÃ CÓ NHÂN VẬT → VÀO GAME
  localStorage.setItem(
    "character",
    JSON.stringify(accounts[user].character)
  );
  startGame();
    }

/* ================= CHARACTER STORAGE ================= */

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

/* ================= GAME CORE ================= */

function startGame() {
  document.getElementById("create").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  render();
}

function log(msg) {
  const el = document.getElementById("log");
  el.innerHTML += `<div>${msg}</div>`;
  el.scrollTop = el.scrollHeight;
}

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
