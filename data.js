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
   const TIEN_THIEN = [
/* ======================
   NHÓM VẬN MỆNH – KỲ NGỘ
====================== */
{
  id:"thien_menh_chi_tu",
  name:"Thiên Mệnh Chi Tử",
  pham:"tien",
  description:"Được thiên đạo chú ý, mọi con đường tu luyện đều thuận lợi.",
  effects:{ cultivate_speed:0.5, breakthrough_rate:0.3, drop_bonus:0.25 }
},
{
  id:"thien_dao_uu_ai",
  name:"Thiên Đạo Ưu Ái",
  pham:"cuc",
  description:"Luôn được thiên đạo che chở trong thời khắc quan trọng.",
  effects:{ death_avoid:0.15, crit_resist:0.2 }
},
{
  id:"co_tien_truyen_thua",
  name:"Cổ Tiên Truyền Thừa",
  pham:"tien",
  description:"Nhận được ký ức tu luyện của cổ tiên.",
  effects:{ learn_cong_phap_bonus:0.4, cultivate_speed:0.2 }
},
{
  id:"nguoi_xuyen_khong",
  name:"Người Xuyên Không",
  pham:"thuong",
  description:"Mang tư duy và tri thức ngoài thế giới này.",
  effects:{ exp_gain:0.2, cultivate_speed:0.2 }
},
{
  id:"dai_khi_van",
  name:"Đại Khí Vận",
  pham:"cuc",
  description:"Khí vận hưng thịnh, kỳ ngộ thường xuyên xuất hiện.",
  effects:{ rare_event_rate:0.35, drop_bonus:0.3 }
},

/* ======================
   NHÓM TU LUYỆN
====================== */
{
  id:"dao_tam_kien_dinh",
  name:"Đạo Tâm Kiên Định",
  pham:"trung",
  description:"Tâm cảnh vững vàng, ít khi tẩu hỏa nhập ma.",
  effects:{ cultivate_stability:0.4 }
},
{
  id:"linh_khi_than_hoa",
  name:"Linh Khí Thân Hòa",
  pham:"thuong",
  description:"Cơ thể dễ dàng hấp thụ linh khí.",
  effects:{ cultivate_speed:0.25 }
},
{
  id:"hon_luc_cuong_dai",
  name:"Hồn Lực Cường Đại",
  pham:"thuong",
  description:"Hồn lực mạnh mẽ, pháp thuật uy lực cao.",
  effects:{ mana:0.3, skill_damage:0.15 }
},
{
  id:"bat_tu_the",
  name:"Bất Tử Thể",
  pham:"cuc",
  description:"Sinh mệnh lực cực kỳ dồi dào.",
  effects:{ hp:0.5, regen:0.1 }
},
{
  id:"tinh_huyet_vuong_thinh",
  name:"Tinh Huyết Vượng Thịnh",
  pham:"trung",
  description:"Khí huyết dồi dào, thân thể cường tráng.",
  effects:{ atk:0.15, hp:0.2 }
},

/* ======================
   NHÓM CHIẾN ĐẤU
====================== */
{
  id:"kiem_dao_than_hoa",
  name:"Kiếm Đạo Thân Hòa",
  pham:"cuc",
  description:"Thiên phú kiếm đạo cực cao.",
  effects:{ atk:0.3, vo_ky_bonus:{ kim:0.25 } }
},
{
  id:"chien_y_bat_diet",
  name:"Chiến Ý Bất Diệt",
  pham:"thuong",
  description:"Càng chiến đấu càng trở nên mạnh mẽ.",
  effects:{ atk_per_missing_hp:0.25 }
},
{
  id:"sat_tam_lanh_le",
  name:"Sát Tâm Lạnh Lẽo",
  pham:"trung",
  description:"Ra tay tàn nhẫn, chí mạng cao.",
  effects:{ crit_rate:0.15, crit_damage:0.2 }
},
{
  id:"phap_than_so_sinh",
  name:"Pháp Thân Sơ Sinh",
  pham:"thuong",
  description:"Pháp lực dồi dào hơn người thường.",
  effects:{ skill_damage:0.25 }
},
{
  id:"than_the_cuong_hoa",
  name:"Thân Thể Cường Hóa",
  pham:"trung",
  description:"Thân thể tôi luyện vượt trội.",
  effects:{ def:0.25, damage_reduce:0.1 }
},

/* ======================
   NHÓM SINH TỒN – TIỆN ÍCH
====================== */
{
  id:"thien_nhan",
  name:"Thiên Nhãn",
  pham:"thuong",
  description:"Có thể nhìn thấu nguy hiểm tiềm ẩn.",
  effects:{ dodge:0.15, trap_resist:0.3 }
},
{
  id:"linh_giac_sac_be",
  name:"Linh Giác Sắc Bén",
  pham:"trung",
  description:"Cảm nhận nguy hiểm sớm hơn.",
  effects:{ first_strike:0.2 }
},
{
  id:"van_kiem_bat_xam",
  name:"Vạn Kiếp Bất Xâm",
  pham:"cuc",
  description:"Khả năng kháng dị thường cực cao.",
  effects:{ status_resist:0.35 }
},
{
  id:"thien_sinh_luyen_dan",
  name:"Thiên Sinh Luyện Đan",
  pham:"thuong",
  description:"Có thiên phú luyện đan.",
  effects:{ alchemy_success:0.3 }
},
{
  id:"thien_sinh_luyen_khi",
  name:"Thiên Sinh Luyện Khí",
  pham:"thuong",
  description:"Có thiên phú luyện khí.",
  effects:{ forge_success:0.3 }
}

/* ===== Tổng ~70 tiên thiên (các nhóm còn lại sẽ mở rộng thêm cùng chuẩn) ===== */
];const CONG_PHAP = [

/* =========================
   HOÀNG GIAI (CƠ BẢN)
========================= */
{
  id:"hoang_hoa_kinh",
  name:"Hoàng Hỏa Kinh",
  cap:"hoang",
  pham:"trung",
  linh_can:["hoa"],
  description:"Công pháp nhập môn hỏa hệ, tăng nhiệt huyết và công kích.",
  cultivate_bonus:{ speed:0.1, exp_gain:0.1 },
  passive:{ atk:0.1 },
  requirements:{ min_stage:1 }
},
{
  id:"thuy_linh_quyet",
  name:"Thủy Linh Quyết",
  cap:"hoang",
  pham:"trung",
  linh_can:["thuy"],
  description:"Công pháp thủy hệ nhập môn, linh khí vận hành trơn tru.",
  cultivate_bonus:{ speed:0.1 },
  passive:{ mana:0.15 },
  requirements:{ min_stage:1 }
},
{
  id:"kim_can_co_the",
  name:"Kim Cân Cổ Thể",
  cap:"hoang",
  pham:"thuong",
  linh_can:["kim","tho"],
  description:"Rèn luyện thân thể cứng cáp.",
  cultivate_bonus:{ def:0.15 },
  passive:{ hp:0.1 },
  requirements:{ min_stage:1 }
},

/* =========================
   HUYỀN GIAI
========================= */
{
  id:"huyen_bang_tam_phap",
  name:"Huyền Băng Tâm Pháp",
  cap:"huyen",
  pham:"thuong",
  linh_can:["bang"],
  description:"Lấy băng tâm trấn áp linh lực, giảm tiêu hao.",
  cultivate_bonus:{ speed:0.15, exp_gain:0.1 },
  passive:{ control:0.15 },
  requirements:{ min_stage:2 }
},
{
  id:"phong_hanh_quyet",
  name:"Phong Hành Quyết",
  cap:"huyen",
  pham:"trung",
  linh_can:["phong"],
  description:"Linh lực vận hành như gió, thân pháp nhẹ nhàng.",
  cultivate_bonus:{ speed:0.2 },
  passive:{ dodge:0.2 },
  requirements:{ min_stage:2 }
},
{
  id:"kim_cuong_ho_phap",
  name:"Kim Cương Hộ Pháp",
  cap:"huyen",
  pham:"thuong",
  linh_can:["kim","tho"],
  description:"Thân thể như kim cương, phòng ngự tăng mạnh.",
  cultivate_bonus:{ def:0.3 },
  passive:{ damage_reduce:0.15 },
  requirements:{ min_stage:2 }
},

/* =========================
   ĐỊA GIAI
========================= */
{
  id:"van_moc_truong_sinh_kinh",
  name:"Vạn Mộc Trường Sinh Kinh",
  cap:"dia",
  pham:"cuc",
  linh_can:["moc"],
  description:"Công pháp sinh mệnh thượng cổ, kéo dài thọ nguyên.",
  cultivate_bonus:{ speed:0.15, hp:0.4 },
  passive:{ regen:0.1 },
  requirements:{ min_stage:3 }
},
{
  id:"dia_nguc_hoa_cong",
  name:"Địa Ngục Hỏa Công",
  cap:"dia",
  pham:"thuong",
  linh_can:["hoa","am"],
  description:"Hỏa diễm mang theo khí tức hủy diệt.",
  cultivate_bonus:{ speed:0.2 },
  passive:{ crit_damage:0.35 },
  requirements:{ min_stage:4 }
},
{
  id:"thuy_long_ba_the",
  name:"Thủy Long Bá Thể",
  cap:"dia",
  pham:"thuong",
  linh_can:["thuy"],
  description:"Lấy thủy hóa long, thân thể cường hóa.",
  cultivate_bonus:{ hp:0.25 },
  passive:{ atk:0.15 },
  requirements:{ min_stage:4 }
},

/* =========================
   THIÊN GIAI
========================= */
{
  id:"loi_thien_kinh",
  name:"Lôi Thiên Kinh",
  cap:"thien",
  pham:"thuong",
  linh_can:["loi"],
  description:"Dẫn lôi lực thiên địa nhập thể, tôi luyện kinh mạch.",
  cultivate_bonus:{ speed:0.35, exp_gain:0.25 },
  passive:{ crit_damage:0.3 },
  requirements:{ min_stage:5 }
},
{
  id:"thien_kiem_dao_kinh",
  name:"Thiên Kiếm Đạo Kinh",
  cap:"thien",
  pham:"cuc",
  linh_can:["kim"],
  description:"Kiếm ý thông thiên, mỗi chiêu đều mang kiếm đạo.",
  cultivate_bonus:{ atk:0.3 },
  passive:{ vo_ky_bonus:{ kim:0.3 } },
  requirements:{ min_stage:6 }
},
{
  id:"hon_nguyen_dao_kinh",
  name:"Hỗn Nguyên Đạo Kinh",
  cap:"thien",
  pham:"tien",
  linh_can:["kim","moc","thuy","hoa","tho"],
  description:"Công pháp tối cao dung hợp ngũ hành.",
  cultivate_bonus:{ speed:0.4, exp_gain:0.3 },
  passive:{ all_stats:0.2 },
  requirements:{ min_stage:7 }
},
{
  id:"thien_am_ma_cong",
  name:"Thiên Âm Ma Công",
  cap:"thien",
  pham:"cuc",
  linh_can:["am"],
  description:"Ma công thượng cổ, sức mạnh lớn nhưng nguy hiểm.",
  cultivate_bonus:{ speed:0.3 },
  passive:{ crit_damage:0.5, hp_penalty:-0.2 },
  requirements:{ min_stage:6 }
},
{
  id:"quang_minh_thanh_phap",
  name:"Quang Minh Thánh Pháp",
  cap:"thien",
  pham:"cuc",
  linh_can:["quang"],
  description:"Công pháp thánh khiết, khắc chế tà ma.",
  cultivate_bonus:{ speed:0.25 },
  passive:{ damage_vs_dark:0.5, heal_bonus:0.3 },
  requirements:{ min_stage:6 }
}

/* ===== Tổng ~80 công pháp (mở rộng cùng chuẩn này) ===== */
];const VO_KY = [

/* =========================
   KIM HỆ (KIẾM / VẬT LÝ)
========================= */
{ id:"kim_kiem_tram", name:"Kim Kiếm Trảm", linh_can:["kim"],
  description:"Chém kiếm sắc bén, xuyên giáp nhẹ.",
  damage_multiplier:1.3, effects:{ armor_pierce:0.15 },
  animation:"slash_gold", cooldown:2 },

{ id:"kim_kiem_vu", name:"Kim Kiếm Vũ", linh_can:["kim"],
  description:"Liên hoàn kiếm khí, đánh nhiều lần.",
  damage_multiplier:1.6, effects:{ multi_hit:3 },
  animation:"slash_rain", cooldown:4 },

{ id:"kim_cuong_ho_the", name:"Kim Cương Hộ Thể", linh_can:["kim","tho"],
  description:"Ngưng tụ kim khí bảo hộ bản thân.",
  damage_multiplier:0.8, effects:{ shield:0.3 },
  animation:"golden_guard", cooldown:6 },

/* =========================
   MỘC HỆ (SINH MỆNH)
========================= */
{ id:"moc_truong_sinh_cham", name:"Trường Sinh Châm", linh_can:["moc"],
  description:"Mộc khí xuyên thấu, kèm hồi phục.",
  damage_multiplier:1.2, effects:{ heal_on_hit:0.15 },
  animation:"green_pierce", cooldown:3 },

{ id:"moc_phien_lac", name:"Mộc Phiến Lạc", linh_can:["moc"],
  description:"Lá mộc sắc bén bủa vây địch.",
  damage_multiplier:1.5, effects:{ bleed:0.2 },
  animation:"leaf_storm", cooldown:4 },

/* =========================
   THỦY HỆ (LINH HOẠT)
========================= */
{ id:"thuy_long_kich", name:"Thủy Long Kích", linh_can:["thuy"],
  description:"Thủy long quấn chặt, sát thương ổn định.",
  damage_multiplier:1.6, effects:{ slow:0.3 },
  animation:"water_dragon", cooldown:4 },

{ id:"thuy_luu_kich", name:"Thủy Lưu Kích", linh_can:["thuy"],
  description:"Dòng nước xoáy liên tục.",
  damage_multiplier:1.4, effects:{ multi_hit:2 },
  animation:"water_flow", cooldown:3 },

/* =========================
   HỎA HỆ (BẠO PHÁT)
========================= */
{ id:"hoa_cau_thuat", name:"Hỏa Cầu Thuật", linh_can:["hoa"],
  description:"Hỏa cầu nổ, gây bỏng.",
  damage_multiplier:1.5, effects:{ burn:0.3 },
  animation:"fireball", cooldown:3 },

{ id:"hoa_long_cuong_vu", name:"Hỏa Long Cuồng Vũ", linh_can:["hoa"],
  description:"Hỏa long tàn phá diện rộng.",
  damage_multiplier:2.0, effects:{ burn:0.4 },
  animation:"fire_dragon", cooldown:6 },

{ id:"dia_nguc_hoa_vu", name:"Địa Ngục Hỏa Vũ", linh_can:["hoa","am"],
  description:"Hỏa vũ mang khí tức hủy diệt.",
  damage_multiplier:2.3, effects:{ burn:0.5, self_hp_cost:0.05 },
  animation:"hell_fire", cooldown:8 },

/* =========================
   THỔ HỆ (PHÒNG NGỰ)
========================= */
{ id:"tho_thach_giap", name:"Thạch Giáp Thuật", linh_can:["tho"],
  description:"Đá hóa thân thể, tăng phòng ngự.",
  damage_multiplier:0.9, effects:{ def_up:0.4 },
  animation:"stone_guard", cooldown:6 },

{ id:"tho_bang_chan", name:"Thổ Băng Chấn", linh_can:["tho"],
  description:"Chấn động mặt đất, làm choáng.",
  damage_multiplier:1.4, effects:{ stun_chance:0.25 },
  animation:"earth_quake", cooldown:5 },

/* =========================
   LÔI HỆ (CHÍ MẠNG)
========================= */
{ id:"loi_kich", name:"Lôi Kích", linh_can:["loi"],
  description:"Tia sét đánh nhanh, chí mạng cao.",
  damage_multiplier:1.6, effects:{ crit_bonus:0.25 },
  animation:"lightning_strike", cooldown:3 },

{ id:"thien_loi_giang", name:"Thiên Lôi Giáng", linh_can:["loi"],
  description:"Thiên lôi giáng thế, choáng mạnh.",
  damage_multiplier:2.2, effects:{ stun_chance:0.2 },
  animation:"thunder_strike", cooldown:6 },

{ id:"loi_vuc_no", name:"Lôi Vực Nổ", linh_can:["loi"],
  description:"Bạo phát lôi vực diện rộng.",
  damage_multiplier:2.4, effects:{ crit_damage:0.4 },
  animation:"thunder_burst", cooldown:8 },

/* =========================
   BĂNG HỆ (KHỐNG CHẾ)
========================= */
{ id:"bang_phong", name:"Băng Phong", linh_can:["bang"],
  description:"Đóng băng mục tiêu trong chốc lát.",
  damage_multiplier:1.3, effects:{ freeze:0.25 },
  animation:"ice_freeze", cooldown:4 },

{ id:"han_bang_tram", name:"Hàn Băng Trảm", linh_can:["bang"],
  description:"Kiếm khí lạnh thấu xương.",
  damage_multiplier:1.6, effects:{ slow:0.4 },
  animation:"ice_slash", cooldown:4 },

/* =========================
   PHONG HỆ (TỐC ĐỘ)
========================= */
{ id:"phong_nhan", name:"Phong Nhận", linh_can:["phong"],
  description:"Phong nhận sắc bén, đánh nhanh.",
  damage_multiplier:1.4, effects:{ dodge_down:0.2 },
  animation:"wind_blade", cooldown:3 },

{ id:"phong_tieu", name:"Phong Tiêu", linh_can:["phong"],
  description:"Lốc xoáy cuốn kẻ địch.",
  damage_multiplier:1.8, effects:{ lift:0.2 },
  animation:"wind_tornado", cooldown:5 },

/* =========================
   QUANG HỆ (THÁNH)
========================= */
{ id:"quang_min_chieu", name:"Quang Minh Chiếu", linh_can:["quang"],
  description:"Ánh sáng thanh tẩy, sát thương tà ma tăng.",
  damage_multiplier:1.5, effects:{ damage_vs_dark:0.4 },
  animation:"holy_light", cooldown:4 },

{ id:"thanh_quang_phan_xa", name:"Thánh Quang Phản Xạ", linh_can:["quang"],
  description:"Phản lại một phần sát thương.",
  damage_multiplier:1.0, effects:{ reflect:0.2 },
  animation:"holy_reflect", cooldown:6 },

/* =========================
   ÁM HỆ (NGUY HIỂM)
========================= */
{ id:"am_anh_truy_hon", name:"Ám Ảnh Truy Hồn", linh_can:["am"],
  description:"Đòn đánh bóng tối, hút sinh lực.",
  damage_multiplier:1.8, effects:{ life_steal:0.2 },
  animation:"dark_strike", cooldown:4 },

{ id:"ma_anh_phong", name:"Ma Ảnh Phong", linh_can:["am"],
  description:"Bóng tối bao trùm, tăng chí mạng.",
  damage_multiplier:2.0, effects:{ crit_rate:0.2 },
  animation:"dark_fog", cooldown:6 }

];/* =========================
   KIM HỆ – CAO CẤP
========================= */
{ id:"kim_thien_kiem_trao", name:"Thiên Kiếm Trảm Ảnh", linh_can:["kim"],
  description:"Kiếm ý hóa ảnh, chém liên hoàn.",
  damage_multiplier:2.1, effects:{ multi_hit:4, armor_pierce:0.25 },
  animation:"heaven_sword", cooldown:6 },

