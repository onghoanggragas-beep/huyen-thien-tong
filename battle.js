/* ================= COMBAT SYSTEM ================= */

let battleData = null;

function startBattle(mapId) {
  hideAllScreens();
  document.getElementById("battle-screen").classList.remove("hidden");

  battleData = {
    player: {
      hp: 100,
      maxHp: 100,
      atk: 12
    },
    enemy: {
      hp: 80 + mapId * 20,
      maxHp: 80 + mapId * 20,
      atk: 8 + mapId * 4
    },
    turn: "player"
  };

  updateBattleUI();
  logBattle("⚔️ Quái vật xuất hiện!");
}

function updateBattleUI() {
  document.getElementById("player-hp").style.width =
    (battleData.player.hp / battleData.player.maxHp * 100) + "%";

  document.getElementById("enemy-hp").style.width =
    (battleData.enemy.hp / battleData.enemy.maxHp * 100) + "%";
}

function logBattle(text) {
  const log = document.getElementById("battle-log");
  log.innerHTML += `<div>${text}</div>`;
  log.scrollTop = log.scrollHeight;
}

/* ================= PLAYER ACTION ================= */

function playerAttack() {
  if (battleData.turn !== "player") return;

  animate("player", "attack");

  const dmg = battleData.player.atk + rand(0, 5);
  battleData.enemy.hp -= dmg;

  logBattle(`🗡 Bạn đánh thường gây ${dmg} sát thương`);

  if (battleData.enemy.hp <= 0) {
    winBattle();
    return;
  }

  battleData.turn = "enemy";
  updateBattleUI();
  setTimeout(enemyTurn, 700);
}

function playerSkill() {
  if (battleData.turn !== "player") return;

  animate("player", "skill");

  const dmg = battleData.player.atk * 2 + rand(5, 10);
  battleData.enemy.hp -= dmg;

  logBattle(`🔥 Bạn dùng võ kỹ gây ${dmg} sát thương!`);

  if (battleData.enemy.hp <= 0) {
    winBattle();
    return;
  }

  battleData.turn = "enemy";
  updateBattleUI();
  setTimeout(enemyTurn, 900);
}

/* ================= ENEMY ================= */

function enemyTurn() {
  animate("enemy", "attack");

  const dmg = battleData.enemy.atk + rand(0, 4);
  battleData.player.hp -= dmg;

  logBattle(`👹 Quái phản công gây ${dmg} sát thương`);

  if (battleData.player.hp <= 0) {
    loseBattle();
    return;
  }

  battleData.turn = "player";
  updateBattleUI();
}

/* ================= RESULT ================= */

function winBattle() {
  logBattle("🏆 Bạn đã chiến thắng!");
  setTimeout(() => {
    alert("🎉 Thắng trận! Nhận linh khí.");
    endBattle();
  }, 800);
}

function loseBattle() {
  logBattle("💀 Bạn bại trận...");
  setTimeout(() => {
    alert("Bạn đã thua, bị đẩy ra ngoài.");
    endBattle();
  }, 800);
}

function endBattle() {
  battleData = null;
  showGame();
}

/* ================= ANIMATION ================= */

function animate(id, type) {
  const el = document.getElementById(id);
  el.classList.remove("attack", "skill");
  el.classList.add(type);

  setTimeout(() => {
    el.classList.remove(type);
  }, 400);
}

/* ================= UTIL ================= */

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
      }
