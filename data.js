/* ===============================
   LINH CĂN
================================ */
const LINH_CAN_TYPES = [
  { id: "don", name: "Đơn linh căn", speed: 1.4, desc: "Tu luyện nhanh, hạn chế công pháp" },
  { id: "song", name: "Song linh căn", speed: 1.2, desc: "Cân bằng tu luyện" },
  { id: "tam", name: "Tam linh căn", speed: 1.0, desc: "Phổ thông" },
  { id: "tu", name: "Tứ linh căn", speed: 0.85, desc: "Tu luyện chậm, đa dạng" },
  { id: "ngu", name: "Ngũ hành linh căn", speed: 0.7, desc: "Tu luyện khó, học được mọi đạo" }
];

/* ===============================
   TIÊN THIÊN (50+)
================================ */
const TIEN_THIEN_LIST = [
  { name: "Thiên Mệnh Chi Tử", tier: "Tiên", mult: 1.25 },
  { name: "Ngộ Tính Tuyệt Luân", tier: "Cực", mult: 1.2 },
  { name: "Khí Vận Gia Thân", tier: "Thượng", mult: 1.15 },
  { name: "Người Xuyên Không", tier: "Thượng", mult: 1.12 },
  { name: "Tiên Cốt Manh Nha", tier: "Tiên", mult: 1.3 },
  { name: "Linh Hồn Cường Đại", tier: "Trung", mult: 1.1 },
  { name: "Chiến Ý Bất Diệt", tier: "Thượng", mult: 1.15 },
  { name: "Đạo Tâm Kiên Định", tier: "Trung", mult: 1.1 },
  { name: "Cổ Tu Chuyển Thế", tier: "Cực", mult: 1.18 },
  { name: "Thiên Đạo Quan Chiếu", tier: "Tiên", mult: 1.25 },

  { name: "Kim Linh Thân", tier: "Trung", mult: 1.05 },
  { name: "Mộc Linh Thân", tier: "Trung", mult: 1.05 },
  { name: "Thủy Linh Thân", tier: "Trung", mult: 1.05 },
  { name: "Hỏa Linh Thân", tier: "Trung", mult: 1.05 },
  { name: "Thổ Linh Thân", tier: "Trung", mult: 1.05 },

  { name: "Phong Linh Chi Thể", tier: "Thượng", mult: 1.1 },
  { name: "Lôi Linh Chi Thể", tier: "Cực", mult: 1.2 },
  { name: "Băng Linh Chi Thể", tier: "Thượng", mult: 1.1 },

  { name: "Ma Tâm Ẩn Tàng", tier: "Cực", mult: 1.18 },
  { name: "Phật Tính Manh Nha", tier: "Cực", mult: 1.18 },
  { name: "Yêu Huyết Thức Tỉnh", tier: "Cực", mult: 1.18 },

  { name: "Thân Phận Bí Ẩn", tier: "Trung", mult: 1.08 },
  { name: "Luân Hồi Tàn Ảnh", tier: "Cực", mult: 1.2 },
  { name: "Hỗn Độn Manh Nha", tier: "Tiên", mult: 1.35 },

  { name: "Võ Đạo Kỳ Tài", tier: "Thượng", mult: 1.12 },
  { name: "Pháp Tu Thể Chất", tier: "Trung", mult: 1.1 },
  { name: "Kiếm Đạo Thân Hòa", tier: "Thượng", mult: 1.15 },

  { name: "Đan Đạo Kỳ Tài", tier: "Trung", mult: 1.0 },
  { name: "Luyện Khí Kỳ Tài", tier: "Trung", mult: 1.0 },
  { name: "Trận Pháp Kỳ Tài", tier: "Trung", mult: 1.0 },

  { name: "Cơ Duyên Liên Miên", tier: "Thượng", mult: 1.12 },
  { name: "Đại Nạn Bất Tử", tier: "Cực", mult: 1.2 },
  { name: "Tử Kiếp Tôi Luyện", tier: "Cực", mult: 1.18 },

  { name: "Sát Phạt Quyết Đoán", tier: "Thượng", mult: 1.15 },
  { name: "Thiên Ngoại Chi Hồn", tier: "Tiên", mult: 1.3 }
];

/* ===============================
   VÕ KỸ (120+ TỰ SINH)
================================ */
const VO_KY_LIST = [];
const ELEMENTS = ["Kim","Mộc","Thủy","Hỏa","Thổ","Phong","Lôi","Băng","Âm","Dương"];

ELEMENTS.forEach(el=>{
  for(let i=1;i<=12;i++){
    VO_KY_LIST.push({
      name: `${el} Ảnh Kích · Tầng ${i}`,
      element: el,
      dmg: 10 + i*6,
      effect: el
    });
  }
});

/* ===============================
   TRANG BỊ
================================ */
const EQUIP_QUALITY = ["Hạ","Trung","Thượng","Cực","Tiên"];

const EQUIPMENT_LIST = [];
["Vũ khí","Pháp bảo","Giáp"].forEach(type=>{
  EQUIP_QUALITY.forEach((q,i)=>{
    EQUIPMENT_LIST.push({
      type,
      quality:q,
      atk: (i+1)*10,
      hp: (i+1)*30
    });
  });
});

/* ===============================
   STAGE + QUÁI + BOSS
================================ */
const STAGES = [];
for(let i=1;i<=50;i++){
  STAGES.push({
    id:i,
    enemyHP: 80 + i*25,
    enemyAtk: 8 + i*4,
    boss: i%10===0
  });
}

/* ===============================
   DROP TABLE
================================ */
const DROP_TABLE = {
  voKy: 0.4,
  equip: 0.3,
  tienThien: 0.05
};
