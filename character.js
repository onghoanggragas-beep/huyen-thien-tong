/* =====================================
   CHARACTER CREATION & SAVE
===================================== */

const CharacterSystem = (() => {

  function randomPick(arr, count) {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
  }

  function rollPham() {
    const roll = Math.random();
    if (roll < 0.05) return "tien";
    if (roll < 0.15) return "cuc";
    if (roll < 0.35) return "thuong";
    if (roll < 0.65) return "trung";
    return "ha";
  }

  function rollLinhCan() {
    const count = Math.floor(Math.random() * 3) + 1;
    return randomPick(LINH_CAN, count).map(lc => lc.id);
  }

  function rollTienThien() {
    return randomPick(TIEN_THIEN, 5).map(tt => ({
      ...tt,
      pham: rollPham()
    }));
  }

  function createCharacter(name, gender) {
    const char = {
      name,
      gender,
      stage: 1,
      exp: 0,
      expMax: 100,
      hp: 100,
      maxHp: 100,
      atk: 10,
      def: 5,
      linh_can: rollLinhCan(),
      tien_thien: rollTienThien(),
      cong_phap: null,
      vo_ky: [],
      equipment: {},
      inventory: []
    };
    saveCharacter(char);
    return char;
  }

  function saveCharacter(char) {
    localStorage.setItem("character", JSON.stringify(char));
  }

  function loadCharacter() {
    const data = localStorage.getItem("character");
    return data ? JSON.parse(data) : null;
  }

  return {
    createCharacter,
    loadCharacter,
    saveCharacter
  };
})();
