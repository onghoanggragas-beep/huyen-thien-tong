/* ========= BATTLE SAFE ========= */

window.startBattle = function (mapId = 1) {
  alert("⚔️ startBattle OK | mapId = " + mapId);

  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );

  const battle = document.getElementById("battle");
  if (!battle) {
    alert("❌ battle screen không tồn tại");
    return;
  }

  battle.classList.remove("hidden");

  document.getElementById("playerHP").innerText = "HP: 100";
  document.getElementById("monsterHP").innerText = "Quái HP: 50";
  document.getElementById("battleLog").innerHTML =
    "<div>⚔️ Đã vào battle (SAFE)</div>";
};

window.endBattle = function () {
  alert("⬅️ endBattle OK");

  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById("game-screen").classList.remove("hidden");
};
