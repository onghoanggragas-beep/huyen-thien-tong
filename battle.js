let battle=null;

function startBattle(id){
  const c=loadChar();
  battle={ player:{hp:c.stats.hp}, monster:{hp:50+id*30} };
  hideAll();
  battle.classList.remove("hidden");
  playerHP.innerText="HP: "+battle.player.hp;
  monsterHP.innerText="Quái: "+battle.monster.hp;
}

function endBattle(){ showGame(); }
