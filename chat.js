const log = document.getElementById("log");
const input = document.getElementById("input");
const send = document.getElementById("send");
const cultivateBtn = document.getElementById("cultivateBtn");
const fightBtn = document.getElementById("fightBtn");
const battle = document.getElementById("battle");
const battleLog = document.getElementById("battleLog");

let playerId = "p_" + Math.random().toString(36).slice(2);

function addMsg(text, cls) {
  const d = document.createElement("div");
  d.className = cls;
  d.innerText = text;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function updateChar(d) {
  if (d.realm) realm.innerText = d.realm;
  if (d.exp !== undefined) exp.innerText = d.exp;
  if (d.hp !== undefined) hp.innerText = d.hp;
}

fetch("/enter").then(r=>r.json()).then(d=>addMsg(d.intro,"npc"));

send.onclick = async ()=>{
  if(!input.value) return;
  addMsg(input.value,"player");
  const r=await fetch("/talk",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({message:input.value})});
  const d=await r.json();
  addMsg(d.reply,"npc");
  input.value="";
};

cultivateBtn.onclick = async ()=>{
  const r=await fetch("/cultivate",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({playerId})});
  const d=await r.json();
  addMsg(d.msg,"npc");
  updateChar(d);
};

fightBtn.onclick = async ()=>{
  battle.style.display="block";
  const r=await fetch("/fight",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({playerId})});
  const d=await r.json();
  battleLog.innerText=d.msg;
  updateChar(d);
};
