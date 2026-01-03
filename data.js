const REALMS = [
  { name: "Luyện Khí", maxStage: 9, maxQi: 100 },
  { name: "Trúc Cơ", maxStage: 9, maxQi: 300 }
];

const SPIRIT_ROOTS = [
  {
    typeName: "Đơn linh căn (Kim)",
    elements: ["Kim"],
    speed: 1.3
  },
  {
    typeName: "Ngũ hành linh căn",
    elements: ["Kim","Mộc","Thủy","Hỏa","Thổ"],
    speed: 0.8
  }
];

function rollSpiritRoot() {
  return SPIRIT_ROOTS[Math.floor(Math.random() * SPIRIT_ROOTS.length)];
}
/* ========== TIÊN THIÊN ========== */

const TALENTS = [
  {
    id: 1,
    name: "Căn Cốt Siêu Phàm",
    grade: "Thượng",
    desc: "Tăng chỉ số cơ bản",
    effect: "stat"
  },
  {
    id: 2,
    name: "Sinh Mệnh Dồi Dào",
    grade: "Trung",
    desc: "Tăng HP",
    effect: "hp"
  },
  {
    id: 3,
    name: "Thiên Đạo Chiếu Cố",
    grade: "Cực",
    desc: "Tăng tốc tu luyện",
    effect: "cultivate"
  },
  {
    id: 4,
    name: "Khí Vận Gia Thân",
    grade: "Thượng",
    desc: "Dễ gặp kỳ ngộ",
    effect: "luck"
  },
  {
    id: 5,
    name: "Chiến Ý Bất Diệt",
    grade: "Trung",
    desc: "Tăng ATK",
    effect: "atk"
  }
];
