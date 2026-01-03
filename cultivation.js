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

function breakThrough(){
const c=loadChar();
const r=REALMS[c.realm];
if(c.qi>=r.maxQi){
c.qi=0;
c.stage++;
if(c.stage>r.stages){ c.stage=1;c.realm++; }
log("✨ Đột phá thành công!");
saveChar(c);
}
}
