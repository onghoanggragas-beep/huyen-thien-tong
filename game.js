/* ========== RESET & STORAGE ========== */

function resetAll() {
  localStorage.clear();
  location.reload();
}

function getAccount(user) {
  return JSON.parse(localStorage.getItem("acc_" + user));
}

function saveAccount(user, data) {
  localStorage.setItem("acc_" + user, JSON.stringify(data));
}

/* ========== LOGIN (KHÔNG THỂ FAIL) ========== */

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user) {
    alert("Nhập tài khoản");
    return;
  }

  let acc = getAccount(user);

  // Nếu chưa tồn tại → tạo mới
  if (!acc) {
    acc = {
      password: pass || "",
      character: null
    };
    saveAccount(user, acc);
  }

  // Nếu tồn tại nhưng pass khác → cho vào luôn (DEV MODE)
  localStorage.setItem("currentUser", user);

  if (acc.character) {
    localStorage.setItem("character", JSON.stringify(acc.character));
    showGame();
  } else {
    showCreate();
  }
}

/* ========== SCREEN ========== */

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

/* ========== CHARACTER ========== */

function loadChar() {
  return JSON.parse(localStorage.getItem("character"));
}

function saveChar(char) {
  const user = localStorage.getItem("currentUser");
  const acc = getAccount(user);
  acc.character = char;
  saveAccount(user, acc);
  localStorage.setItem("character", JSON.stringify(char));
}

/* ========== GAME ========== */

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

/* ========== LOOP ========== */

setInterval(()=>{
  if (typeof updateCultivation === "function") {
    updateCultivation();
    render();
  }
},1000);
