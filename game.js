function loadChar(){ return JSON.parse(localStorage.getItem("character")); }
function saveChar(c){ localStorage.setItem("character",JSON.stringify(c)); }

function log(m){
const l=document.getElementById("log");
l.innerHTML+=`<div>${m}</div>`;
l.scrollTop=l.scrollHeight;
}

function login(){
document.getElementById("login").classList.add("hidden");
loadChar()?startGame():document.getElementById("create").classList.remove("hidden");
}

function startGame(){
document.getElementById("create").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");
render();
}

function render(){
const c=loadChar();
const r=REALMS[c.realm];
document.getElementById("charInfo").innerText=
`${c.name} (${c.gender}) - ${c.root.typeName}`;
document.getElementById("realmInfo").innerText=
`${r.name} Tầng ${c.stage}`;
document.getElementById("qiInfo").innerText=
`Linh khí: ${c.qi.toFixed(1)} / ${r.maxQi}`;
document.getElementById("cultivationInfo").innerText=
`Trạng thái: ${c.cultivating?"Đang tu luyện":"Dừng"}`;
}

setInterval(()=>{
updateCultivation();
render();
},1000);
