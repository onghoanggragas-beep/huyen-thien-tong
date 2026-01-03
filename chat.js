/* ================= CORE STATE ================= */
const log = document.getElementById("log");
const scene = document.getElementById("scene");

const qiEl = document.getElementById("qi");
const maxQiEl = document.getElementById("maxQi");
const realmEl = document.getElementById("realm");
const lingCanEl = document.getElementById("lingCan");
const gongFaEl = document.getElementById("gongFa");

const hpEl = document.getElementById("hp");
const atkEl = document.getElementById("atk");
const defEl = document.getElementById("def");
const spdEl = document.getElementById("spd");
const intEl = document.getElementById("int");

const invEl = document.getElementById("inventory");
const fightBtn = document.getElementById("fightBtn");
const usePillBtn = document.getElementById("usePill");

/* ================= DATA ================= */
const LINH_CAN = [
 {name:"Đơn linh căn",count:1,speed:1.4},
 {name:"Song linh căn",count:2,speed:1.2},
 {name:"Tam linh căn",count:3,speed:1.0},
 {name:"Tứ linh căn",count:4,speed:0.85},
 {name:"Ngũ hành linh căn",count:5,speed:0.7}
];

const ELEMENTS=["Kim","Mộc","Thủy","Hỏa","Thổ"];

const GONG_FA=[
 {name:"Thanh Mộc Tâm Kinh",mult:1.4},
 {name:"Hỏa Linh Quyết",mult:1.5},
 {name:"Kim Cương Công",mult:1.45},
 {name:"Huyền Thủy Quyết",mult:1.35},
 {name:"Địa Cương Công",mult:1.3}
];

const VO_KY={
 Kim:["Kim Quang Trảm"],
 Mộc:["Thanh Mộc Chưởng"],
 Thủy:["Hàn Thủy Chưởng"],
 Hỏa:["Liệt Diễm Quyền"],
 Thổ:["Địa Chấn Kích"]
};

/* ================= PLAYER ================= */
const player={
 name:"Đạo Hữu",
 gender:"Không rõ",
 realm:1,
 qi:0,
 maxQi:100,
 lingCan:null,
 gongFa:null,
 stats:{hp:100,atk:10,def:5,spd:5,int:10},
 inventory:["Tụ linh đan"]
};

/* ================= UTILS ================= */
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function add(msg){const d=document.createElement("div");d.innerText=msg;log.appendChild(d);log.scrollTop=99999}

/* ================= INIT ================= */
function initChar(){
 const lc=rand(LINH_CAN);
 player.lingCan={
  type:lc.name,
  elements:ELEMENTS.slice(0,lc.count),
  speed:lc.speed
 };
 player.gongFa=rand(GONG_FA);

 lingCanEl.innerText=player.lingCan.type+" ("+player.lingCan.elements.join(",")+")";
 gongFaEl.innerText=player.gongFa.name;

 updateUI();
 add("🌱 Bắt đầu tu luyện với "+player.gongFa.name);
}
initChar();

/* ================= UI ================= */
function updateUI(){
 qiEl.innerText=player.qi.toFixed(1);
 maxQiEl.innerText=player.maxQi;
 realmEl.innerText="Luyện Khí "+player.realm;
 hpEl.innerText=player.stats.hp;
 atkEl.innerText=player.stats.atk;
 defEl.innerText=player.stats.def;
 spdEl.innerText=player.stats.spd;
 intEl.innerText=player.stats.int;

 invEl.innerHTML="<b>🎒 Kho đồ</b><br>";
 player.inventory.forEach(i=>{
  const d=document.createElement("div");
  d.innerText="• "+i;
  invEl.appendChild(d);
 });
}

/* ================= AUTO CULTIVATION ================= */
setInterval(()=>{
 let speed=player.lingCan.speed*player.gongFa.mult;
 speed*=1+player.stats.int/100;
 player.qi+=speed;
 if(player.qi>=player.maxQi){
  player.qi=player.maxQi;
  add("⚡ Linh khí đầy, có thể đột phá!");
 }
 scene.innerText="🧘 Đang tu luyện… (+"+speed.toFixed(1)+"/s)";
 updateUI();
},1000);

/* ================= COMBAT ================= */
fightBtn.onclick=()=>{
 scene.innerText="⚔️ Giao chiến!";
 let enemyHp=80+player.realm*20;
 let skill=rand(VO_KY[player.lingCan.elements[0]]);
 let dmg=player.stats.atk*player.gongFa.mult;
 enemyHp-=dmg;
 add("⚔️ Dùng "+skill+" gây "+dmg.toFixed(0)+" sát thương");
 if(enemyHp<=0){
  add("🎉 Chiến thắng! Nhận Tụ linh đan");
  player.inventory.push("Tụ linh đan");
 }
 updateUI();
};

/* ================= ITEM ================= */
usePillBtn.onclick=()=>{
 const idx=player.inventory.indexOf("Tụ linh đan");
 if(idx<0){add("❌ Không có đan");return;}
 player.inventory.splice(idx,1);
 player.qi+=30;
 add("💊 Dùng Tụ linh đan, linh khí tăng");
 updateUI();
};
