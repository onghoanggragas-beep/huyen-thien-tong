/* =====================================
   INVENTORY & EQUIPMENT SYSTEM
===================================== */

const InventorySystem = (() => {

  /* =========================
     LẤY NHÂN VẬT
  ========================= */
  function getChar() {
    return CharacterSystem.loadCharacter();
  }

  function saveChar(char) {
    CharacterSystem.saveCharacter(char);
  }

  /* =========================
     THÊM VẬT PHẨM
  ========================= */
  function addItem(itemId) {
    const char = getChar();
    if (!char) return;

    const item = TRANG_BI.find(i => i.id === itemId);
    if (!item) return;

    char.inventory.push(itemId);
    saveChar(char);
    log(`🎁 Nhận được: ${item.name}`);
    updateInventoryUI(char);
  }

  /* =========================
     TRANG BỊ
  ========================= */
  function equipItem(itemId) {
    const char = getChar();
    if (!char) return;

    const item = TRANG_BI.find(i => i.id === itemId);
    if (!item) return;

    if (!char.inventory.includes(itemId)) {
      log("⚠️ Không có vật phẩm");
      return;
    }

    const slot = item.slot;

    // tháo đồ cũ
    if (char.equipment[slot]) {
      unequipItem(slot);
    }

    char.equipment[slot] = itemId;
    applyItemStats(char, item);
    saveChar(char);

    log(`🛡️ Trang bị ${item.name}`);
    updateInventoryUI(char);
  }

  function unequipItem(slot) {
    const char = getChar();
    if (!char) return;

    const itemId = char.equipment[slot];
    if (!itemId) return;

    const item = TRANG_BI.find(i => i.id === itemId);
    if (!item) return;

    removeItemStats(char, item);
    delete char.equipment[slot];

    saveChar(char);
    log(`📤 Tháo ${item.name}`);
    updateInventoryUI(char);
  }

  /* =========================
     ÁP CHỈ SỐ
  ========================= */
  function applyItemStats(char, item) {
    if (item.stats) {
      Object.keys(item.stats).forEach(k => {
        char[k] = (char[k] || 0) + item.stats[k];
      });
    }

    if (item.bonus?.linh_can_bonus) {
      item.bonus.linh_can_bonus.forEach(lc => {
        char[`bonus_${lc}`] = (char[`bonus_${lc}`] || 0) + 0.15;
      });
    }
  }

  function removeItemStats(char, item) {
    if (item.stats) {
      Object.keys(item.stats).forEach(k => {
        char[k] -= item.stats[k];
      });
    }

    if (item.bonus?.linh_can_bonus) {
      item.bonus.linh_can_bonus.forEach(lc => {
        char[`bonus_${lc}`] -= 0.15;
      });
    }
  }

  /* =========================
     RANDOM DROP
  ========================= */
  function randomDrop() {
    const roll = Math.random();
    let pool;

    if (roll < 0.6) pool = TRANG_BI.filter(i => i.rarity === "trung");
    else if (roll < 0.85) pool = TRANG_BI.filter(i => i.rarity === "thuong");
    else if (roll < 0.97) pool = TRANG_BI.filter(i => i.rarity === "cuc");
    else pool = TRANG_BI.filter(i => i.rarity === "tien");

    const item = pool[Math.floor(Math.random() * pool.length)];
    if (item) addItem(item.id);
  }

  /* =========================
     UI HOOK
  ========================= */
  function updateInventoryUI(char) {
    if (window.updateInventoryUI)
      window.updateInventoryUI(char);
  }

  return {
    addItem,
    equipItem,
    unequipItem,
    randomDrop
  };
})();
