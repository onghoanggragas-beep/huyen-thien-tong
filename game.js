/* ===== ACCOUNT SYSTEM ===== */

function getAccounts(){
  return JSON.parse(localStorage.getItem("accounts") || "{}");
}

function saveAccounts(acc){
  localStorage.setItem("accounts", JSON.stringify(acc));
}

function login(){
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if(!user || !pass){
    alert("Vui lòng nhập tài khoản và mật khẩu");
    return;
  }

  let accounts = getAccounts();

  // ĐĂNG KÝ
  if(!accounts[user]){
    accounts[user] = {
      password: pass,
      character: null
    };
    saveAccounts(accounts);
  }
  // ĐĂNG NHẬP
  else{
    if(accounts[user].password !== pass){
      alert("Sai mật khẩu");
      return;
    }
  }

  localStorage.setItem("currentUser", user);

  document.getElementById("login").classList.add("hidden");

  if(accounts[user].character){
    localStorage.setItem("character", JSON.stringify(accounts[user].character));
    startGame();
  }else{
    document.getElementById("create").classList.remove("hidden");
  }
}

/* ===== GAME CORE ===== */

function loadChar(){
  return JSON.parse(localStorage.getItem("character"));
}

function saveChar(c){
  const user = localStorage.getItem("currentUser");
  let accounts = getAccounts();
  accounts[user].character = c;
  saveAccounts(accounts);
  localStorage.setItem("character", JSON.stringify(c));
}

function log(m){
  const l=document.getElementById("log");
  l.innerHTML+=`<div>${m}</div>`;
  l.scrollTop=l.scrollHeight;
}

function startGame(){
  document.getElementById("create").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  render();
}

function render(){
  const c=loadChar();
  const r=REALMS[c.realm];

  document.getElementById("charInfo").innerText =
    `${c.name} (${c.gender}) - ${c.root.typeName}`;

  document.getElementById("realmInfo").innerText =
    `${r.name} - Tầng ${c.stage}`;

  document.getElementById("qiInfo").innerText =
    `Linh khí: ${c.qi.toFixed(1)} / ${r.maxQi}`;

  document.getElementById("cultivationInfo").innerText =
    `Trạng thái: ${c.cultivating ? "Đang tu luyện" : "Dừng"}`;
}

/* ===== AUTO LOOP ===== */
setInterval(()=>{
  updateCultivation();
  render();
},1000);
