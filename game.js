function login(){
  const u = username.value.trim();
  const p = password.value.trim();
  if(!u || !p) return alert("Nhập tài khoản");

  let acc = JSON.parse(localStorage.getItem("acc_"+u));
  if(!acc){
    acc = { password:p, character:null };
    localStorage.setItem("acc_"+u, JSON.stringify(acc));
  }
  if(acc.password!==p) return alert("Sai mật khẩu");

  localStorage.setItem("currentUser", u);

  if(acc.character){
    localStorage.setItem("character", JSON.stringify(acc.character));
    showGame();
  } else {
    showCreate();
  }
}

function hideAll(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
}
function showCreate(){ hideAll(); create-screen.classList.remove("hidden"); }
function showGame(){ hideAll(); game-screen.classList.remove("hidden"); render(); }

function loadChar(){ return JSON.parse(localStorage.getItem("character")); }
function saveChar(c){
  const u=localStorage.getItem("currentUser");
  const acc=JSON.parse(localStorage.getItem("acc_"+u));
  acc.character=c;
  localStorage.setItem("acc_"+u,JSON.stringify(acc));
  localStorage.setItem("character",JSON.stringify(c));
}

function render(){
  renderCharacterInfo();
}

function log(msg){
  log.innerHTML+=`<div>${msg}</div>`;
}
