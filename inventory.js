function openInventory() {
  hideAllScreens();
  const inv = document.getElementById("inventory-screen");
  if (inv) inv.classList.remove("hidden");
}
