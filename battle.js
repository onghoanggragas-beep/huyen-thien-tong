let battleState=null;

function startBattle(mapId=1){
  const char=loadChar();
  const monster=randomMonster(mapId);

  battleState={
    player:{
      hp:100+char.realm*50,
      atk:10+char.realm*5,
      skills:SKILLS.filter(s=>char.root.elements.includes(s.element))
    },
    monster:{
      name:monster.name,
      hp:monster.hp,
      atk:monster.atk,
      element:monster.element
    }
  };

  showBattle();
  renderBattle();
}

function showBattle(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
  document.getElementById("battle").classList.remove("hidden");
}

function renderBattle(){
  document.getElementById("playerHP").innerText =
    `HP: ${battleState.player.hp}`;
  document.getElementById("monsterHP").innerText =
    `${battleState.monster.name} HP: ${battleState.monster.hp}`;

  const bar=document.getElementById("skillBar");
  bar.innerHTML="";
  battleState.player.skills.forEach(s=>{
    const btn=document.createElement("button");
    btn.innerText=s.name;
    btn.onclick=()=>useSkill(s);
    bar.appendChild(btn);
  });
}

function useSkill(skill){
  const dmg = Math.floor(
    battleState.player.atk * skill.damage
  );

  battleState.monster.hp -= dmg;
  logBattle(`🔥 Bạn dùng ${skill.name} gây ${dmg} sát thương`);

  animate("playerSprite");

  if(battleState.monster.hp<=0){
    winBattle();
    return;
  }

  monsterTurn();
  renderBattle();
}

function monsterTurn(){
  const dmg=battleState.monster.atk;
  battleState.player.hp-=dmg;
  logBattle(`👹 ${battleState.monster.name} phản công ${dmg} sát thương`);
  animate("monsterSprite");

  if(battleState.player.hp<=0){
    loseBattle();
  }
}

function animate(id){
  const el=document.getElementById(id);
  el.classList.add("attack");
  setTimeout(()=>el.classList.remove("attack"),400);
}

function logBattle(msg){
  const l=document.getElementById("battleLog");
  l.innerHTML+=`<div>${msg}</div>`;
  l.scrollTop=l.scrollHeight;
}

function winBattle(){
  logBattle("🏆 Chiến thắng!");
}

function loseBattle(){
  logBattle("💀 Thất bại!");
}

function endBattle(){
  document.getElementById("battle").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
}
