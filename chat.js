/* =====================================================
   TU TIÊN WEB GAME – FULL CORE (CHAR + CULT + COMBAT)
   ===================================================== */

/* ================= DOM ================= */
const log = document.getElementById("log");
const absorbBtn = document.getElementById("absorbBtn");
const breakBtn = document.getElementById("breakBtn");
const fightBtn = document.getElementById("fightBtn");

const realmEl = document.getElementById("realm");
const qiEl = document.getElementById("qi");
const maxQiEl = document.getElementById("maxQi");

const createBox = document.getElementById("createChar");
const confirmBtn = document.getElementById("confirmChar");
const nameInput = document.getElementById("charName");
const genderSelect = document.getElementById("charGender");
const lingCanEl = document.getElementById("lingCan");
const tienThienList = document.getElementById("tienThienList");

/* ================= DATA ================= */
const ELEMENTS = ["Kim","Mộc","Thủy","Hỏa","Thổ","Phong","Lôi","Băng","Âm","Dương"];

const LINH_CAN_TYPES = [
  { name:"Đơn linh căn", count:1, speed:1.4 },
  { name:"Song linh căn", count:2, speed:1.2 },
  { name:"Tam linh căn", count:3, speed:1.0 },
  { name:"Tứ linh căn", count:4, speed:0.85 },
  { name:"Ngũ hành linh căn", count:5, speed:0.7 },
  { name:"Dị linh căn", count:1, speed:1.1, special:true }
];

const TIEN_THIEN_EFFECT = {
  "Thiên Mệnh Chi Tử":1.25,
  "Ngộ Tính Tuyệt Luân":1.2,
  "Khí Vận Gia Thân":1.15,
  "Người Xuyên Không":1.1,
  "Chiến Đấu Cuồng Nhân":0.95
};

const VO_KY = {
  Kim:["Kim Quang Trảm","Thiết Kiếm Quyết"],
  Mộc:["Thanh Mộc Chưởng","Sinh Sinh Bất Tức"],
  Thủy:["Hàn Thủy Chưởng","Thủy Lưu Bộ"],
  Hỏa:["Liệt Diễm Quyền","Hỏa Long Kích"],
  Thổ:["Cương Thạch Thể","Địa Chấn Kích"],
  Phong:["Phong Hành Bộ","Cuồng Phong Trảm"],
  Lôi:["Lôi Đình Chưởng","Thiên Lôi Phạt"],
  Băng:["Hàn Băng Phong"],
  Âm:["Âm Sát Chưởng"],
  Dương:["Dương Viêm Quyền"]
};

/* ==== CÔNG PHÁP (RÚT GỌN HIỂN THỊ – ĐÃ GỘP LOGIC) ==== */
const CONG_PHAP = [
  {name:"Thiên Đạo Chân Kinh",tier:"Thiên",grade:"Cực",element:"Hỗn",mult:2.6},
  {name:"Vạn Lôi Thiên Kinh",tier:"Thiên",grade:"Cực",element:"Lôi",mult:2.7},
  {name:"Hỏa Linh Chân Quyết",tier:"Địa",grade:"Thượng",element:"Hỏa",mult:1.9},
  {name:"Phong Linh Đại Pháp",tier:"Địa",grade:"Thượng",element:"Phong",mult:1.85},
  {name:"Thanh Mộc Tâm Kinh",tier:"Huyền",grade:"Thượng",element:"Mộc",mult:1.45},
  {name:"Kim Cương Công",tier:"Huyền",grade:"Hạ",element:"Kim",mult:1.35},
  {name:"Hỏa Cầu Công",tier:"Hoàng",grade:"Hạ",element:"Hỏa",mult:1.15},
  {name:"Thủy Lưu Công",tier:"Hoàng",grade:"Hạ",element:"Thủy",mult:1.1}
];

/* ================= STATE ================= */
let qi=0, maxQi=100, realm=1;
let linhCan=null, tienThien=[], congPhap=null;

/* ================= UTILS ================= */
function rand(arr){return arr[Math.floor(Math.random()*arr.length)]}
function add(msg){
  const d=document.createElement("div");
  d.innerText=msg;
  log.appendChild(d);
  log.scrollTop=log.scrollHeight;
}

/* ================= LINH CĂN ================= */
function rollLinhCan(){
  const type=rand(LINH_CAN_TYPES);
  let elements=[];
  if(type.name==="Ngũ hành linh căn"){
    elements=["Kim","Mộc","Thủy","Hỏa","Thổ"];
  }else if(type.special){
    elements=[rand(ELEMENTS)];
  }else{
    let pool=[...ELEMENTS];
    while(elements.length<type.count){
      let e=rand(pool);
      elements.push(e);
      pool.splice(pool.indexOf(e),1);
    }
  }
  linhCan={type:type.name,elements,speed:type.speed};
  lingCanEl.innerText=`${type.name}: ${elements.join(", ")}`;
}

/* ================= AUTO TU LUYỆN ================= */
function cultivationTick(){
  if(!linhCan||!congPhap)return;
  let speed=linhCan.speed*congPhap.mult;
  tienThien.forEach(t=>{
    if(TIEN_THIEN_EFFECT[t])speed*=TIEN_THIEN_EFFECT[t];
  });
  qi+=speed;
  if(qi>=maxQi){
    qi=maxQi;
    breakBtn.style.display="block";
  }
  qiEl.innerText=qi.toFixed(1);
}

/* ================= TẠO NHÂN VẬT ================= */
confirmBtn.onclick=()=>{
  rollLinhCan();
  tienThien=[...document.querySelectorAll("#tienThienList div")]
    .filter(d=>d.style.color==="gold")
    .map(d=>d.innerText.replace("✨ ",""));
  let available=CONG_PHAP.filter(c=>
    c.element==="Hỗn"||linhCan.elements.includes(c.element)
  );
  congPhap=rand(available);
  add(`👤 ${nameInput.value} (${genderSelect.value})`);
  add(`🌱 ${linhCan.type} – ${linhCan.elements.join(", ")}`);
  add(`📜 Công pháp: ${congPhap.name}`);
  add(`⚔️ Võ kỹ: ${VO_KY[linhCan.elements[0]].join(", ")}`);
  createBox.style.display="none";
};

/* ================= ĐỘT PHÁ ================= */
breakBtn.onclick=()=>{
  realm++;
  qi=0;
  maxQi+=50;
  realmEl.innerText=`Luyện Khí tầng ${realm}`;
  qiEl.innerText=qi;
  maxQiEl.innerText=maxQi;
  breakBtn.style.display="none";
  add("⚡ Đột phá cảnh giới!");
};

/* ================= CHIẾN ĐẤU ================= */
fightBtn.onclick=()=>{
  let enemyHp=100+realm*20;
  let skill=rand(VO_KY[linhCan.elements[0]]);
  let dmg=20*congPhap.mult;
  enemyHp-=dmg;
  add(`⚔️ Dùng ${skill}, gây ${dmg.toFixed(0)} sát thương`);
  if(enemyHp<=0)add("🎉 Đánh bại đối thủ!");
};

/* ================= START ================= */
setInterval(cultivationTick,1000);
