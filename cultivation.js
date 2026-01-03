function updateCultivation(){
const c=loadChar();
if(!c||!c.cultivating)return;
const now=Date.now();
const dt=(now-c.last)/1000;
let speed=1*c.root.speed;
c.talents.forEach(t=>{ if(t.effect.cultivation)speed+=t.effect.cultivation;});
c.qi+=dt*speed;
c.last=now;
saveChar(c);
}

function toggleCultivation(){
const c=loadChar();
c.cultivating=!c.cultivating;
c.last=Date.now();
saveChar(c);
}
window.breakThrough = function () {
  const c = loadChar();
  const realm = REALMS[c.realmIndex];

  if (c.qi < realm.maxQi) {
    alert("❌ Linh khí chưa đủ để đột phá");
    return;
  }

  c.qi = 0;
  c.stage++;

  if (c.stage > realm.maxStage) {
    c.stage = 1;
    c.realmIndex++;
    alert("✨ Đột phá cảnh giới!");
  } else {
    alert("⚡ Đột phá tầng thành công!");
  }

  saveChar(c);
  render();
};
