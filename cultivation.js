/* =====================================================
   CULTIVATION SYSTEM
   - Tu luyện
   - Tăng linh khí
   - Đột phá
   (GIỮ NGUYÊN + FIX)
===================================================== */

/* ================= GLOBAL ================= */

let cultivating = false;
let cultivateTimer = null;

/* ================= INIT ================= */

function getPlayer() {
  // 🔧 FIX: luôn lấy player mới nhất
  if (typeof player !== "undefined" && player) return player;
  const p = loadChar();
  return p;
}

/* ================= UI UPDATE ================= */

function updateCultivationUI() {
  const p = getPlayer();
  if (!p) return;

  // Thanh linh khí
  const percent = Math.min(
    100,
    (p.qi / p.qiMax) * 100
  );

  const fill = document.getElementById("qi-fill");
  const text = document.getElementById("qi-text");

  if (fill) fill.style.width = percent + "%";
  if (text) text.innerText = `${p.qi.toFixed(1)} / ${p.qiMax}`;

  // 🔥 HIỆN / ẨN NÚT ĐỘT PHÁ
  const breakBtn = document.getElementById("breakthrough-btn");
  if (breakBtn) {
    if (p.qi >= p.qiMax) {
      breakBtn.classList.remove("hidden");
    } else {
      breakBtn.classList.add("hidden");
    }
  }
}

/* ================= TU LUYỆN ================= */

function toggleCultivation() {
  const p = getPlayer();
  if (!p) return;

  cultivating = !cultivating;

  const btn = document.getElementById("cultivate-btn");
  if (btn) {
    btn.innerText = cultivating ? "🛑 Dừng" : "🧘 Tu luyện";
  }

  if (cultivating) {
    cultivateTimer = setInterval(function () {
      cultivateTick();
    }, 1000);
  } else {
    clearInterval(cultivateTimer);
  }
}

function cultivateTick() {
  const p = getPlayer();
  if (!p) return;

  if (p.qi >= p.qiMax) {
    p.qi = p.qiMax;
    saveChar(p);
    updateCultivationUI();
    return;
  }

  // 🔧 TỐC ĐỘ TU LUYỆN (có thể scale theo linh căn / công pháp)
  let gain = 1;

  if (p.method && p.method.bonusQi) {
    gain += p.method.bonusQi;
  }

  p.qi += gain;

  if (p.qi > p.qiMax) {
    p.qi = p.qiMax;
  }

  saveChar(p);
  updateCultivationUI();
}

/* ================= ĐỘT PHÁ ================= */

function breakthrough() {
  const p = getPlayer();
  if (!p) return;

  if (p.qi < p.qiMax) {
    alert("Linh khí chưa đầy!");
    return;
  }

  // 🔥 RESET LINH KHÍ
  p.qi = 0;

  // 🔥 TĂNG TẦNG
  p.level = (p.level || 1) + 1;

  // 🔥 TĂNG GIỚI HẠN LINH KHÍ
  p.qiMax = Math.floor(p.qiMax * 1.4);

  // 🔥 TĂNG CHỈ SỐ (NỀN TẢNG COMBAT)
  p.stats = p.stats || {};
  p.stats.atk = (p.stats.atk || 10) + 5;
  p.stats.hp = (p.stats.hp || 100) + 20;
  p.stats.def = (p.stats.def || 5) + 3;

  saveChar(p);

  if (typeof updateHeader === "function") {
    updateHeader();
  }

  updateCultivationUI();

  alert("⚡ Đột phá thành công!");
}

/* ================= AUTO INIT ================= */

document.addEventListener("DOMContentLoaded", function () {
  updateCultivationUI();
});
