/* =====================================
   CULTIVATION SYSTEM (IDLE CORE)
===================================== */

const CultivationSystem = (() => {

  let cultivating = false;
  let lastTick = Date.now();

  /* =========================
     TÍNH TOÁN TỐC ĐỘ TU LUYỆN
  ========================= */
  function calculateCultivationSpeed(char) {
    let speed = 1; // cơ bản

    /* ---- LINH CĂN ---- */
    char.linh_can.forEach(id => {
      const lc = LINH_CAN.find(l => l.id === id);
      if (lc && lc.cultivate_modifier)
        speed *= (1 - lc.cultivate_modifier);
    });

    /* ---- TIÊN THIÊN ---- */
    char.tien_thien.forEach(tt => {
      if (tt.effects?.cultivate_speed)
        speed *= (1 + tt.effects.cultivate_speed);
    });

    /* ---- CÔNG PHÁP ---- */
    if (char.cong_phap) {
      const cp = CONG_PHAP.find(c => c.id === char.cong_phap);
      if (cp?.cultivate_bonus?.speed)
        speed *= (1 + cp.cultivate_bonus.speed);
    }

    return Math.max(speed, 0.1);
  }

  /* =========================
     EXP CẦN ĐỂ ĐỘT PHÁ
  ========================= */
  function calculateExpNeed(stage) {
    return Math.floor(100 * Math.pow(stage, 1.4));
  }

  /* =========================
     BẮT ĐẦU / DỪNG TU LUYỆN
  ========================= */
  function start() {
    cultivating = true;
    lastTick = Date.now();
  }

  function stop() {
    cultivating = false;
  }

  /* =========================
     TICK TU LUYỆN (IDLE)
  ========================= */
  function tick() {
    if (!cultivating) return;

    const char = CharacterSystem.loadCharacter();
    if (!char) return;

    const now = Date.now();
    const deltaSec = (now - lastTick) / 1000;
    lastTick = now;

    const speed = calculateCultivationSpeed(char);
    const gain = deltaSec * speed * 5; // hệ số tu luyện

    char.exp += gain;

    if (char.exp >= char.expMax) {
      char.exp = char.expMax;
      cultivating = false;
      showBreakthroughReady();
    }

    CharacterSystem.saveCharacter(char);
    updateCultivationUI(char);
  }

  /* =========================
     ĐỘT PHÁ
  ========================= */
  function breakthrough() {
    const char = CharacterSystem.loadCharacter();
    if (!char || char.exp < char.expMax) return;

    let successRate = 0.7;

    char.tien_thien.forEach(tt => {
      if (tt.effects?.breakthrough_rate)
        successRate += tt.effects.breakthrough_rate;
    });

    if (Math.random() <= successRate) {
      char.stage++;
      char.exp = 0;
      char.expMax = calculateExpNeed(char.stage);
      char.maxHp += 20;
      char.atk += 5;
      char.def += 3;
      char.hp = char.maxHp;
      log(`✨ Đột phá thành công! Cảnh giới ${char.stage}`);
    } else {
      char.exp = char.expMax * 0.7;
      log("⚠️ Đột phá thất bại, linh khí tổn hao!");
    }

    CharacterSystem.saveCharacter(char);
    updateCultivationUI(char);
  }

  /* =========================
     UI (TẠM)
  ========================= */
  function updateCultivationUI(char) {
    if (window.updateUI) updateUI(char);
  }

  function showBreakthroughReady() {
    log("💠 Linh khí đã đầy, có thể đột phá!");
    if (window.showBreakthroughButton)
      showBreakthroughButton();
  }

  /* =========================
     OFFLINE PROGRESS
  ========================= */
  function applyOfflineProgress() {
    const char = CharacterSystem.loadCharacter();
    if (!char) return;

    const last = localStorage.getItem("lastOnline");
    if (!last) return;

    const delta = (Date.now() - parseInt(last)) / 1000;
    if (delta <= 10) return;

    const speed = calculateCultivationSpeed(char);
    const gain = delta * speed * 3;

    char.exp = Math.min(char.exp + gain, char.expMax);
    CharacterSystem.saveCharacter(char);
    log(`🌙 Offline tu luyện +${Math.floor(gain)} linh khí`);
  }

  function markOffline() {
    localStorage.setItem("lastOnline", Date.now());
  }

  /* =========================
     LOOP
  ========================= */
  setInterval(tick, 1000);
  window.addEventListener("beforeunload", markOffline);

  return {
    start,
    stop,
    breakthrough,
    applyOfflineProgress
  };
})();
