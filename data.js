/* ===== TIÊN THIÊN (50+) ===== */
const TIEN_THIEN_LIST = [
 "Thiên Mệnh Chi Tử","Ngộ Tính Tuyệt Luân","Khí Vận Gia Thân","Đệ Tử Thế Gia","Người Xuyên Không",
 "Cổ Tu Chuyển Thế","Linh Hồn Cường Đại","Thân Thể Cường Hãn","Chiến Đấu Cuồng Nhân","Tiên Cốt Manh Nha",
 "Kim Linh Thân","Mộc Linh Thân","Thủy Linh Thân","Hỏa Linh Thân","Thổ Linh Thân",
 "Phong Linh Chi Thể","Lôi Linh Chi Thể","Băng Linh Chi Thể","Âm Linh Chi Thể","Dương Linh Chi Thể",
 "Kiếm Đạo Thân Hòa","Đao Đạo Thân Hòa","Pháp Tu Thể Chất",
 "Đan Đạo Kỳ Tài","Phù Lục Kỳ Tài","Trận Pháp Kỳ Tài",
 "Ma Tâm Ẩn Tàng","Phật Tính Manh Nha","Yêu Huyết Thức Tỉnh",
 "Thiên Đạo Quan Chiếu","Luân Hồi Tàn Ảnh","Khuyết Linh Căn","Linh Căn Hỗn Tạp",
 "Thân Phận Bí Ẩn","Cơ Duyên Liên Miên","Đại Nạn Bất Tử","Tử Kiếp Tôi Luyện",
 "Hỗn Độn Manh Nha","Thần Bí Truyền Thừa","Thiên Ngoại Chi Hồn",
 "Cửu Kiếp Linh Thể","Đạo Tâm Kiên Định","Đạo Pháp Tương Hòa",
 "Võ Đạo Kỳ Tài","Chiến Ý Bất Diệt","Sát Phạt Quyết Đoán"
];

/* ===== LINH CĂN ===== */
const LINH_CAN_TYPES = [
 {name:"Đơn linh căn",speed:1.4,els:["Kim"]},
 {name:"Song linh căn",speed:1.2,els:["Kim","Hỏa"]},
 {name:"Tam linh căn",speed:1.0,els:["Kim","Mộc","Thủy"]},
 {name:"Tứ linh căn",speed:0.85,els:["Kim","Mộc","Thủy","Hỏa"]},
 {name:"Ngũ hành linh căn",speed:0.7,els:["Kim","Mộc","Thủy","Hỏa","Thổ"]}
];

/* ===== CÔNG PHÁP (TỰ SINH ~120) ===== */
const CONG_PHAP_LIST=[];
["Hoàng","Huyền","Địa","Thiên"].forEach((tier,i)=>{
 ["Hạ","Trung","Thượng","Cực"].forEach((grade,j)=>{
  ["Kim","Mộc","Thủy","Hỏa","Thổ","Phong","Lôi","Băng","Âm","Dương"].forEach(el=>{
   CONG_PHAP_LIST.push({
    name:`${el} Linh ${tier} ${grade} Quyết`,
    el, tier, grade,
    mult:1+i*0.4+j*0.15
   });
  });
 });
});

/* ===== VÕ KỸ (100+) ===== */
const VO_KY_LIST=[];
["Kim","Mộc","Thủy","Hỏa","Thổ","Phong","Lôi","Băng","Âm","Dương"].forEach(el=>{
 for(let i=1;i<=10;i++){
  VO_KY_LIST.push({
   name:`${el} Ảnh Kích · Tầng ${i}`,
   el,
   dmg:8+i*6
  });
 }
});

/* ===== BẢN ĐỒ ===== */
const MAPS = [
 {name:"Thanh Vân Sơn",danger:1},
 {name:"Huyết Thú Lâm",danger:2},
 {name:"Lôi Trạch",danger:3}
];
