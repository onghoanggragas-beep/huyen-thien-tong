/* =====================================
   BATTLE SYSTEM (REAL COMBAT)
===================================== */

const BattleSystem = (() => {

  let battleState = null;

  /* =========================
     KHỞI TẠO TRẬN ĐẤU
  ========================= */
  function startBattle(enemyTemplate) {
    const char = CharacterSystem.loadCharacter();
    if (!char) return;

    battleState = {
      player: JSON.parse(JSON.stringify(char)),
      enemy: JSON.parse(JSON.stringify(enemyTemplate)),
      cooldowns: {},
      buffs: [],
      debuffs: []
    };

    log(`⚔️ Gặp ${battleState.enemy.name}`);
    updateBattleUI();
  }

  /* =========================
     TÍNH SÁT THƯƠNG
  ========================= */
  function calculateDamage(attacker, defender, skill) {
    let baseAtk = attacker.atk;
    let dmg = baseAtk * skill.damage_multiplier;

    /* ---- CHÍ MẠNG ---- */
    let critRate = attacker.crit_rate || 0.05;
    let critDmg = attacker.crit_damage || 1.5;

    if (Math.random() < critRate) {
      dmg *= critDmg;
      log("💥 Chí mạng!");
    }

    /* ---- HIỆU ỨNG LINH CĂN ---- */
    if (skill.effects?.armor_pierce)
      defender.def *= (1 - skill.effects.armor_pierce);

    dmg -= defender.def || 0;
    return Math.max(Math.floor(dmg), 1);
  }

  /* =========================
     DÙNG VÕ KĨ
  ========================= */
  function useSkill(skillId) {
    if (!battleState) return;

    const char = battleState.player;
    const enemy = battleState.enemy;

    const skill = VO_KY.find(v => v.id === skillId);
    if (!skill) return;

    const cd = battleState.cooldowns[skillId] || 0;
    if (cd > 0) {
      log("⏳ Võ kĩ đang hồi chiêu");
      return;
    }

    /* ---- GÂY SÁT THƯƠNG ---- */
    const dmg = calculateDamage(char, enemy, skill);
    enemy.hp -= dmg;
    log(`⚔️ ${skill.name} gây ${dmg} sát thương`);

    playSkillAnimation(skill.animation);

    /* ---- ÁP HIỆU ỨNG ---- */
    applySkillEffects(skill, char, enemy);

    /* ---- HỒI CHIÊU ---- */
    battleState.cooldowns[skillId] = skill.cooldown;

    if (enemy.hp <= 0) {
      winBattle();
    } else {
      enemyTurn();
    }

    updateBattleUI();
  }

  /* =========================
     HIỆU ỨNG KĨ NĂNG
  ========================= */
  function applySkillEffects(skill, char, enemy) {
    const ef = skill.effects || {};

    if (ef.burn) addDebuff(enemy, "burn", ef.burn, 3);
    if (ef.freeze && Math.random() < ef.freeze)
      addDebuff(enemy, "freeze", 0, 1);
    if (ef.stun_chance && Math.random() < ef.stun_chance)
      addDebuff(enemy, "stun", 0, 1);
    if (ef.life_steal)
      char.hp = Math.min(char.maxHp, char.hp + ef.life_steal * char.atk);
  }

  /* =========================
     LƯỢT ĐỊCH
  ========================= */
  function enemyTurn() {
    const char = battleState.player;
    const enemy = battleState.enemy;

    if (hasDebuff(enemy, "freeze") || hasDebuff(enemy, "stun")) {
      log("❄️ Kẻ địch bị khống chế!");
      removeDebuff(enemy, ["freeze", "stun"]);
      return;
    }

    const dmg = Math.max(enemy.atk - char.def, 1);
    char.hp -= dmg;
    log(`💢 Địch đánh gây ${dmg} sát thương`);

    if (char.hp <= 0) loseBattle();
  }

  /* =========================
     BUFF / DEBUFF
  ========================= */
  function addDebuff(target, type, value, duration) {
    target.debuffs = target.debuffs || [];
    target.debuffs.push({ type, value, duration });
    log(`🌀 ${type} tác động`);
  }

  function hasDebuff(target, type) {
    return target.debuffs?.some(d => d.type === type);
  }

  function removeDebuff(target, types) {
    if (!target.debuffs) return;
    target.debuffs = target.debuffs.filter(d => !types.includes(d.type));
  }

  /* =========================
     HỒI CHIÊU & DOT
  ========================= */
  function tickCooldowns() {
    if (!battleState) return;

    Object.keys(battleState.cooldowns).forEach(k => {
      battleState.cooldowns[k]--;
      if (battleState.cooldowns[k] <= 0)
        delete battleState.cooldowns[k];
    });

    applyDot();
  }

  function applyDot() {
    const enemy = battleState.enemy;
    if (!enemy.debuffs) return;

    enemy.debuffs.forEach(d => {
      if (d.type === "burn" || d.type === "poison") {
        const dmg = Math.floor(enemy.maxHp * d.value);
        enemy.hp -= dmg;
        log(`🔥 DOT gây ${dmg}`);
        d.duration--;
      }
    });

    enemy.debuffs = enemy.debuffs.filter(d => d.duration > 0);
  }

  /* =========================
     KẾT QUẢ
  ========================= */
  function winBattle() {
    log("🎉 Chiến thắng!");
    battleState = null;
  }

  function loseBattle() {
    log("💀 Bại trận!");
    battleState = null;
  }

  /* =========================
     UI HOOK
  ========================= */
  function updateBattleUI() {
    if (window.updateBattleUI)
      window.updateBattleUI(battleState);
  }

  function playSkillAnimation(key) {
    if (window.playAnimation)
      playAnimation(key);
  }

  setInterval(tickCooldowns, 1000);

  return {
    startBattle,
    useSkill
  };
})();
