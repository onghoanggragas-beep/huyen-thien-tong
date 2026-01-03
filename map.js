/* =====================================================
   MAP SYSTEM
   - Enter map
   - Switch to battle screen
   (BẢN CŨ – ĐƠN GIẢN – ỔN ĐỊNH)
===================================================== */

function goMap(mapId) {
  // Hiển thị màn hình battle
  hideAllScreens();
  document.getElementById("battle-screen").classList.remove("hidden");

  // Hiển thị log chiến đấu đơn giản
  var log = document.getElementById("battle-log");
  if (!log) return;

  if (mapId === 1) {
    log.innerHTML = "🌿 Bạn tiến vào Linh Sơn và gặp một con Linh Thú!";
  } else if (mapId === 2) {
    log.innerHTML = "🔥 Bạn bước vào Hỏa Vực, nhiệt khí bức người!";
  } else {
    log.innerHTML = "❓ Bạn bước vào một khu vực lạ...";
  }
}
