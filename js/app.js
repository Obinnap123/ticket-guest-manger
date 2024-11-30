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

// document.querySelectorAll("button").forEach((button) => {
//   button.disabled = false; // Removes the disabled state
//   button.style.pointerEvents = "auto"; // Ensures pointer interactions
//   button.style.opacity = ""; // Resets any visual "disabled" styles
// });

// setInterval(() => {
//   document.querySelectorAll("button").forEach((button) => {
//     button.disabled = false; // Undisable
//     button.style.pointerEvents = "auto";
//   });
// }, 500);

// document.querySelectorAll("button").forEach((button) => {
//   button.addEventListener("click", () => {
//     console.log("Button clicked:", button.textContent);
//   });
// });

const hamburger = document.querySelector(".hamburger");
const menuIcon = document.querySelector(".img-hamburger");
const xIcon = document.querySelector(".x-icon");
const menu = document.querySelector(".menu");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