{ id:"kim_kiem_vuc_sat", name:"Kiếm Vực Sát", linh_can:["kim"],
  description:"Kiếm vực bao phủ, sát thương liên tục.",
  damage_multiplier:2.4, effects:{ dot:0.25 },
  animation:"sword_domain", cooldown:8 },

/* =========================
   MỘC HỆ – SINH TRƯỞNG
========================= */
{ id:"moc_sinh_menh_ket_gioi", name:"Sinh Mệnh Kết Giới", linh_can:["moc"],
  description:"Kết giới sinh mệnh, vừa đánh vừa hồi.",
  damage_multiplier:1.4, effects:{ heal_over_time:0.25 },
  animation:"life_barrier", cooldown:7 },

{ id:"moc_van_doc_tam", name:"Vạn Độc Tâm", linh_can:["moc","am"],
  description:"Mộc độc xâm nhập, sát thương theo thời gian.",
  damage_multiplier:1.8, effects:{ poison:0.4 },
  animation:"poison_vines", cooldown:6 },

/* =========================
   THỦY HỆ – CAO CẤP
========================= */
{ id:"thuy_thien_ha_vo_song", name:"Thiên Hà Vô Song", linh_can:["thuy"],
  description:"Thủy thế cuồn cuộn như thiên hà.",
  damage_multiplier:2.2, effects:{ slow:0.4, multi_hit:3 },
  animation:"galaxy_water", cooldown:7 },

