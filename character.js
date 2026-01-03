let gender=null;
let rolled=null;

function selectGender(g){ gender=g; }

function rollCharacter(){
const root=rollSpiritRoot();
let talents=[];
while(talents.length<6){
let t=TALENTS[Math.floor(Math.random()*TALENTS.length)];
if(!talents.includes(t))talents.push(t);
}
rolled={root,talents};
document.getElementById("rollBox").innerHTML=`
<p><b>${root.typeName}</b></p>
<p>${root.elements.join(", ")}</p>
<p>Tiên thiên:</p>
${talents.map(t=>`<div>${t.name} (${t.grade})</div>`).join("")}
`;
}

function confirmCharacter(){
const name=document.getElementById("charName").value;
if(!name||!gender||!rolled)return alert("Thiếu thông tin");

const char={
name,gender,
root:rolled.root,
talents:rolled.talents.slice(0,3),
realm:0,stage:1,
qi:0,
cultivating:false,
last:Date.now()
saveChar(char);
startGame();
}
