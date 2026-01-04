/* =====================================================
   CHARACTER STATS SYSTEM
   - Tính chỉ số theo tu vi
   - Không lưu cứng
   - An toàn tuyệt đối
===================================================== */

function getCharacterLevel(c) {
  if (!c) return 1;
  return c.realmIndex * 10 + c.stage;
}

function getCharacterStats(c) {
  var level = getCharacterLevel(c);

  return {
    level: level,
    hp: 100 + level * 30,
    atk: 10 + level * 5,
    def: 5 + level * 3,
    spd: 5 + level * 1
  };
}
