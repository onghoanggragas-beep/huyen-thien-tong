/* ===== NGŨ HÀNH & DỊ ===== */
const ELEMENTS = ["Kim","Mộc","Thủy","Hỏa","Thổ"];
const SPECIAL_ELEMENTS = ["Lôi","Băng","Phong","Quang","Ám"];

const ELEMENT_INFO = {
  Kim: {
    desc: "Sắc bén, cứng rắn, thiên về công kích vật lý và kiếm đạo",
    bonus: { damage: 0.1 }
  },
  Mộc: {
    desc: "Sinh trưởng, hồi phục, thích hợp trị liệu và trường kỳ",
    bonus: { regen: 0.05 }
  },
  Thủy: {
    desc: "Nhu hòa, liên miên, giỏi phòng thủ và khống chế",
    bonus: { defense: 0.1 }
  },
  Hỏa: {
    desc: "Cuồng bạo, bộc phát, sát thương cao nhưng khó kiểm soát",
    bonus: { damage: 0.15 }
  },
  Thổ: {
    desc: "Ổn định, vững chắc, tăng sinh tồn và phòng ngự",
    bonus: { hp: 0.15 }
  },
  Lôi: {
    desc: "Dị linh căn hiếm, tốc độ nhanh, sát thương cực cao",
    bonus: { damage: 0.25 }
  },
  Băng: {
    desc: "Biến dị từ Thủy, thiên về khống chế và đóng băng",
    bonus: { control: 0.2 }
  },
  Phong: {
    desc: "Nhanh nhẹn, linh hoạt, giảm cooldown kỹ năng",
    bonus: { cooldown: 0.15 }
  },
  Quang: {
    desc: "Thanh khiết, chính đạo, khắc chế tà tu",
    bonus: { holy: 0.2 }
  },
  Ám: {
    desc: "Âm u, tà dị, hút sinh mệnh và nguyền rủa",
    bonus: { lifesteal: 0.15 }
  }
};

/* ===== LOẠI LINH CĂN ===== */
const ROOT_TYPES = [
  {
    type: "single",
    name: "Đơn linh căn",
    count: 1,
    speed: 1.3,
    desc: "Thiên phú cực cao, được các đại tông môn tranh đoạt"
  },
  {
    type: "dual",
    name: "Song linh căn",
    count: 2,
    speed: 1.1,
    desc: "Tư chất tốt, có thể tu luyện nhiều công pháp"
  },
  {
    type: "triple",
    name: "Tam linh căn",
    count: 3,
    speed: 0.9,
    desc: "Tư chất phổ thông, cần cơ duyên bù đắp"
  },
  {
    type: "quad",
    name: "Tứ linh căn",
    count: 4,
    speed: 0.75,
    desc: "Tu luyện khó khăn, nhưng đường đi đa dạng"
  },
  {
    type: "five",
    name: "Ngũ hành linh căn",
    count: 5,
    speed: 0.6,
    desc: "Ngũ hành đầy đủ, có thể diễn hóa đại đạo"
  },
  {
    type: "special",
    name: "Dị linh căn",
    count: 1,
    speed: 1.4,
    desc: "Linh căn biến dị hiếm có, uy lực vượt quy tắc"
  }
];