{ id:"thuy_linh_bao_phong", name:"Linh Bão Phong", linh_can:["thuy","phong"],
  description:"Thủy – phong hợp kích, cuốn bay kẻ địch.",
  damage_multiplier:2.0, effects:{ lift:0.3 },
  animation:"water_tornado", cooldown:6 },

/* =========================
   HỎA HỆ – BẠO PHÁT CAO
========================= */
{ id:"hoa_thien_tinh_no", name:"Thiên Tinh Nổ", linh_can:["hoa"],
  description:"Hỏa tinh rơi từ trời, nổ cực mạnh.",
  damage_multiplier:2.6, effects:{ burn:0.5 },
  animation:"meteor_fire", cooldown:9 },

{ id:"hoa_phuong_hoang_niem", name:"Phượng Hoàng Niết Bàn", linh_can:["hoa"],
  description:"Hỏa phượng giáng lâm, vừa công vừa hồi.",
  damage_multiplier:2.2, effects:{ burn:0.4, self_heal:0.2 },
  animation:"phoenix_fire", cooldown:10 },

/* =========================
   THỔ HỆ – KHỐNG CHẾ
========================= */
{ id:"tho_dai_dia_tran_ap", name:"Đại Địa Trấn Áp", linh_can:["tho"],
  description:"Địa lực đè nén, làm choáng mạnh.",
  damage_multiplier:1.9, effects:{ stun_chance:0.35 },
  animation:"earth_suppression", cooldown:7 },

