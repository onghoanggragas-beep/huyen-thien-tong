// ===== DOM =====
const log = document.getElementById("log");
const absorbBtn = document.getElementById("absorbBtn");
const breakBtn = document.getElementById("breakBtn");
const fightBtn = document.getElementById("fightBtn");

const realmEl = document.getElementById("realm");
const qiEl = document.getElementById("qi");
const maxQiEl = document.getElementById("maxQi");
const hpEl = document.getElementById("hp");

// Create character
const createBox = document.getElementById("createChar");
const confirmBtn = document.getElementById("confirmChar");
const nameInput = document.getElementById("charName");
const genderSelect = document.getElementById("charGender");
const lingCanEl = document.getElementById("lingCan");
const tienThienList = document.getElementById("tienThienList");

// ===== DATA =====
const LINH_CAN = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ", "Phong", "Lôi", "Băng"];
const GRADES = ["Hạ", "Trung", "Thượng", "Cực", "Tiên"];

const TIEN_THIEN = [
  "Thiên Mệnh Chi Tử","Ngộ Tính Tuyệt Luân","Đệ Tử Thế Gia","Khí Vận Gia Thân","Người Xuyên Không",
  "Thần Hồn Cường Đại","Chiến Đấu Cuồng Nhân","Tiên Thiên Đạo Thể","Hỗn Độn Linh Thể","Bất Diệt Thể Phách",
  "Ý Chí Bất Khuất","Cơ Duyên Liên Miên","Huyết Chiến Thể","Sát Phạt Quyết Đoán","Thiên Phú Dị Biến"
];

// ===== STATE =====
let qi = 0;
let maxQi = 100;
let realm = 1;
let hp = 100;
let chosenTT = [];

// ===== UTILS =====
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function add(text, cls="npc"){
  const div=document.createElement("div");
  div.className=cls;
  div.innerText=text;
  log.appendChild(div);
  log.scrollTop=log.scrollHeight;
}

// ===== INIT =====
add("🌌 Thế giới tu tiên mở ra...");

// Roll linh căn
const rolledLingCan = `${rand(LINH_CAN)} linh căn [${rand(GRADES)}]`;
lingCanEl.innerText = rolledLingCan;

// Roll tiên thiên
const rolledTT = [...TIEN_THIEN].sort(()=>0.5-Math.random()).slice(0,5);
rolledTT.forEach(t=>{
  const div=document.createElement("div");
  div.innerText=`✨ ${t}`;
  div.style.cursor="pointer";
  div.onclick=()=>{
    if(chosenTT.includes(t)){
      chosenTT=chosenTT.filter(x=>x!==t);
      div.style.color="";
    } else if(chosenTT.length<3){
      chosenTT.push(t);
      div.style.color="gold";
    }
  };
  tienThienList.appendChild(div);
});

// ===== CONFIRM CHARACTER =====
confirmBtn.onclick=()=>{
  if(!nameInput.value.trim()){
    alert("Phải nhập tên nhân vật");
    return;
  }
  if(chosenTT.length!==3){
    alert("Phải chọn đúng 3 tiên thiên");
    return;
  }

  createBox.style.display="none";
  add(`✨ ${nameInput.value} bước lên con đường tu tiên.`);
};

// ===== GAMEPLAY =====
absorbBtn.onclick=()=>{
  qi+=10;
  if(qi>=maxQi){
    qi=maxQi;
    breakBtn.style.display="block";
  }
  qiEl.innerText=qi;
};

breakBtn.onclick=()=>{
  realm++;
  qi=0;
  maxQi+=50;
  realmEl.innerText=`Luyện Khí tầng ${realm}`;
  qiEl.innerText=qi;
  maxQiEl.innerText=maxQi;
  breakBtn.style.display="none";
  add("⚡ Đột phá thành công!");
};

fightBtn.onclick=()=>{
  add("⚔️ Bạn giao chiến với yêu thú...");
};
