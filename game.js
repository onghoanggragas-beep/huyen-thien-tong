/* =========================
   GAME CORE STATE
========================= */
const player = {
  hp: 100,
  maxHp: 100,
  atk: 15,
  stage: 1,
  exp: 0,
  expMax: 100,
  cultivating: false,
  sprite: "player_male.png"
};

const enemy = {
  hp: 80,
  atk: 8,
  sprite: "enemy.png"
};

let frameIndex = 0;
let currentAnim = "idle";
let animInterval = null;

/* =========================
   DOM
========================= */
const playerEl = document.getElementById("player");
const enemyEl = document.getElementById("enemy");
const logEl = document.getElementById("log");

/* =========================
   SPRITE CONFIG
========================= */
const SPRITE = {
  frameW: 256,
  frameH: 256,
  idle: { row: 0, frames: 4, speed: 300 },
  attack: { row: 1, frames: 4, speed: 120 },
  hit: { row: 2, frames: 2, speed: 150 }
};

/* =========================
   INIT
========================= */
function init(){
  loadSprite(playerEl, player.sprite);
  loadSprite(enemyEl, enemy.sprite);
  startAnim("idle");
  loadGame();
  autoCultivation();
  log("🌱 Bắt đầu tu tiên...");
}
init();

/* =========================
   SPRITE FUNCTIONS
========================= */
function loadSprite(el, file){
  el.style.backgroundImage = `url(assets/${file})`;
}

function startAnim(type){
  clearInterval(animInterval);
  currentAnim = type;
  frameIndex = 0;
  const cfg = SPRITE[type];
  animInterval = setInterval(()=>{
    frameIndex = (frameIndex + 1) % cfg.frames;
    updateFrame();
  }, cfg.speed);
}

function updateFrame(){
  const cfg = SPRITE[currentAnim];
  const x = frameIndex * SPRITE.frameW;
  const y = cfg.row * SPRITE.frameH;
  const el = currentAnim === "attack" ? playerEl : playerEl;
  el.style.backgroundPosition = `-${x}px -${y}px`;
}

/* =========================
   GAMEPLAY
========================= */
function cultivate(){
  if(player.cultivating) return;
  player.cultivating = true;
  log("🧘 Đang tu luyện...");
}

function autoCultivation(){
  setInterval(()=>{
    if(!player.cultivating) return;
    player.exp += 2;
    if(player.exp >= player.expMax){
      player.exp = 0;
      player.stage++;
      player.expMax += 40;
      player.atk += 3;
      player.maxHp += 10;
      player.hp = player.maxHp;
      log(`✨ Đột phá cảnh giới! → Stage ${player.stage}`);
    }
    saveGame();
  }, 1000);
}

function battle(){
  if(player.hp <= 0){
    log("💀 Trọng thương, không thể chiến đấu");
    return;
  }
  log("⚔️ Giao chiến!");
  startAnim("attack");
  setTimeout(()=>{
    enemy.hp -= player.atk;
    flash(enemyEl);
    if(enemy.hp <= 0){
      winBattle();
    }else{
      enemyAttack();
    }
  }, 400);
}

function enemyAttack(){
  setTimeout(()=>{
    player.hp -= enemy.atk;
    flash(playerEl);
    if(player.hp <= 0){
      log("💀 Bại trận...");
      player.hp = Math.floor(player.maxHp/2);
    }else{
      log(`❤️ HP: ${player.hp}/${player.maxHp}`);
    }
    startAnim("idle");
    saveGame();
  }, 400);
}

function winBattle(){
  log("🎉 Chiến thắng!");
  enemy.hp = 80 + player.stage*10;
  enemy.atk += 1;
  player.exp += 20;
  startAnim("idle");
  saveGame();
}

/* =========================
   EFFECTS
========================= */
function flash(el){
  el.style.filter="brightness(1.8)";
  setTimeout(()=>el.style.filter="",120);
}

/* =========================
   LOG
========================= */
function log(txt){
  logEl.innerHTML += `<div>${txt}</div>`;
  logEl.scrollTop = logEl.scrollHeight;
}

/* =========================
   SAVE / LOAD
========================= */
function saveGame(){
  localStorage.setItem("tutien_save", JSON.stringify(player));
}
function loadGame(){
  const save = localStorage.getItem("tutien_save");
  if(save){
    Object.assign(player, JSON.parse(save));
    log("📦 Đã tải dữ liệu tu luyện");
  }
     }
