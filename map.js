/* =====================================
   MAP & DUNGEON SYSTEM
===================================== */

const MapSystem = (() => {

  /* =========================
     KHU VỰC
  ========================= */
  const MAPS = [
    {
      id: "linh_son",
      name: "Linh Sơn",
      level: 1,
      description: "Sơn mạch linh khí dồi dào, thích hợp tu luyện sơ kỳ.",
      enemies: ["linh_lang", "thach_nhan"],
      drop_rate: 0.5
    },
    {
      id: "hoa_vuc",
      name: "Hỏa Vực",
      level: 3,
      description: "Hỏa khí cuồng bạo, nguy hiểm hơn.",
      enemies: ["hoa_ma", "hoa_long"],
      drop_rate: 0.7
    },
    {
      id: "bang_nguyen",
      name: "Băng Nguyên",
      level: 5,
      description: "Vùng đất hàn băng, khắc nghiệt.",
      enemies: ["bang_lang", "bang_quai"],
      drop_rate: 0.8
    }
  ];

  /* =========================
     QUÁI MẪU
  ========================= */
  const ENEMIES = {
    linh_lang: {
      id: "linh_lang",
      name: "Linh Lang",
      hp: 80,
      maxHp: 80,
      atk: 8,
      def: 3
    },
    thach_nhan: {
      id: "thach_nhan",
      name: "Thạch Nhân",
      hp: 120,
      maxHp: 120,
      atk: 6,
      def: 8
    },
    hoa_ma: {
      id: "hoa_ma",
      name: "Hỏa Ma",
      hp: 150,
      maxHp: 150,
      atk: 14,
      def: 5
    },
    hoa_long: {
      id: "hoa_long",
      name: "Hỏa Long",
      hp: 220,
      maxHp: 220,
      atk: 20,
      def: 8
    },
    bang_lang: {
      id: "bang_lang",
      name: "Băng Lang",
      hp: 180,
      maxHp: 180,
      atk: 15,
      def: 6
    },
    bang_quai: {
      id: "bang_quai",
      name: "Băng Quái",
      hp: 260,
      maxHp: 260,
      atk: 22,
      def: 10
    }
  };

  /* =========================
     VÀO KHU VỰC
  ========================= */
  function enterMap(mapId) {
    const map = MAPS.find(m => m.id === mapId);
    if (!map) return;

    log(`🗺️ Tiến vào ${map.name}`);
    updateMapUI(map);
  }

  /* =========================
     GẶP QUÁI
  ========================= */
  function explore(mapId) {
    const map = MAPS.find(m => m.id === mapId);
    if (!map) return;

    const enemyId =
      map.enemies[Math.floor(Math.random() * map.enemies.length)];
    const enemy = JSON.parse(JSON.stringify(ENEMIES[enemyId]));

    log(`👾 Gặp ${enemy.name}`);
    BattleSystem.startBattle(enemy);

    setTimeout(() => {
      if (!BattleSystem.isInBattle) {
        reward(map);
      }
    }, 500);
  }

  /* =========================
     PHẦN THƯỞNG
  ========================= */
  function reward(map) {
    const char = CharacterSystem.loadCharacter();
    if (!char) return;

    // EXP
    const expGain = map.level * 20;
    char.exp = Math.min(char.exp + expGain, char.expMax);
    log(`✨ Nhận ${expGain} linh khí`);

    // Drop đồ
    if (Math.random() < map.drop_rate) {
      InventorySystem.randomDrop();
    }

    CharacterSystem.saveCharacter(char);
  }

  /* =========================
     UI HOOK
  ========================= */
  function updateMapUI(map) {
    if (window.updateMapUI)
      window.updateMapUI(map);
  }

  return {
    MAPS,
    enterMap,
    explore
  };
})();
