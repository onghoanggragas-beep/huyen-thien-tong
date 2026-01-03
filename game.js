/* =========================
   AUTH & STORAGE
========================= */
function hash(s){return btoa(unescape(encodeURIComponent(s)))}
function loadUsers(){return JSON.parse(localStorage.getItem("users")||"{}")}
function saveUsers(u){localStorage.setItem("users",JSON.stringify(u))}

let currentUser=null;
let player=null;
let selectedGender=null;

/* =========================
   DOM
========================= */
const loginBox=document.getElementById("login");
const createBox=document.getElementById("create");
const gameBox=document.getElementById("game");
const scene=document.getElementById("scene");
const log=document.getElementById("log");
const qiEl=document.getElementById("qi");
const maxQiEl=document.getElementById("maxQi");
const realmEl=document.getElementById("realm");
const lingCanEl=document.getElementById("lingCan");
const rollInfo=document.getElementById("rollInfo");

const battleField=document.getElementById("battleField");
const pHpBar=document.getElementById("pHp");
const eHpBar=document.getElementById("eHp");
const playerUnit=document.querySelector(".player");
const enemyUnit=document.querySelector(".enemy");

const alchemyPanel=document.getElementById("alchemyPanel");
const forgePanel=document.getElementById("forgePanel");
const alchemyBar=document.getElementById("alchemyBar");
const forgeBar=document.getElementById("forgeBar");

/* =========================
   LOGIN
========================= */
function login(){
  const u=user.value.trim();
  const p=pass.value;
  if(!u||!p) return alert("Thiếu thông tin");
  const users=loadUsers();
  if(!users[u]){
    users[u]={pass:hash(p),data:null};
  }
  if(users[u].pass!==hash(p)) return alert("Sai mật khẩu");
  currentUser=u;
  saveUsers(users);

  if(users[u].data){
    player=users[u].data;
    startGame(true);
  }else{
    loginBox.classList.add("hidden");
    createBox.classList.remove("hidden");
  }
}

/* =========================
   CREATE CHARACTER
========================= */
function selectGender(g){
  selectedGender=g;
  rollInfo.innerText="Đã chọn giới tính: "+g;
}

function rollAll(){
  const linhCan=LINH_CAN_TYPES[Math.floor(Math.random()*LINH_CAN_TYPES.length)];
  const tienThien=[];
  while(tienThien.length<3){
    const t=TIEN_THIEN_LIST[Math.floor(Math.random()*TIEN_THIEN_LIST.length)];
    if(!tienThien.includes(t)) tienThien.push(t);
  }

  player={
    gender:selectedGender,
    realm:1,
    qi:0,
    maxQi:100,
    hp:200,
    atk:20,
    linhCan,
    tienThien,
    stage:1,
    inventory:[],
    equipment:{},
    lastOnline:Date.now()
  };

  rollInfo.innerText=
    `${linhCan.name}\nTiên thiên: `+
    tienThien.map(t=>`${t.name}(${t.tier})`).join(", ");
}

function confirmChar(){
  if(!player||!selectedGender) return alert("Chưa hoàn tất");
  const users=loadUsers();
  users[currentUser].data=player;
  saveUsers(users);
  startGame(false);
}

/* =========================
   START GAME
========================= */
function startGame(fromLoad){
  loginBox.classList.add("hidden");
  createBox.classList.add("hidden");
  gameBox.classList.remove("hidden");

  if(fromLoad) calcOffline();
  addLog("🌱 Bắt đầu hành trình tu tiên");
  updateUI();
}

/* =========================
   OFFLINE PROGRESS
========================= */
function calcOffline(){
  const now=Date.now();
  const sec=(now-player.lastOnline)/1000;
  let mult=player.linhCan.speed;
  player.tienThien.forEach(t=>mult*=t.mult);

  const gain=sec*mult;
  player.qi=Math.min(player.maxQi,player.qi+gain);

  addLog(`⏳ Offline ${Math.floor(sec)}s, nhận ${gain.toFixed(1)} linh khí`);
}

