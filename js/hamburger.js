const hamburger = document.querySelector(".js-hamburger-btn");
const btnArea = document.querySelector(".js-btn-area");
const mask = document.querySelector(".js-mask");

function toggleMask() {
  hamburger.classList.toggle("open");
  btnArea.classList.toggle("open");
  mask.classList.toggle("open");
  const isOpen = hamburger.getAttribute("aria-expanded");
  if(isOpen === "false") {
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "メニューを閉じる");
    mask.removeAttribute("hidden");
  } else if(isOpen === "true") {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "メニューを開く");
    mask.removeAttribute("hidden", "");
  }
}

hamburger.addEventListener("click", e => {
  toggleMask();
});