function rollSpiritRoot() {
  let r = Math.random(), t;
  if (r < 0.4) t = ROOT_TYPES[2];
  else if (r < 0.6) t = ROOT_TYPES[1];
  else if (r < 0.75) t = ROOT_TYPES[0];
  else if (r < 0.9) t = ROOT_TYPES[3];
  else if (r < 0.97) t = ROOT_TYPES[4];
  else t = ROOT_TYPES[5];

  let elements = [];
  if (t.type === "special") {
    elements.push(SPECIAL_ELEMENTS[Math.floor(Math.random() * SPECIAL_ELEMENTS.length)]);
  } else {
    let pool = [...ELEMENTS];
    while (elements.length < t.count) {
      elements.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
  }

  return {
    type: t.type,
    typeName: t.name,
    elements,
    speed: t.speed,
    desc: t.desc,
    elementInfo: elements.map(e => ELEMENT_INFO[e])
  };
}const TALENTS = [
  {
    id: 1,
    name: "Thiên Linh Thể",
    grade: "Tiên",
    group: "Tu luyện",
    desc: "Linh khí tự động hội tụ quanh thân, tu luyện như uống nước",
    effect: { cultivation: 0.35 }
  },
  {
    id: 2,
    name: "Đạo Tâm Kiên Định",
    grade: "Cực",
    group: "Tu luyện",
    desc: "Đạo tâm vững chắc, đột phá ít khi thất bại",
    effect: { break: 0.2 }
  },
  {
    id: 3,
    name: "Khí Vận Chi Tử",
    grade: "Tiên",
    group: "Vận mệnh",
    desc: "Được thiên đạo chiếu cố, dễ gặp cơ duyên",
    effect: { drop: 0.3 }
  },
  {
    id: 4,
    name: "Chiến Thần Chuyển Thế",
    grade: "Thượng",
    group: "Chiến đấu",
    desc: "Bản năng chiến đấu khắc sâu trong huyết mạch",
    effect: { damage: 0.25 }
  },
  {
    id: 5,
    name: "Khí Hải Rộng Lớn",
    grade: "Trung",
    group: "Tu luyện",
    desc: "Khí hải lớn hơn người thường, chứa được nhiều linh khí",
    effect: { maxQi: 0.2 }
  },
  {
    id: 6,
    name: "Ngộ Tính Tuyệt Đỉnh",
    grade: "Cực",
    group: "Tu luyện",
    desc: "Học công pháp nhanh, giảm thời gian tu luyện",
    effect: { cultivation: 0.25 }
  },
  {
    id: 7,
    name: "Sinh Mệnh Dồi Dào",
    grade: "Trung",
    group: "Sinh tồn",
    desc: "Sinh lực mạnh mẽ, hồi phục theo thời gian",
    effect: { regen: 0.05 }
  },
  {
    id: 8,
    name: "Thiên Mệnh Gia Hộ",
    grade: "Tiên",
    group: "Vận mệnh",
    desc: "Khi đối mặt nguy hiểm có khả năng tránh khỏi tai kiếp",
    effect: { break: 0.25 }
  },
  // … bạn có thể tiếp tục thêm dễ dàng
];const TECHNIQUES = [
  {
    id: 1,
    name: "Ngũ Hành Luân Chuyển Quyết",
    tier: "Thiên",
    grade: "Thượng",
    required: ["Kim","Mộc","Thủy","Hỏa","Thổ"],
    bonus: 0.4,
    desc: "Dẫn động ngũ hành tương sinh, chỉ người có đủ ngũ hành mới tu luyện được"
  },
  {
    id: 2,
    name: "Lôi Đình Tôi Thể Công",
    tier: "Địa",
    grade: "Cực",
    required: ["Lôi"],
    bonus: 0.3,
    desc: "Dùng lôi đình rèn thân, mỗi bước đều như chịu thiên phạt"
  },
  {
    id: 3,
    name: "Băng Tâm Thanh Khiết Quyết",
    tier: "Huyền",
    grade: "Thượng",
    required: ["Băng","Thủy"],
    bonus: 0.25,
    desc: "Giữ tâm như băng, không bị tâm ma quấy nhiễu"
  }
  // … mở rộng 40–50 rất dễ
];const SKILLS = [
  {
    id: 1,
    name: "Lôi Đình Nhất Kích",
    element: "Lôi",
    damage: 1.8,
    effect: "Choáng",
    desc: "Triệu hồi lôi đình đánh thẳng vào kẻ địch",
    cooldown: 8,
    animation: "thunder_strike"
  },
  {
    id: 2,
    name: "Băng Phong Vạn Lý",
    element: "Băng",
    damage: 1.5,
    effect: "Đóng băng",
    desc: "Đóng băng khu vực lớn, hạn chế hành động địch",
    cooldown: 10,
    animation: "ice_seal"
  },
  {
    id: 3,
    name: "Hỏa Long Xuất Thế",
    element: "Hỏa",
    damage: 2.0,
    effect: "Thiêu đốt",
    desc: "Hỏa long gầm thét, gây sát thương liên tục",
    cooldown: 12,
    animation: "fire_dragon"
  }
];const REALMS = [
  { name: "Luyện Khí", maxQi: 100, stages: 9, desc: "Bước đầu tu hành" },
  { name: "Trúc Cơ", maxQi: 300, stages: 1, desc: "Đặt nền móng đại đạo" },
  { name: "Kim Đan", maxQi: 800, stages: 1, desc: "Ngưng tụ kim đan" },
  { name: "Nguyên Anh", maxQi: 2000, stages: 1, desc: "Sinh ra nguyên anh" }
];
