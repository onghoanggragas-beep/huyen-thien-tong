/* =================================================
   MAP SYSTEM – CORE VERSION
================================================= */

/*
  Mỗi bản đồ có:
  - id
  - name
  - desc
  - unlockRealm (mở khi đạt cảnh giới)
  - maxFloor
  - bossEvery
  - monsterScale
  - dropRate
*/

const MAPS = [
  {
    id: 1,
    name: "🌿 Linh Sơn",
    desc: "Linh khí dồi dào, thích hợp tân thủ tu luyện",
    unlockRealm: 0, // Luyện Khí
    maxFloor: 30,
    bossEvery: 10,
    monsterScale: 1,
    dropRate: 0.6
  },
  {
    id: 2,
    name: "🔥 Hỏa Vực",
    desc: "Hỏa linh cuồng bạo, quái vật hung mãnh",
    unlockRealm: 1, // Trúc Cơ
    maxFloor: 40,
    bossEvery: 10,
    monsterScale: 1.5,
    dropRate: 0.75
  },
  {
    id: 3,
    name: "❄️ Băng Nguyên",
    desc: "Hàn khí thấu xương, quái vật có khống chế",
    unlockRealm: 2, // Kim Đan
    maxFloor: 50,
    bossEvery: 10,
    monsterScale: 2,
    dropRate: 0.85
  }
];

/* =================================================
   TIẾN TRÌNH MAP (LƯU THEO NHÂN VẬT)
================================================= */

function getMapProgress() {
  const c = loadChar();
  if (!c.mapProgress) {
    c.mapProgress = {};
    saveChar(c);
  }
  return c.mapProgress;
}

function getCurrentFloor(mapId) {
  const progress = getMapProgress();
  return progress[mapId] || 1;
}

function setNextFloor(mapId) {
  const c = loadChar();
  if (!c.mapProgress) c.mapProgress = {};
  c.mapProgress[mapId] = (c.mapProgress[mapId] || 1) + 1;
  saveChar(c);
}

/* =================================================
   KIỂM TRA MỞ MAP
================================================= */

function canEnterMap(map) {
  const c = loadChar();
  return c.realmIndex >= map.unlockRealm;
}

/* =================================================
   VÀO MAP
================================================= */

window.goMap = function (mapId) {
  const map = MAPS.find(m => m.id === mapId);
  if (!map) return;

  if (!canEnterMap(map)) {
    alert("❌ Cảnh giới chưa đủ để vào " + map.name);
    return;
  }

  const floor = getCurrentFloor(mapId);

  startBattle(mapId, floor);
};