{ id:"tho_nguyen_thach_luu", name:"Nguyên Thạch Lưu", linh_can:["tho"],
  description:"Đá khổng lồ rơi từ không trung.",
  damage_multiplier:2.1, effects:{ armor_break:0.3 },
  animation:"rock_fall", cooldown:6 },

/* =========================
   LÔI HỆ – TỐI THƯỢNG
========================= */
{ id:"loi_thien_pha_diet", name:"Thiên Lôi Phá Diệt", linh_can:["loi"],
  description:"Lôi lực hủy diệt, sát thương cực lớn.",
  damage_multiplier:2.8, effects:{ crit_damage:0.5 },
  animation:"divine_thunder", cooldown:10 },

{ id:"loi_van_kiem_pha", name:"Lôi Vân Kiếm Phá", linh_can:["loi","kim"],
  description:"Kiếm dẫn lôi, chém xuyên mục tiêu.",
  damage_multiplier:2.4, effects:{ armor_pierce:0.35 },
  animation:"thunder_sword", cooldown:8 },

/* =========================
   BĂNG HỆ – ĐÓNG BĂNG CAO
========================= */
{ id:"bang_thien_phong_an", name:"Thiên Phong Ấn", linh_can:["bang"],
  description:"Phong ấn băng, khóa cứng kẻ địch.",
  damage_multiplier:1.7, effects:{ freeze:0.4 },
  animation:"ice_seal", cooldown:7 },

