/* ===============================
   CẢNH GIỚI TU TIÊN
================================ */
const REALMS = [
  { id: 0, name: "Luyện Khí", max: 9 },
  { id: 1, name: "Trúc Cơ", max: 3 },
  { id: 2, name: "Kim Đan", max: 3 },
  { id: 3, name: "Nguyên Anh", max: 3 },
  { id: 4, name: "Hóa Thần", max: 3 },
  { id: 5, name: "Luyện Hư", max: 3 },
  { id: 6, name: "Hợp Thể", max: 3 },
  { id: 7, name: "Đại Thừa", max: 1 },
  { id: 8, name: "Độ Kiếp", max: 1 }
];

/* ===============================
   LINH CĂN
================================ */
const SPIRIT_ROOTS = [
  { id:"kim", name:"Kim", type:"Đơn linh căn", speed:1.5 },
  { id:"moc", name:"Mộc", type:"Đơn linh căn", speed:1.4 },
  { id:"thuy", name:"Thủy", type:"Đơn linh căn", speed:1.4 },
  { id:"hoa", name:"Hỏa", type:"Đơn linh căn", speed:1.6 },
  { id:"tho", name:"Thổ", type:"Đơn linh căn", speed:1.3 },

  { id:"song", name:"Song linh căn", type:"Song", speed:1.1 },
  { id:"tam", name:"Tam linh căn", type:"Tam", speed:0.9 },
  { id:"ngu", name:"Ngũ hành", type:"Ngũ", speed:0.7 },

  { id:"loi", name:"Lôi", type:"Dị", speed:1.7 },
  { id:"bang", name:"Băng", type:"Dị", speed:1.5 },
  { id:"am", name:"Ám", type:"Dị", speed:1.3 },
  { id:"quang", name:"Quang", type:"Dị", speed:1.4 }
];

/* ===============================
   TIÊN THIÊN (50+)
================================ */
const TALENTS = [
  { id:"thien_menh", name:"Thiên Mệnh Chi Tử", grade:"Tiên",
    effects:{ speed:0.8, breakthrough:0.4 } },

  { id:"xuyen_khong", name:"Người Xuyên Không", grade:"Tiên",
    effects:{ speed:0.6 } },

  { id:"co_tien", name:"Cổ Tiên Truyền Thừa", grade:"Tiên",
    effects:{ learn:0.4 } },

  { id:"khi_van", name:"Đại Khí Vận", grade:"Cực",
    effects:{ drop:0.3 } },

  { id:"linh_hon", name:"Linh Hồn Cường Đại", grade:"Thượng",
    effects:{ skill:0.25 } },

  { id:"dao_tam", name:"Đạo Tâm Kiên Định", grade:"Trung",
    effects:{ fail_reduce:0.3 } },

  { id:"bat_tu", name:"Bất Tử Thể", grade:"Cực",
    effects:{ hp:0.5 } },

  { id:"kiem_dao", name:"Kiếm Đạo Thân Hòa", grade:"Cực",
    effects:{ sword:0.3 } }
];

// tự sinh thêm tiên thiên cho đủ 50+
while (TALENTS.length < 50) {
  TALENTS.push({
    id:"rand_"+TALENTS.length,
    name:"Tiên Thiên "+TALENTS.length,
    grade:["Hạ","Trung","Thượng"][Math.floor(Math.random()*3)],
    effects:{ speed: Math.random()*0.2 }
  });
}

/* ===============================
   CÔNG PHÁP
================================ */
const METHODS = [
  { id:"hoa_kinh", name:"Hoàng Hỏa Kinh", grade:"Hoàng", root:["hoa"], speed:0.1 },
  { id:"thuy_quyet", name:"Thủy Linh Quyết", grade:"Hoàng", root:["thuy"], speed:0.1 },
  { id:"loi_kinh", name:"Lôi Thiên Kinh", grade:"Thiên", root:["loi"], speed:0.35 },
  { id:"hon_nguyen", name:"Hỗn Nguyên Đạo Kinh", grade:"Thiên", root:["kim","moc","thuy","hoa","tho"], speed:0.4 }
];

/* ===============================
   VÕ KỸ
================================ */
const SKILLS = [
  { id:"hoa_cau", name:"Hỏa Cầu", root:["hoa"], dmg:1.5 },
  { id:"loi_kich", name:"Lôi Kích", root:["loi"], dmg:1.7 },
  { id:"bang_phong", name:"Băng Phong", root:["bang"], dmg:1.4 },
  { id:"kiem_tram", name:"Kiếm Trảm", root:["kim"], dmg:1.6 }
];

/* ===============================
   QUÁI + DROP
================================ */
const STAGES = Array.from({length:50},(_,i)=>({
  id:i+1,
  hp:80+i*30,
  atk:10+i*4,
  boss:(i+1)%10===0
}));

/* ===============================
   HÀM ROLL
================================ */
function rollSpiritRoot(){
  return SPIRIT_ROOTS[Math.floor(Math.random()*SPIRIT_ROOTS.length)];
}

function rollTalents(){
  return [...TALENTS].sort(()=>0.5-Math.random()).slice(0,5);
   }
