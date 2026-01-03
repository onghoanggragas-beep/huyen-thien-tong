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
    desc: "Căn cơ vượt trội, tăng chỉ số cơ bản"
  },
  {
    id: 2,
    name: "Sinh Mệnh Dồi Dào",
    grade: "Trung",
    desc: "Sinh lực mạnh mẽ, tăng HP"
  },
  {
    id: 3,
    name: "Thiên Đạo Chiếu Cố",
    grade: "Cực",
    desc: "Được thiên đạo ưu ái, tu luyện nhanh"
  },
  {
    id: 4,
    name: "Khí Vận Gia Thân",
    grade: "Thượng",
    desc: "Vận may cao, dễ gặp kỳ ngộ"
  },
  {
    id: 5,
    name: "Chiến Ý Bất Diệt",
    grade: "Trung",
    desc: "Ý chí chiến đấu mạnh, tăng ATK"
  },
  {
    id: 6,
    name: "Tâm Cảnh Vững Vàng",
    grade: "Hạ",
    desc: "Tinh thần ổn định, giảm nguy cơ thất bại đột phá"
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
