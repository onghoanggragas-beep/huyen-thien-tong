function recalcStats(c){
  c.stats.hp = 100 + c.stage*20 + c.realmIndex*80;
  c.stats.atk = 10 + c.stage*5 + c.realmIndex*20;
  c.stats.def = 5 + c.stage*3;
  c.stats.spd = 1 + c.stage*0.1;

  c.talents.forEach(t=>{
    if(t.effect==="atk") c.stats.atk*=1.1;
    if(t.effect==="hp") c.stats.hp*=1.1;
  });

  Object.keys(c.stats).forEach(k=>c.stats[k]=Math.floor(c.stats[k]));
}
