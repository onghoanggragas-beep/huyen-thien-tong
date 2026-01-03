/* ===== BASE64 IMAGE (AI STYLE PLACEHOLDER) ===== */
const CULT_BG =
"linear-gradient(180deg,#020617,#020617)";
const BATTLE_BG =
"linear-gradient(180deg,#020617,#020617)";

/* ===== DOM ===== */
const scene=document.getElementById("scene");
const log=document.getElementById("log");
const qiEl=document.getElementById("qi");
const maxQiEl=document.getElementById("maxQi");
const realmEl=document.getElementById("realm");
const lingCanEl=document.getElementById("lingCan");
const gongFaEl=document.getElementById("gongFa");
const hpEl=document.getElementById("hp");
const atkEl=document.getElementById("atk");
const defEl=document.getElementById("def");
const invEl=document.getElementById("inventory");
const fightBtn=document.getElementById("fightBtn");
const pillBtn=document.getElementById("pillBtn");

/* ===== DATA ===== */
const LINH_CAN=[
 {name:"Đơn linh căn",speed:1.4,elements:["Kim"]},
 {name:"Song linh căn",speed:1.2,elements:["Kim","Hỏa"]},
 {name:"Tam linh căn",speed:1.0,elements:["Kim","Mộc","Thủy"]},
 {name:"Ngũ hành linh căn",speed:0.7,elements:["Kim","Mộc","Thủy","Hỏa","Thổ"]}
];
const GONG_FA=[
 {name:"Thanh Mộc Tâm Kinh",mult:1.4},
 {name:"Hỏa Linh Quyết",mult:1.5},
 {name:"Kim Cương Công",mult:1.45}
];
const VO_KY={
 Kim:"Kim Quang Trảm",
 Hỏa:"Liệt Diễm Quyền",
 Mộc:"Thanh Mộc Chưởng",
 Thủy:"Hàn Thủy Chưởng",
 Thổ:"Địa Chấn Kích"
};

/* ===== PLAYER ===== */
const player={
 realm:1,qi:0,maxQi:100,
 stats:{hp:100,atk:10,def:5},
 inventory:["Tụ linh đan"]
};
player.linhCan=LINH_CAN[Math.floor(Math.random()*LINH_CAN.length)];
player.gongFa=GONG_FA[Math.floor(Math.random()*GONG_FA.length)];

/* ===== UI ===== */
function add(msg){
 const d=document.createElement("div");
 d.innerText=msg;
 log.appendChild(d);
 log.scrollTop=99999;
}
function updateUI(){
 qiEl.innerText=player.qi.toFixed(1);
 maxQiEl.innerText=player.maxQi;
 realmEl.innerText="Luyện Khí "+player.realm;
 lingCanEl.innerText=player.linhCan.name+
 " ("+player.linhCan.elements.join(",")+")";
 gongFaEl.innerText=player.gongFa.name;
 hpEl.innerText=player.stats.hp;
 atkEl.innerText=player.stats.atk;
 defEl.innerText=player.stats.def;
 invEl.innerHTML="";
 player.inventory.forEach(i=>{
  const d=document.createElement("div");
  d.innerText="• "+i;
  invEl.appendChild(d);
 });
}

/* ===== SCENE ===== */
function showCult(){
 scene.style.background=CULT_BG;
 scene.classList.add("glow");
 scene.classList.remove("shake");
}
function showBattle(){
 scene.style.background=BATTLE_BG;
 scene.classList.add("shake");
 setTimeout(()=>scene.classList.remove("shake"),400);
}

/* ===== AUTO CULTIVATION ===== */
setInterval(()=>{
 let gain=player.linhCan.speed*player.gongFa.mult;
 player.qi+=gain;
 if(player.qi>=player.maxQi){
  player.qi=player.maxQi;
  add("⚡ Linh khí đầy!");
 }
 scene.innerText="🧘 Tu luyện… (+"+gain.toFixed(1)+"/s)";
 showCult();
 updateUI();
},1000);

/* ===== COMBAT ===== */
fightBtn.onclick=()=>{
 scene.innerText="⚔️ Chiến đấu!";
 showBattle();
 let skill=VO_KY[player.linhCan.elements[0]];
 let dmg=player.stats.atk*player.gongFa.mult;
 add("⚔️ Dùng "+skill+" gây "+dmg.toFixed(0)+" sát thương");
 add("🎉 Chiến thắng! Nhận Tụ linh đan");
 player.inventory.push("Tụ linh đan");
 updateUI();
};

/* ===== ITEM ===== */
pillBtn.onclick=()=>{
 let i=player.inventory.indexOf("Tụ linh đan");
 if(i<0){add("❌ Không có đan");return;}
 player.inventory.splice(i,1);
 player.qi+=30;
 add("💊 Dùng Tụ linh đan, linh khí tăng");
 updateUI();
};

/* ===== INIT ===== */
add("🌱 Bắt đầu tu luyện với "+player.gongFa.name);
updateUI();