/* =========================
   SCENE SWITCH
========================= */
function switchScene(type){
  scene.className="";
  battleField.classList.add("hidden");
  alchemyPanel.classList.add("hidden");
  forgePanel.classList.add("hidden");

  if(type==="cultivation"){
    scene.classList.add("cultivation");
    scene.innerText="🧘 Đang tu luyện...";
  }
  if(type==="secret"){
    addLog("🕳️ Khám phá bí cảnh...");
    if(Math.random()<0.3){
      const drop=randomEquip();
      player.inventory.push(drop);
      addLog(`✨ Nhặt được ${drop.type} (${drop.quality})`);
    }else addLog("⚠️ Không có thu hoạch");
  }
  if(type==="home"){
    addLog("🏠 Ở động phủ, tu vi ổn định");
  }
  if(type==="alchemy"){
    alchemyPanel.classList.remove("hidden");
    startProgress(alchemyBar,()=>{
      addLog("⚗️ Luyện đan thành công");
    });
  }
  if(type==="forge"){
    forgePanel.classList.remove("hidden");
    startProgress(forgeBar,()=>{
      const eq=randomEquip();
      player.inventory.push(eq);
      addLog(`🔨 Luyện được ${eq.type} (${eq.quality})`);
    });
  }
}

/* =========================
   AUTO BATTLE
========================= */
let enemyHP=0;
let battleTimer=null;

function startBattle(){
  switchScene("battle");
  battleField.classList.remove("hidden");

  const stage=STAGES[player.stage-1]||STAGES[STAGES.length-1];
  enemyHP=stage.enemyHP;
  updateBattleUI();

  addLog(`⚔️ Stage ${player.stage}${stage.boss?" (BOSS)":""}`);

  if(battleTimer) clearInterval(battleTimer);
  battleTimer=setInterval(battleTurn,1200);
}

function battleTurn(){
  // Player attack
  playerUnit.classList.add("attack");
  setTimeout(()=>playerUnit.classList.remove("attack"),300);

  const skill=VO_KY_LIST[Math.floor(Math.random()*VO_KY_LIST.length)];
  const dmg=player.atk+skill.dmg;
  enemyHP-=dmg;

  enemyUnit.classList.add("hit");
  setTimeout(()=>enemyUnit.classList.remove("hit"),300);

  addLog(`⚔️ ${skill.name} gây ${dmg} sát thương`);

  if(enemyHP<=0){
    enemyHP=0;
    clearInterval(battleTimer);
    addLog("🎉 Thắng lợi!");

    if(Math.random()<DROP_TABLE.voKy){
      const vk=VO_KY_LIST[Math.floor(Math.random()*VO_KY_LIST.length)];
      player.inventory.push(vk);
      addLog("📜 Nhận võ kỹ mới");
    }
    if(Math.random()<DROP_TABLE.equip){
      const eq=randomEquip();
      player.inventory.push(eq);
      addLog(`🛡️ Nhận trang bị (${eq.quality})`);
    }

    player.stage++;
  }

  updateBattleUI();
}

/* =========================
   EQUIP
========================= */
function randomEquip(){
  return JSON.parse(JSON.stringify(
    EQUIPMENT_LIST[Math.floor(Math.random()*EQUIPMENT_LIST.length)]
  ));
}

/* =========================
   PROGRESS BAR
========================= */
function startProgress(bar,cb){
  let p=0;
  bar.style.width="0%";
  const t=setInterval(()=>{
    p+=10;
    bar.style.width=p+"%";
    if(p>=100){
      clearInterval(t);
      cb();
    }
  },300);
}

/* =========================
   AUTO TU LUYỆN + SAVE
========================= */
setInterval(()=>{
  if(!player) return;
  let mult=player.linhCan.speed;
  player.tienThien.forEach(t=>mult*=t.mult);
  player.qi=Math.min(player.maxQi,player.qi+mult);
  player.lastOnline=Date.now();

  const users=loadUsers();
  users[currentUser].data=player;
  saveUsers(users);

  updateUI();
},1000);

/* =========================
   UI
========================= */
function updateUI(){
  qiEl.innerText=player.qi.toFixed(1);
  maxQiEl.innerText=player.maxQi;
  realmEl.innerText="Luyện Khí "+player.realm;
  lingCanEl.innerText=player.linhCan.name;
}

function updateBattleUI(){
  pHpBar.style.width="100%";
  eHpBar.style.width=Math.max(enemyHP,0)/(
    STAGES[player.stage-1]?.enemyHP||100
  )*100+"%";
}

function addLog(m){
  const d=document.createElement("div");
  d.innerText=m;
  log.appendChild(d);
  log.scrollTop=99999;
}
