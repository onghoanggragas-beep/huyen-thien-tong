/* ===== AUTH ===== */
function hash(s){return btoa(s)}
function getUsers(){return JSON.parse(localStorage.getItem("users")||"{}")}
function saveUsers(u){localStorage.setItem("users",JSON.stringify(u))}

let currentUser=null;
let player=null;
let selectedGender=null;

/* ===== DOM ===== */
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

/* ===== LOGIN ===== */
function login(){
 const u=document.getElementById("user").value.trim();
 const p=document.getElementById("pass").value;
 if(!u||!p)return alert("Thiếu thông tin");
 const users=getUsers();
 if(!users[u]){
   users[u]={pass:hash(p),data:null};
   saveUsers(users);
 }
 if(users[u].pass!==hash(p))return alert("Sai mật khẩu");
 currentUser=u;
 if(users[u].data){
   player=users[u].data;
   startGame(true);
 }else{
   loginBox.classList.add("hidden");
   createBox.classList.remove("hidden");
 }
}

/* ===== CREATE CHARACTER ===== */
function selectGender(g){
 selectedGender=g;
 rollInfo.innerText="Đã chọn: "+g;
}
function rollAll(){
 const lc=LINH_CAN_TYPES[Math.floor(Math.random()*LINH_CAN_TYPES.length)];
 const tt=[];
 while(tt.length<3){
  const t=TIEN_THIEN_LIST[Math.floor(Math.random()*TIEN_THIEN_LIST.length)];
  if(!tt.includes(t))tt.push(t);
 }
 player={
  gender:selectedGender,
  realm:1,
  qi:0,
  maxQi:100,
  linhCan:lc,
  tienThien:tt,
  lastOnline:Date.now()
 };
 rollInfo.innerText=`${lc.name} | Tiên thiên: ${tt.join(", ")}`;
}
function confirmChar(){
 if(!player||!selectedGender)return alert("Chưa xong");
 const users=getUsers();
 users[currentUser].data=player;
 saveUsers(users);
 startGame(false);
}

/* ===== GAME START ===== */
function startGame(fromLoad){
 loginBox.classList.add("hidden");
 createBox.classList.add("hidden");
 gameBox.classList.remove("hidden");
 if(fromLoad)calcOffline();
 add("🌱 Bắt đầu hành trình tu tiên");
 updateUI();
}

/* ===== OFFLINE ===== */
function calcOffline(){
 const now=Date.now();
 const diff=(now-player.lastOnline)/1000;
 const gain=diff*player.linhCan.speed;
 player.qi=Math.min(player.maxQi,player.qi+gain);
 add(`⏳ Offline ${Math.floor(diff)}s, nhận ${gain.toFixed(1)} linh khí`);
}

/* ===== SCENE ===== */
function switchScene(type){
 scene.className="";
 if(type==="cult"){
  scene.classList.add("cult");
  scene.innerText="🧘 Đang tu luyện…";
 }
 if(type==="battle"){
  scene.classList.add("battle");
  const skill=VO_KY_LIST[Math.floor(Math.random()*VO_KY_LIST.length)];
  add("⚔️ Tự động dùng "+skill.name);
 }
 if(type==="secret"){
  add("🕳️ Khám phá bí cảnh…");
 }
 if(type==="home"){
  add("🏠 Ở động phủ, tu vi ổn định hơn");
 }
}

/* ===== AUTO TU LUYỆN ===== */
setInterval(()=>{
 if(!player)return;
 player.qi+=player.linhCan.speed;
 if(player.qi>=player.maxQi){
  player.qi=player.maxQi;
 }
 player.lastOnline=Date.now();
 const users=getUsers();
 users[currentUser].data=player;
 saveUsers(users);
 updateUI();
},1000);

/* ===== UI ===== */
function add(m){
 const d=document.createElement("div");
 d.innerText=m;
 log.appendChild(d);
 log.scrollTop=99999;
}
function updateUI(){
 qiEl.innerText=player.qi.toFixed(1);
 maxQiEl.innerText=player.maxQi;
 realmEl.innerText="Luyện Khí "+player.realm;
 lingCanEl.innerText=player.linhCan.name;
}
