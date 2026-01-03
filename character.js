                                                   let selectedGender=null, rolled=null, selectedTalents=[];

function selectGender(g){ selectedGender=g; }

function rollCharacter(){
  rolled={
    root: rollSpiritRoot(),
    talents: TALENTS.sort(()=>0.5-Math.random()).slice(0,6)
  };
  selectedTalents=[];
  renderRoll();
}

function toggleTalent(i){
  const t=rolled.talents[i];
  if(selectedTalents.includes(t)){
    selectedTalents=selectedTalents.filter(x=>x!==t);
  }else{
    if(selectedTalents.length>=3) return alert("Chỉ chọn 3");
    selectedTalents.push(t);
  }
  renderRoll();
}

function renderRoll(){
  roll-result.innerHTML=`
    <b>${rolled.root.typeName}</b>
    ${rolled.talents.map((t,i)=>`
      <div onclick="toggleTalent(${i})"
        style="background:${selectedTalents.includes(t)?'#ffd36b':'#333'}">
        ${t.name}
      </div>`).join("")}
  `;
}

function confirmCharacter(){
  if(!rolled||!selectedGender||!char-name.value) return alert("Thiếu thông tin");

  const c={
    name: char-name.value,
    gender: selectedGender,
    age: 16,
    lifespan: 120,
    realmIndex: 0,
    stage: 1,
    qi: 0,
    root: rolled.root,
    talents: selectedTalents,
    stats: { hp:100, atk:10, def:5, spd:1 },
    cultivating:false,
    lastUpdate:Date.now()
  };
  recalcStats(c);
  saveChar(c);
  showGame();
}
