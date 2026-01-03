/* =====================================================
   GAME CORE
   - Login / Register
   - Screen control
   - Character storage
   (BẢN ỔN ĐỊNH – KHÔNG RÚT GỌN)
===================================================== */

/* ================= SCREEN CONTROL ================= */

function hideAllScreens() {
  const screens = document.querySelectorAll(".screen");
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.add("hidden");
  }
}

function showLogin() {
  hideAllScreens();
  document.getElementById("login-screen").classList.remove("hidden");
}

function showCreate() {
  hideAllScreens();
  document.getElementById("create-screen").classList.remove("hidden");
}

function showGame() {
  hideAllScreens();
  document.getElementById("game-screen").classList.remove("hidden");
}

function showBattle() {
  hideAllScreens();
  document.getElementById("battle-screen").classList.remove("hidden");
}

function showInventory() {
  hideAllScreens();
  document.getElementById("inventory-screen").classList.remove("hidden");
}

/* ================= LOGIN / REGISTER ================= */

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (!u || !p) {
    alert("Vui lòng nhập tài khoản và mật khẩu");
    return;
  }

  const key = "acc_" + u;
  let accData = localStorage.getItem(key);

  // CHƯA CÓ TÀI KHOẢN → TẠO MỚI
  if (!accData) {
    accData = {
      username: u,
      password: p,
      character: null
    };
    localStorage.setItem(key, JSON.stringify(accData));
  } else {
    accData = JSON.parse(accData);
    if (accData.password !== p) {
      alert("Sai mật khẩu");
      return;
    }
  }

  // LƯU USER HIỆN TẠI
  localStorage.setItem("currentUser", u);

  // CÓ NHÂN VẬT → VÀO GAME | CHƯA → TẠO NHÂN VẬT
  if (accData.character) {
    localStorage.setItem(
      "character",
      JSON.stringify(accData.character)
    );
    showGame();
  } else {
    showCreate();
  }
}

/* ================= CHARACTER STORAGE ================= */

function loadChar() {
  const raw = localStorage.getItem("character");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveChar(character) {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const key = "acc_" + currentUser;
  const accData = JSON.parse(localStorage.getItem(key));

  accData.character = character;

  localStorage.setItem(key, JSON.stringify(accData));
  localStorage.setItem(
    "character",
    JSON.stringify(character)
  );
}

/* ================= AUTO LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    showLogin();
    return;
  }

  const accDataRaw = localStorage.getItem("acc_" + currentUser);
  if (!accDataRaw) {
    showLogin();
    return;
  }

  const accData = JSON.parse(accDataRaw);

  if (accData.character) {
    localStorage.setItem(
      "character",
      JSON.stringify(accData.character)
    );
    showGame();
  } else {
    showCreate();
  }
});