{ id:"han_vuc_dong_ket", name:"Hàn Vực Đóng Kết", linh_can:["bang"],
  description:"Hàn vực lan rộng, giảm mạnh tốc độ.",
  damage_multiplier:2.0, effects:{ slow:0.6 },
  animation:"frozen_domain", cooldown:8 },

/* =========================
   PHONG HỆ – SIÊU TỐC
========================= */
{ id:"phong_than_anh_bo", name:"Phong Thần Ảnh Bộ", linh_can:["phong"],
  description:"Thân pháp siêu tốc, né tránh cực cao.",
  damage_multiplier:1.3, effects:{ dodge_up:0.4 },
  animation:"wind_shadow", cooldown:5 },

{ id:"phong_bao_thien_kich", name:"Phong Bạo Thiên Kích", linh_can:["phong"],
  description:"Phong bạo bùng nổ diện rộng.",
  damage_multiplier:2.1, effects:{ multi_hit:4 },
  animation:"storm_blast", cooldown:7 },

/* =========================
   QUANG HỆ – THÁNH CẤP
========================= */
{ id:"quang_thanh_phan_quyet", name:"Thánh Phán Quyết", linh_can:["quang"],
  description:"Ánh sáng phán xét, khắc chế ma vật.",
  damage_multiplier:2.3, effects:{ damage_vs_dark:0.6 },
  animation:"holy_judgement", cooldown:8 },

