/* =====================================================
   DATA GỐC – LINH CĂN / TIÊN THIÊN / CẢNH GIỚI
   (KHÔNG LOGIC – KHÔNG DOM)
===================================================== */

/* ================= CẢNH GIỚI ================= */

const REALMS = [
  {
    id: 0,
    name: "Luyện Khí",
    maxStage: 9,
    maxQi: 100
  },
  {
    id: 1,
    name: "Trúc Cơ",
    maxStage: 9,
    maxQi: 300
  },
  {
    id: 2,
    name: "Kim Đan",
    maxStage: 9,
    maxQi: 800
  }
];

/* ================= LINH CĂN ================= */

const SPIRIT_ROOTS = [
  {
    id: 1,
    name: "Đơn linh căn (Kim)",
    type: "Đơn",
    elements: ["Kim"],
    speed: 1.3,
    desc: "Linh căn tinh thuần, tu luyện nhanh"
  },
  {
    id: 2,
    name: "Đơn linh căn (Mộc)",
    type: "Đơn",
    elements: ["Mộc"],
    speed: 1.3,
    desc: "Sinh cơ dồi dào, hồi phục mạnh"
  },
  {
    id: 3,
    name: "Song linh căn (Kim – Hỏa)",
    type: "Song",
    elements: ["Kim", "Hỏa"],
    speed: 1.1,
    desc: "Hai hệ dung hợp, cân bằng công – thủ"
  },
  {
    id: 4,
    name: "Tam linh căn",
    type: "Tam",
    elements: ["Kim", "Mộc", "Thủy"],
    speed: 1.0,
    desc: "Đa dạng linh lực, học được nhiều công pháp"
  },
  {
    id: 5,
    name: "Ngũ hành linh căn",
    type: "Ngũ",
    elements: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
    speed: 0.8,
    desc: "Toàn diện nhưng tu luyện chậm"
  }
];

/* ================= TIÊN THIÊN ================= */

const TALENTS = [
  {
    id: 1,
    name: "Căn Cốt Siêu Phàm",
    grade: "Thượng",
    desc: "Căn cơ vượt trội, tăng toàn bộ chỉ số",
    effect: {
      statPercent: 0.1
    }
  },
  {
    id: 2,
    name: "Sinh Mệnh Dồi Dào",
    grade: "Trung",
    desc: "Sinh lực mạnh mẽ, tăng HP",
    effect: {
      hpPercent: 0.2
    }
  },
  {
    id: 3,
    name: "Thiên Đạo Chiếu Cố",
    grade: "Cực",
    desc: "Tu luyện nhanh hơn người thường",
    effect: {
      cultivateRate: 0.3
    }
  },
  {
    id: 4,
    name: "Khí Vận Gia Thân",
    grade: "Thượng",
    desc: "Khí vận tăng cao, tu luyện thuận lợi",
    effect: {
      cultivateRate: 0.15
    }
  },
  {
    id: 5,
    name: "Chiến Ý Bất Diệt",
    grade: "Trung",
    desc: "Chiến đấu càng mạnh, tăng ATK",
    effect: {
      atkPercent: 0.2
    }
  },
  {
    id: 6,
    name: "Tâm Cảnh Vững Vàng",
    grade: "Hạ",
    desc: "Tinh thần ổn định, tăng DEF",
    effect: {
      defPercent: 0.2
    }
  }
];

/* ================= HÀM HỖ TRỢ ================= */

function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMany(arr, count) {
  const copy = [...arr];
  copy.sort(() => 0.5 - Math.random());
  return copy.slice(0, count);
      }
/* ================= CÔNG PHÁP ================= */

const CULTIVATION_METHODS = [
  {
    id: 1,
    name: "Ngũ Hành Dẫn Khí Quyết",
    tier: "Hoàng",
    grade: "Hạ",
    elements: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
    cultivateRate: 0.15,
    desc: "Công pháp nhập môn, dẫn dắt linh khí ngũ hành"
  },
  {
    id: 2,
    name: "Kim Linh Quyết",
    tier: "Hoàng",
    grade: "Trung",
    elements: ["Kim"],
    cultivateRate: 0.25,
    desc: "Tu luyện kim linh khí, tăng tốc hấp thu"
  },
  {
    id: 3,
    name: "Mộc Linh Trường Sinh Công",
    tier: "Huyền",
    grade: "Hạ",
    elements: ["Mộc"],
    cultivateRate: 0.35,
    desc: "Công pháp mộc hệ, sinh cơ bền bỉ"
  },
  {
    id: 4,
    name: "Ngũ Hành Quy Nguyên Công",
    tier: "Địa",
    grade: "Thượng",
    elements: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
    cultivateRate: 0.5,
    desc: "Ngũ hành hợp nhất, căn cơ vững chắc"
  },
  {
    id: 5,
    name: "Thiên Đạo Luân Hồi Kinh",
    tier: "Thiên",
    grade: "Cực",
    elements: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
    cultivateRate: 0.8,
    desc: "Công pháp tối thượng, thuận theo thiên đạo"
  }
];
const MAPS = {
  1: {
    id: 1,
    name: "Linh Sơn",
    desc: "Linh khí dồi dào, quái vật yếu",
    danger: "Thấp"
  },
  2: {
    id: 2,
    name: "Hỏa Vực",
    desc: "Hỏa linh hoành hành, nguy hiểm",
    danger: "Trung"
  },
  3: {
    id: 3,
    name: "Băng Nguyên",
    desc: "Hàn khí ăn mòn, cực kỳ nguy hiểm",
    danger: "Cao"
  }
};
