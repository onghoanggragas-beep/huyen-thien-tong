/* =====================================================
   CULTIVATION SYSTEM
   - Idle cultivation
   - Breakthrough
   (BẢN CŨ – ỔN ĐỊNH)
===================================================== */

/* ================= TOGGLE ================= */

function toggleCultivation() {
  var c = loadChar();
  if (!c) return;

  c.cultivating = !c.cultivating;

  if (c.cultivating) {
    alert("Bắt đầu tu luyện");
  } else {
    alert("Dừng tu luyện");
  }

  saveChar(c);
}

/* ================= IDLE LOOP ================= */

// Tu luyện mỗi 1 giây
setInterval(function () {
  var c = loadChar();
  if (!c) return;

  if (!c.cultivating) return;

  // Tăng linh khí theo linh căn
  var gain = c.root.speed || 1;
  c.qi += gain;

  saveChar(c);
}, 1000);

/* ================= BREAK THROUGH ================= */

function breakThrough() {
  var c = loadChar();
  if (!c) return;

  // Giới hạn đột phá đơn giản (bản cũ)
  var maxQi = 100;

  if (c.qi < maxQi) {
    alert("Chưa đủ linh khí để đột phá");
    return;
  }

  c.qi = 0;
  c.stage += 1;

  // Nếu vượt tầng tối đa → tăng cảnh giới
  if (c.stage > 9) {
    c.stage = 1;
    c.realmIndex += 1;

    alert("Đột phá cảnh giới!");
  } else {
    alert("Đột phá tầng thành công!");
  }

  saveChar(c);
      }
