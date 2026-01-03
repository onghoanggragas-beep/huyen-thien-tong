function toggleCultivation(){
  const c=loadChar();
  c.cultivating=!c.cultivating;
  saveChar(c);
}

setInterval(()=>{
  const c=loadChar();
  if(!c||!c.cultivating) return;

  const r=REALMS[c.realmIndex];
  c.qi+=1*c.root.speed;
  if(c.qi>=r.maxQi){
    c.qi=r.maxQi;
  }
  saveChar(c);
  render();
},1000);

function breakThrough(){
  const c=loadChar();
  const r=REALMS[c.realmIndex];
  if(c.qi<r.maxQi) return alert("Chưa đủ linh khí");

  c.qi=0;
  c.stage++;
  if(c.stage>r.maxStage){
    c.stage=1;
    c.realmIndex++;
    c.lifespan+=50;
  }
  recalcStats(c);
  saveChar(c);
  render();
}
