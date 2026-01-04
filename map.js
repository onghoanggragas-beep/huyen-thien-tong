/* =====================================================
   MAP SYSTEM
   - Enter map
   - Call combat system
   (BẢN ĐÃ NỐI COMBAT)
===================================================== */

/*
  mapId:
  1 = Linh Sơn
  2 = Hỏa Vực
  3 = Băng Nguyên
*/

function goMap(mapId) {
  if (!mapId) return;

  // Gọi hệ thống combat
  startBattle(mapId);
}
