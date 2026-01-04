/* =====================================================
   CULTIVATION METHOD SYSTEM
   - Học / đổi công pháp
   - Kiểm tra linh căn phù hợp
===================================================== */

function canLearnMethod(character, method) {
  if (!character || !method) return false;
  if (!character.root || !character.root.elements) return false;

  // Chỉ cần trùng 1 hệ là học được
  for (var i = 0; i < method.elements.length; i++) {
    if (character.root.elements.indexOf(method.elements[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function learnCultivationMethod(methodId) {
  var c = loadChar();
  if (!c) return;

  var method = null;
  for (var i = 0; i < CULTIVATION_METHODS.length; i++) {
    if (CULTIVATION_METHODS[i].id === methodId) {
      method = CULTIVATION_METHODS[i];
      break;
    }
  }

  if (!method) {
    alert("Không tìm thấy công pháp");
    return;
  }

  if (!canLearnMethod(c, method)) {
    alert("Linh căn không phù hợp với công pháp này");
    return;
  }

  c.cultivationMethod = method;
  saveChar(c);

  alert("Đã học công pháp: " + method.name);
}
