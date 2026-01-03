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
const GRADES = [
  { name: "Hạ", rate: 40 },
  { name: "Trung", rate: 30 },
  { name: "Thượng", rate: 18 },
  { name: "Cực", rate: 9 },
  { name: "Tiên", rate: 3 }
];

const LINH_CAN = [
  { name: "Kim", desc: "Công kích sắc bén" },
  { name: "Mộc", desc: "Sinh mệnh dồi dào" },
  { name: "Thủy", desc: "Hồi phục nhanh" },
  { name: "Hỏa", desc: "Bộc phát mạnh" },
  { name: "Thổ", desc: "Phòng ngự vững chắc" },
  { name: "Phong", desc: "Tốc độ cao" },
  { name: "Lôi", desc: "Sát thương bạo phát" },
  { name: "Băng", desc: "Khống chế mạnh" }
];

const TIEN_THIEN = [
  { name: "Thiên Mệnh Chi Tử", desc: "Khí vận cực cao" },
  { name: "Ngộ Tính Tuyệt Luân", desc: "Tu luyện nhanh vượt trội" },
  { name: "Đệ Tử Thế Gia", desc: "Khởi đầu có tài nguyên" },
  { name: "Người Xuyên Không", desc: "Biết trước một phần thế giới" },
  { name: "Khí Vận Gia Thân", desc: "Dễ gặp kỳ ngộ" },
  { name: "Thần Hồn Cường Đại", desc: "Thần thức vượt trội" },
  { name: "Chiến Đấu Cuồng Nhân", desc: "Càng đánh càng mạnh" },
  { name: "Tiên Thiên Đạo Thể", desc: "Phù hợp mọi công pháp" },
  { name: "Hỗn Độn Linh Thể", desc: "Không bị hạn chế linh căn" },
  { name: "Bất Diệt Thể Phách", desc: "Hồi phục nhanh" }
];

// ===== STATE =====
let qi = 0;
let maxQi = 100;
let realm = 1;
let hp = 100;

let rolledLingCan = null;
let rolledTienThien = [];
let chosenTT = [];

// ===== UTILS =====
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function rollGrade(){
  const r = Math.random()*100;
  let sum = 0;
  for(const g of GRADES){
    sum += g.rate;
    if(r <= sum) return g.name;
  }
  return "Hạ";
}

function add(text, cls="npc"){
  const div=document.createElement("div");
  div.className=cls;
  div.innerText=text;
  log.appendChild(div);
  log.scrollTop=log.scrollHeight;
}

// ===== ROLL CHARACTER =====
function rollCharacter(){
  chosenTT = [];
  tienThienList.innerHTML = "";

  const lc = rand(LINH_CAN);
  rolledLingCan = {
    name: lc.name,
    grade: rollGrade(),
    desc: lc.desc
  };

  lingCanEl.innerText =
    `${rolledLingCan.name} linh căn [${rolledLingCan.grade}] – ${rolledLingCan.desc}`;

  rolledTienThien = [...TIEN_THIEN]
    .sort(()=>0.5-Math.random())
    .slice(0,5)
    .map(t => ({
      ...t,
      grade: rollGrade()
    }));

  rolledTienThien.forEach(t=>{
    const div=document.createElement("div");
    div.innerText =
      `✨ ${t.name} [${t.grade}]\n${t.desc}`;
    div.style.cursor="pointer";
    div.style.marginBottom="6px";

    div.onclick=()=>{
      if(chosenTT.includes(t)){
        chosenTT = chosenTT.filter(x=>x!==t);
        div.style.color="";
      } else if(chosenTT.length<3){
        chosenTT.push(t);
        div.style.color="gold";
      }
    };
    tienThienList.appendChild(div);
  });
}

// ===== INIT =====
add("🌌 Thế giới tu tiên mở ra...");
rollCharacter();

// ===== CONFIRM =====
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
  add(`✨ ${nameInput.value} chính thức bước lên con đường tu tiên.`);
};

// ===== GAMEPLAY =====
absorbBtn.onclick=()=>{
  qi += 10;
  if(qi >= maxQi){
    qi = maxQi;
    breakBtn.style.display="block";
  }
  qiEl.innerText = qi;
};

breakBtn.onclick=()=>{
  realm++;
  qi = 0;
  maxQi += 50;
  realmEl.innerText = `Luyện Khí tầng ${realm}`;
  qiEl.innerText = qi;
  maxQiEl.innerText = maxQi;
  breakBtn.style.display="none";
  add("⚡ Đột phá thành công!");
};

fightBtn.onclick=()=>{
  add("⚔️ Bạn giao chiến với yêu thú...");
};

// ===== REROLL BUTTON =====
const rerollBtn = document.createElement("button");
rerollBtn.innerText = "🎲 Roll lại";
rerollBtn.style.marginTop = "8px";
confirmBtn.before(rerollBtn);
rerollBtn.onclick = rollCharacter;
