// ===== SAFE PLACEHOLDER – CHỐNG GAME SẬP =====

// render
if (typeof renderCharacterInfo !== "function") {
  window.renderCharacterInfo = function(){};
}

// công pháp
if (typeof learnCultivationMethod !== "function") {
  window.learnCultivationMethod = function(){
    alert("Hệ công pháp đang xây dựng");
  };
}

// battle
if (typeof startBattle !== "function") {
  window.startBattle = function(){
    alert("Chiến đấu chưa sẵn sàng");
  };
}

// inventory
if (typeof openInventory !== "function") {
  window.openInventory = function(){
    alert("Kho đồ chưa sẵn sàng");
  };
}
