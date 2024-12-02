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

// Mock data for dynamic rendering
const feedbackData = [
  {
    category: "Exceptional job matching service",
    testimonial:
      "Working with the freelancers on the platform was a game-changer for our project. Their dedication to meeting our needs while offering innovative ideas truly set them apart.",
    rating: 5,
    picture: "../images/man's-img.jpeg",
    name: "Tommy Jones",
    role: "Chief Operating Officer",
    company: "Bing HR",
  },
  {
    category: "Great services",
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "Chinyere Ndubisi",
    role: "Product Principal",
    company: "Capsule",
  },
  {
    category: "Success stories with service",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "Ethan Nguyen",
    role: "Chief Financial Officer",
    company: " Visionary Technologies",
  },
  {
    category: "Unlock your career potential",
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "Lisa Green",
    role: "CTO",
    company: "GrowthHackers",
  },
  {
    category: "Outstanding opportunities",
    testimonial: "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
  {
    category: "Perfect matches made easy",
    testimonial: "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
  {
    category: "Find your dream job",
    testimonial: "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
  {
    category: "Transform your career",
    testimonial: "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
];

// Function to render stars
function renderStars(count) {
  return Array(count).fill("<span>&#9733;</span>").join("");
}

// Function to render picture-based stars
function renderPictureRating(count) {
  const starImageURL = "../images/star.svg"; // Replace with your star image URL
  return Array(count)
    .fill(`<img src="${starImageURL}" alt="Star" class="rating-star">`)
    .join("");
}
// Function to render all cards dynamically
function renderCards() {
  const carousel = document.querySelector(".carousel");

  // Clear existing cards before rendering (optional, for re-renders)
  carousel.innerHTML = "";

  feedbackData.forEach((data) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="feedback-category">${data.category}</div>
      <div class="testimonial">${data.testimonial}</div>
      <div class="rating">${renderPictureRating(data.rating)}</div>
      <div class="client-info">
        <img src="${data.picture}" alt="${data.name}" />
        <div class="client-details">
          <div class="client-name">${data.name}</div>
          <div class="client-role">${data.role}, ${data.company}</div>
        </div>
      </div>
    `;

    carousel.appendChild(card);
  });
}

// Enable horizontal scrolling with touch or mouse (same as before)
function enableHorizontalScroll() {
  const carouselContainer = document.querySelector(".carousel-container");
  const carousel = document.querySelector(".carousel");
  let isDown = false;
  let startX;
  let scrollLeft;

  carouselContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
  });

  carouselContainer.addEventListener("mouseleave", () => {
    isDown = false;
  });

  carouselContainer.addEventListener("mouseup", () => {
    isDown = false;
  });

  carouselContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carouselContainer.scrollLeft = scrollLeft - walk;
  });

  carouselContainer.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
  });

  carouselContainer.addEventListener("touchend", () => {
    isDown = false;
  });

  carouselContainer.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carouselContainer.scrollLeft = scrollLeft - walk;
  });
}

// Initialize the carousel
document.addEventListener("DOMContentLoaded", () => {
  renderCards(); // Render cards dynamically
  enableHorizontalScroll(); // Enable scroll interaction
});

// Example: Add a new card dynamically
function addNewFeedback(data) {
  feedbackData.push(data); // Add new feedback to the array
  renderCards(); // Re-render cards
}

// Example usage: Adding a new feedback card
// addNewFeedback[
//   ({
//     category: "New category",
//     testimonial: "This is a new testimonial for the platform.",
//     rating: 4,
//     picture: "https://via.placeholder.com/50",
//     name: "New User",
//     role: "Developer",
//     company: "TechStart",
//   },
//   {
//     category: "New food",
//     testimonial: "This is a new testimonial for the platform.",
//     rating: 4,
//     picture: "https://via.placeholder.com/50",
//     name: "New User",
//     role: "Developer",
//     company: "TechStart",
//   })
// ];
