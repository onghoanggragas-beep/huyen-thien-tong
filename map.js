const MAPS = [
  {
    id:1,
    name:"Linh Sơn",
    monsters:[
      {name:"Linh Lang",hp:80,atk:8,element:"Kim"},
      {name:"Sơn Yêu",hp:120,atk:10,element:"Thổ"}
    ]
  },
  {
    id:2,
    name:"Hỏa Vực",
    monsters:[
      {name:"Hỏa Linh",hp:150,atk:15,element:"Hỏa"},
      {name:"Viêm Ma",hp:220,atk:18,element:"Hỏa",boss:true}
    ]
  }
];

function randomMonster(mapId){
  const m=MAPS.find(x=>x.id===mapId);
  return JSON.parse(JSON.stringify(
    m.monsters[Math.floor(Math.random()*m.monsters.length)]
  ));
}
