/* ===== DOM ===== */
const scene=document.getElementById("scene");
const log=document.getElementById("log");
const qiEl=document.getElementById("qi");
const maxQiEl=document.getElementById("maxQi");
const realmEl=document.getElementById("realm");
const lingCanEl=document.getElementById("lingCan");
const gongFaEl=document.getElementById("gongFa");
const invEl=document.getElementById("inventory");
const mapEl=document.getElementById("map");
const areaEl=document.getElementById("area");

const cultBtn=document.getElementById("cultBtn");
const fightBtn=document.getElementById("fightBtn");
const secretBtn=document.getElementById("secretBtn");

/* ===== STATE ===== */
const player={
 realm:1,qi:0,maxQi:100,
 lingCan:LINH_CAN_TYPES[Math.floor(Math.random()*LINH_CAN_TYPES.length)],
 gongFa:null,
 inventory:[],
 area:MAPS[0]
};
player.gongFa=CONG_PHAP_LIST[Math.floor(Math.random()*CONG_PHAP_LIST.length)];

/* ===== UTILS ===== */
function add(m){const d=document.createElement("div");d.innerText=m;log.appendChild(d);log.scrollTop=99999}
function rand(a){return a[Math.floor(Math.random()*a.length)]}

/* ===== UI ===== */
function updateUI(){
 qiEl.innerText=player.qi.toFixed(1);
 maxQiEl.innerText=player.maxQi;
 realmEl.innerText="Luyện Khí "+player.realm;
 lingCanEl.innerText=player.lingCan.name;
 gongFaEl.innerText=player.gongFa.name;
 areaEl.innerText=player.area.name;
 invEl.innerHTML="";
 player.inventory.forEach(i=>{
  const d=document.createElement("div");
  d.innerText="• "+i;
  invEl.appendChild(d);
 });
}

/* ===== MAP ===== */
MAPS.forEach(m=>{
 const b=document.createElement("button");
 b.innerText=m.name;
 b.onclick=()=>{player.area=m;add("🗺️ Di chuyển tới "+m.name);updateUI()}
 mapEl.appendChild(b);
});

/* ===== CULT ===== */
cultBtn.onclick=()=>{
 scene.className="cult";
 let gain=player.lingCan.speed*player.gongFa.mult;
 player.qi=Math.min(player.maxQi,player.qi+gain);
 add("🌬️ Tu luyện +"+gain.toFixed(1));
 updateUI();
};

/* ===== FIGHT ===== */
fightBtn.onclick=()=>{
 scene.className="battle";
 const enemyHp=50+player.area.danger*30;
 const skill=rand(VO_KY_LIST.filter(v=>player.lingCan.els.includes(v.el)));
 add("⚔️ Dùng "+skill.name+" gây "+skill.dmg+" sát thương");
 if(Math.random()>0.5){
  const drop=rand(CONG_PHAP_LIST).name;
  player.inventory.push("📜 "+drop);
  add("🎁 Nhận được công pháp!");
 }
};

/* ===== SECRET ===== */
secretBtn.onclick=()=>{
 scene.className="battle";
 add("🕳️ Khám phá bí cảnh…");
 if(Math.random()>0.6){
  const skill=rand(VO_KY_LIST).name;
  player.inventory.push("⚔️ "+skill);
  add("✨ Nhặt được võ kỹ hiếm!");
 }else add("⚠️ Bí cảnh nguy hiểm, phải rút lui!");
};

/* ===== INIT ===== */
add("🌱 Bắt đầu hành trình tu tiên");
updateUI();
