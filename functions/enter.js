const TIEN_THIENS = [
  "Thiên Mệnh Chi Tử","Khí Vận Gia Thân","Đại Nạn Bất Tử","Cơ Duyên Liên Miên","Mệnh Cách Kỳ Dị",
  "Đệ Tử Thế Gia","Hậu Duệ Đại Năng","Hoàng Thất Huyết Mạch","Tông Môn Con Cháu","Người Xuyên Không",
  "Ngộ Tính Tuyệt Luân","Tâm Cảnh Kiên Định","Thần Hồn Cường Đại","Ý Chí Bất Khuất","Lãnh Tĩnh Tuyệt Đối",
  "Chiến Đấu Cuồng Nhân","Thân Thể Cường Hãn","Sát Phạt Quyết Đoán","Huyết Chiến Thể","Bất Diệt Thể Phách",
  "Tiên Thiên Đạo Thể","Hỗn Độn Linh Thể","Cổ Thần Huyết Mạch","Luân Hồi Chi Nhãn","Thiên Phú Dị Biến",
  "Thiên Đạo Bài Xích","Đoạt Mệnh Thể","Ma Tính Tiềm Tàng","Nghịch Thiên Cải Mệnh","Định Số Phản Phệ"
];

const LINGENS = ["Kim","Mộc","Thủy","Hỏa","Thổ","Phong","Lôi","Băng","Âm","Dương","Hỗn"];

const GRADES = ["Hạ","Trung","Thượng","Cực","Tiên"];

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function grade(){ return GRADES[Math.floor(Math.random()*GRADES.length)]; }

export async function onRequest() {
  const rolled = [...TIEN_THIENS].sort(()=>0.5-Math.random()).slice(0,5)
    .map(t=>({ name:t, grade:grade() }));

  const lingCan = { name: rand(LINGENS), grade: grade() };

  return Response.json({
    roll: rolled,
    lingCan,
    hint: "Chọn 3 tiên thiên để bắt đầu"
  });
    }