{ id:"quang_nguyen_ho_the", name:"Nguyên Quang Hộ Thể", linh_can:["quang"],
  description:"Thánh quang bảo hộ, giảm sát thương.",
  damage_multiplier:1.0, effects:{ damage_reduce:0.3 },
  animation:"holy_shield", cooldown:7 },

/* =========================
   ÁM HỆ – CẤM KỴ
========================= */
{ id:"am_thien_ma_an", name:"Thiên Ma Ấn", linh_can:["am"],
  description:"Ma ấn xâm thực linh hồn.",
  damage_multiplier:2.5, effects:{ fear:0.3 },
  animation:"demon_mark", cooldown:9 },

{ id:"am_hon_thuc_tam", name:"Hồn Thực Tâm", linh_can:["am"],
  description:"Nuốt linh hồn đối thủ để hồi phục.",
  damage_multiplier:2.0, effects:{ life_steal:0.35 },
  animation:"soul_devour", cooldown:8 }
];const TRANG_BI = [

/* =========================
   VŨ KHÍ – KIẾM (KIM / LÔI)
========================= */
{
  id:"kim_phong_kiem",
  name:"Kim Phong Kiếm",
  slot:"weapon",
  rarity:"trung",
  description:"Thanh kiếm rèn từ kim linh khoáng, sắc bén ổn định.",
  stats:{ atk:18, crit_rate:0.05 },
  bonus:{ vo_ky_bonus:{ kim:0.1 } }
},
{
  id:"loi_than_kiem",
  name:"Lôi Thần Kiếm",
  slot:"weapon",
  rarity:"cuc",
  description:"Kiếm hấp thụ lôi lực thiên địa, mỗi nhát chém như sét giáng.",
  stats:{ atk:35, crit_rate:0.1 },
  bonus:{ linh_can_bonus:["loi"], vo_ky_bonus:{ loi:0.25 } }
},
{
  id:"thien_kiem",
  name:"Thiên Kiếm",
  slot:"weapon",
  rarity:"tien",
  description:"Danh kiếm thượng cổ, kiếm ý thông thiên.",
  stats:{ atk:55, crit_rate:0.15, crit_damage:0.25 },
  bonus:{ vo_ky_bonus:{ kim:0.4 }, damage_all:0.15 }
},

/* =========================
   VŨ KHÍ – PHÁP TRƯỢNG (HỎA / THỦY / QUANG)
========================= */
{
  id:"hoa_linh_truong",
  name:"Hỏa Linh Trượng",
  slot:"weapon",
  rarity:"thuong",
  description:"Pháp trượng hỏa hệ, tăng sát thương thiêu đốt.",
  stats:{ atk:22 },
  bonus:{ vo_ky_bonus:{ hoa:0.2 } }
},
{
  id:"thuy_nguyen_truong",
  name:"Thủy Nguyên Trượng",
  slot:"weapon",
  rarity:"cuc",
  description:"Trượng dẫn thủy linh, pháp thuật ổn định.",
  stats:{ atk:30, mana:80 },
  bonus:{ vo_ky_bonus:{ thuy:0.25 } }
},
{
  id:"quang_minh_thanh_truong",
  name:"Quang Minh Thánh Trượng",
  slot:"weapon",
  rarity:"tien",
  description:"Thánh khí quang minh, khắc chế tà ma.",
  stats:{ atk:45, heal_bonus:0.25 },
  bonus:{ damage_vs_dark:0.5 }
},

/* =========================
   GIÁP – THÂN THỂ
========================= */
{
  id:"thach_giap",
  name:"Thạch Giáp",
  slot:"armor",
  rarity:"trung",
  description:"Giáp đá nặng nề, tăng phòng ngự.",
  stats:{ hp:120, def:25 },
  bonus:{ damage_reduce:0.1 }
},
{
  id:"kim_cuong_giap",
  name:"Kim Cương Giáp",
  slot:"armor",
  rarity:"cuc",
  description:"Giáp cứng như kim cương, khó phá vỡ.",
  stats:{ hp:220, def:45 },
  bonus:{ damage_reduce:0.2 }
},
{
  id:"thien_moc_giap",
  name:"Thiên Mộc Giáp",
  slot:"armor",
  rarity:"thuong",
  description:"Giáp từ linh mộc cổ xưa, sinh cơ dồi dào.",
  stats:{ hp:180, def:20 },
  bonus:{ regen:0.05 }
},

/* =========================
   GIÀY – TỐC ĐỘ / NÉ TRÁNH
========================= */
{
  id:"phong_hanh_hai",
  name:"Phong Hành Hài",
  slot:"boots",
  rarity:"thuong",
  description:"Đôi hài nhẹ như gió.",
  stats:{ speed:0.15 },
  bonus:{ dodge:0.1 }
},
{
  id:"thien_phong_than_hai",
  name:"Thiên Phong Thần Hài",
  slot:"boots",
  rarity:"cuc",
  description:"Hài thần phong, di chuyển như ảo ảnh.",
  stats:{ speed:0.25 },
  bonus:{ dodge:0.2 }
},

/* =========================
   PHỤ KIỆN – NGỌC / PHÙ
========================= */
{
  id:"bang_tam_ngoc_phu",
  name:"Băng Tâm Ngọc Phù",
  slot:"accessory",
  rarity:"cuc",
  description:"Ngọc phù giữ tâm cảnh lạnh lẽo.",
  stats:{ mana:100 },
  bonus:{ resist_fire:0.3 }
},
{
  id:"loi_hon_ngoc",
  name:"Lôi Hồn Ngọc",
  slot:"accessory",
  rarity:"thuong",
  description:"Ngọc tích tụ lôi lực.",
  stats:{ crit_rate:0.08 },
  bonus:{ vo_ky_bonus:{ loi:0.15 } }
},
{
  id:"thien_dao_phu",
  name:"Thiên Đạo Phù",
  slot:"accessory",
  rarity:"tien",
  description:"Phù văn do thiên đạo khắc họa.",
  stats:{ all_stats:0.15 },
  bonus:{ breakthrough_rate:0.2 }
},

/* =========================
   NHẪN – ĐẶC BIỆT
========================= */
{
  id:"ma_anh_gioi",
  name:"Ma Ảnh Giới",
  slot:"ring",
  rarity:"cuc",
  description:"Nhẫn hắc ám, tăng sức mạnh nhưng nguy hiểm.",
  stats:{ atk:20 },
  bonus:{ crit_damage:0.35, hp_penalty:-0.1 }
},
{
  id:"sinh_menh_gioi",
  name:"Sinh Mệnh Giới",
  slot:"ring",
  rarity:"thuong",
  description:"Nhẫn sinh mệnh, tăng hồi phục.",
  stats:{ hp:150 },
  bonus:{ regen:0.08 }
}

/* ===== Có thể mở rộng tiếp theo CÙNG CHUẨN để đạt ~100+ món ===== */
];

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
