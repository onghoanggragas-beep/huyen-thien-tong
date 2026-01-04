/* =====================================================
   EFFECT SYSTEM
   - Tổng hợp effect từ linh căn + tiên thiên
   - Không phá core
===================================================== */

/* ===== TỐC ĐỘ TU LUYỆN ===== */

function getCultivationRate(c) {
  var rate = 1;

  // Linh căn
  if (c.root && c.root.speed) {
    rate *= c.root.speed;
  }

  // Tiên thiên
  if (c.talents) {
    for (var i = 0; i < c.talents.length; i++) {
      var ef = c.talents[i].effect;
      if (ef && ef.cultivateRate) {
        rate *= 1 + ef.cultivateRate;
      }
    }
  }

  return rate;
}

/* ===== CHỈ SỐ NHÂN VẬT ===== */

function applyStatEffects(baseStats, c) {
  var stats = Object.assign({}, baseStats);

  if (!c || !c.talents) return stats;

  for (var i = 0; i < c.talents.length; i++) {
    var ef = c.talents[i].effect;
    if (!ef) continue;

    if (ef.statPercent) {
      stats.hp *= 1 + ef.statPercent;
      stats.atk *= 1 + ef.statPercent;
      stats.def *= 1 + ef.statPercent;
      stats.spd *= 1 + ef.statPercent;
    }
    if (ef.hpPercent) stats.hp *= 1 + ef.hpPercent;
    if (ef.atkPercent) stats.atk *= 1 + ef.atkPercent;
    if (ef.defPercent) stats.def *= 1 + ef.defPercent;
  }

  // Làm tròn
  stats.hp = Math.floor(stats.hp);
  stats.atk = Math.floor(stats.atk);
  stats.def = Math.floor(stats.def);
  stats.spd = Math.floor(stats.spd);

  return stats;
      }
