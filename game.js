/* ================= CORE SCREEN ================= */

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
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

/* ================= LOGIN ================= */

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (!u || !p) {
    alert("Nhập tài khoản và mật khẩu");
    return;
  }

  const key = "acc_" + u;
  let acc = localStorage.getItem(key);

  if (!acc) {
    acc = {
      password: p,
      character: null
    };
    localStorage.setItem(key, JSON.stringify(acc));
  } else {
    acc = JSON.parse(acc);
    if (acc.password !== p) {
      alert("Sai mật khẩu");
      return;
    }
  }

  localStorage.setItem("currentUser", u);

  if (acc.character) {
    localStorage.setItem("character", JSON.stringify(acc.character));
    showGame();
  } else {
    showCreate();
  }
}

/* ================= CHARACTER STORAGE ================= */

function loadChar() {
  const raw = localStorage.getItem("character");
  return raw ? JSON.parse(raw) : null;
}

function saveChar(c) {
  const u = localStorage.getItem("currentUser");
  if (!u) return;

  const key = "acc_" + u;
  const acc = JSON.parse(localStorage.getItem(key));
  acc.character = c;

  localStorage.setItem(key, JSON.stringify(acc));
  localStorage.setItem("character", JSON.stringify(c));
}

/* ================= AUTO LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {
  const u = localStorage.getItem("currentUser");
  if (!u) {
    showLogin();
    return;
  }

  const acc = localStorage.getItem("acc_" + u);
  if (!acc) {
    showLogin();
    return;
  }

  const parsed = JSON.parse(acc);
  if (parsed.character) {
    localStorage.setItem("character", JSON.stringify(parsed.character));
    showGame();
  } else {
    showCreate();
  }
});
