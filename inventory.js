/* =====================================================
   INVENTORY SYSTEM (BẢN CŨ – ỔN ĐỊNH)
   - Mở kho
   - Quay lại game
   - Chưa có item thật
===================================================== */

function openInventory() {
  hideAllScreens();
  document
    .getElementById("inventory-screen")
    .classList.remove("hidden");

  var box = document.getElementById("bagBox");
  if (box) {
    box.innerHTML = "🎒 Kho đồ trống";
  }
}

function backToGame() {
  showGame();
}
