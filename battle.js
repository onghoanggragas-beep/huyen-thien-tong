/* =================================================
   BATTLE – CORE VERSION
================================================= */

let battleState = null;

window.startBattle = function (mapId = 1, floor = 1) {
  const char = loadChar();
  if (!char) return;

  const map = MAPS.find(m => m.id === mapId);

  const scale = map ? map.monsterScale : 1;

  battleState = {
    mapId,
    floor,
    isBoss: map && floor % map.bossEvery === 0,
    player: {
      hp: 100 + char.realmIndex * 50,
      atk: 10 + char.realmIndex * 5
    },
    monster: {
      name:
        map && floor % map.bossEvery === 0
          ? "👑 Boss " + map.name
          : "Quái " + map.name,
      hp: Math.floor((60 + floor * 10) * scale),
      atk: Math.floor((8 + floor * 4) * scale)
    }
  };

  showBattle();
  renderBattle();
};

function showBattle() {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById("battle").classList.remove("hidden");
}

function renderBattle() {
  document.getElementById("playerHP").innerText =
    `HP: ${battleState.player.hp}`;
  document.getElementById("monsterHP").innerText =
    `${battleState.monster.name} HP: ${battleState.monster.hp}`;

  document.getElementById("battleLog").innerHTML =
    "<div>⚔️ Trận chiến bắt đầu</div>";

  // Đánh tự động đơn giản
  setTimeout(playerAttack, 500);
}

function playerAttack() {
  if (!battleState) return;

  battleState.monster.hp -= battleState.player.atk;
  logBattle(`🗡️ Bạn gây ${battleState.player.atk} sát thương`);

  if (battleState.monster.hp <= 0) {
    winBattle();setNextFloor(battleState.mapId);
    return;
  }

  setTimeout(monsterAttack, 600);
}

function monsterAttack() {
  battleState.player.hp -= battleState.monster.atk;
  logBattle(`👹 Quái phản công ${battleState.monster.atk}`);

  if (battleState.player.hp <= 0) {
    loseBattle();
    return;
  }

  renderBattle();
}

function winBattle() {
  logBattle("🏆 Chiến thắng!");
  setTimeout(endBattle, 800);
}

function loseBattle() {
  logBattle("💀 Thất bại!");
  setTimeout(endBattle, 800);
}

function logBattle(msg) {
  const log = document.getElementById("battleLog");
  log.innerHTML += `<div>${msg}</div>`;
  log.scrollTop = log.scrollHeight;
}

window.endBattle = function () {
  battleState = null;
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById("game-screen").classList.remove("hidden");
};
