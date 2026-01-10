const hamburger = document.querySelector(".hamburger-btn");
const btnArea = document.querySelector(".btn-area");
const mask = document.querySelector(".mask");

hamburger.addEventListener("click", e => {
  hamburger.classList.toggle("open");
  btnArea.classList.toggle("open");
  mask.classList.toggle("open");
});