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
