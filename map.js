/* =================================================
   MAP & DUNGEON SYSTEM
================================================= */

const MAPS = [
  {
    id: 1,
    name: "🌿 Linh Sơn",
    desc: "Nơi linh khí dồi dào, thích hợp tân thủ",
    maxFloor: 10,
    monsters: [
      { name: "Linh Lang", hp: 80, atk: 8 },
      { name: "Sơn Yêu", hp: 120, atk: 10 }
    ],
    boss: { name: "Sơn Linh Vương", hp: 300, atk: 18 }
  },
  {
    id: 2,
    name: "🔥 Hỏa Vực",
    desc: "Nhiệt độ cực cao, quái vật hung bạo",
    maxFloor: 10,
    monsters: [
      { name: "Hỏa Linh", hp: 150, atk: 15 },
      { name: "Viêm Thú", hp: 180, atk: 18 }
    ],
    boss: { name: "Viêm Ma", hp: 450, atk: 28 }
  },
  {
    id: 3,
    name: "❄️ Băng Nguyên",
    desc: "Hàn khí thấu xương, quái có khống chế",
    maxFloor: 10,
    monsters: [
      { name: "Băng Hồn", hp: 160, atk: 14 },
      { name: "Hàn Linh", hp: 200, atk: 16 }
    ],
    boss: { name: "Băng Vương", hp: 500, atk: 26 }
  }
];

function getMapById(id) {
  return MAPS.find(m => m.id === id);
}

function getMonster(mapId, floor) {
  const map = getMapById(mapId);
  if (!map) return null;

  // Boss mỗi 10 tầng
  if (floor % 10 === 0) {
    return JSON.parse(JSON.stringify(map.boss));
  }

  const base =
    map.monsters[Math.floor(Math.random() * map.monsters.length)];

  return JSON.parse(JSON.stringify(base));
      }
