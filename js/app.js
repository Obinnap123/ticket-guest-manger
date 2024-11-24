// Reset body height dynamically
// document.body.style.height = "auto";
// document.body.style.minHeight = "100vh";

// // Reset styles on the <html> element as well
// document.documentElement.style.height = "auto";
// document.documentElement.style.minHeight = "100vh";

// const observer = new MutationObserver(() => {
//   document.body.style.height = "auto";
//   document.body.style.minHeight = "100vh";
// });
// observer.observe(document.body, {
//   attributes: true,
//   attributeFilter: ["style"],
// });

const style = document.createElement("style");
style.textContent = `
  html, body {
    height: auto !important;
    min-height: 100vh !important;
   
  }
`;
document.head.appendChild(style);

setInterval(() => {
  document.body.style.height = "auto";
  document.body.style.minHeight = "100vh";
}, 100);

Object.defineProperty(document.body.style, "height", { set: () => {} });

const hamburger = document.querySelector(".hamburger");
const menuIcon = document.querySelector(".img-hamburger");
const xIcon = document.querySelector(".x-icon");
const menu = document.querySelector(".menu");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
