const REALMS = [
  { name: "Luyện Khí", maxStage: 9, maxQi: 100 },
  { name: "Trúc Cơ", maxStage: 9, maxQi: 300 },
  { name: "Kim Đan", maxStage: 9, maxQi: 800 }
];

const SPIRIT_ROOTS = [
  {
    typeName: "Đơn linh căn (Kim)",
    elements: ["Kim"],
    speed: 1.3,
    desc: "Linh căn tinh thuần"
  },
  {
    typeName: "Ngũ hành linh căn",
    elements: ["Kim","Mộc","Thủy","Hỏa","Thổ"],
    speed: 0.8,
    desc: "Toàn diện nhưng chậm"
  }
];

const TALENTS = [
  { name: "Căn Cốt Siêu Phàm", grade: "Thượng", effect: "atk" },
  { name: "Sinh Mệnh Dồi Dào", grade: "Trung", effect: "hp" },
  { name: "Thiên Đạo Chiếu Cố", grade: "Cực", effect: "atk" }
];

function rollSpiritRoot(){
  return SPIRIT_ROOTS[Math.floor(Math.random()*SPIRIT_ROOTS.length)];
}
/* ================= CÔNG PHÁP ================= */

const CULTIVATION_METHODS = [
  {
    id: 1,
    name: "Ngũ Hành Quy Nguyên Công",
    tier: "Địa",
    rank: "Thượng",
    elements: ["Kim","Mộc","Thủy","Hỏa","Thổ"],
    cultivateBonus: 0.3,
    statBonus: { hp: 0.2 },
    desc: "Dung hợp ngũ hành, căn cơ vững chắc"
  },
  {
    id: 2,
    name: "Kim Linh Kiếm Quyết",
    tier: "Huyền",
    rank: "Thượng",
    elements: ["Kim"],
    cultivateBonus: 0.25,
    statBonus: { atk: 0.25 },
    desc: "Lấy kim linh làm chủ, công kích sắc bén"
  },
  {
    id: 3,
    name: "Hỏa Diễm Chân Kinh",
    tier: "Địa",
    rank: "Trung",
    elements: ["Hỏa"],
    cultivateBonus: 0.35,
    statBonus: { atk: 0.3 },
    desc: "Hỏa linh cuồng bạo, sát thương cao"
  },
  {
    id: 4,
    name: "Băng Tâm Quyết",
    tier: "Huyền",
    rank: "Cực",
    elements: ["Thủy","Băng"],
    cultivateBonus: 0.2,
    statBonus: { def: 0.3 },
    desc: "Tâm như băng, phòng ngự cực cao"
  }
];
