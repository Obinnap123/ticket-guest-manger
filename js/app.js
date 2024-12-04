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

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(
    ".login-dropdown, .sign-up-dropdown"
  );

  const handleClick = (dropdown) => (event) => {
    event.stopPropagation(); // Prevent click from propagating to document
    // Close other dropdowns before toggling the clicked one
    dropdowns.forEach((d) => {
      if (d !== dropdown) {
        d.classList.remove("open");
      }
    });
    dropdown.classList.toggle("open"); // Toggle the specific dropdown
  };

  const handleOutsideClick = () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("open")); // Close all dropdowns
  };

  const setupDropdownBehavior = () => {
    // Clear existing event listeners to avoid duplicates
    dropdowns.forEach((dropdown) => {
      dropdown.replaceWith(dropdown.cloneNode(true));
    });

    const updatedDropdowns = document.querySelectorAll(
      ".login-dropdown, .sign-up-dropdown"
    );

    if (window.innerWidth <= 899) {
      // Mobile view
      updatedDropdowns.forEach((dropdown) => {
        const clickHandler = handleClick(dropdown);
        dropdown.addEventListener("click", clickHandler);
      });
      document.addEventListener("click", handleOutsideClick);
    } else {
      // Desktop view
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  // Initial setup
  setupDropdownBehavior();

  // Re-apply event listeners on window resize
  window.addEventListener("resize", setupDropdownBehavior);
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
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
  {
    category: "Perfect matches made easy",
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
  {
    category: "Find your dream job",
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "David Clark",
    role: "Project Manager",
    company: "Creative Minds",
  },
  {
    category: "Transform your career",
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
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

// Function to render dots
function renderDots() {
  const dotsContainer = document.querySelector(".dots-container");
  const cards = feedbackData;
  dotsContainer.innerHTML = ""; // Clear previous dots

  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active"); // First dot is active by default
    dot.dataset.index = index; // Store index for navigation
    dotsContainer.appendChild(dot);
  });
}

// Function to update active dot
function updateActiveDot() {
  const carousel = document.querySelector(".carousel");
  const dots = document.querySelectorAll(".dot");
  const cardWidth = 300 + 40; // Width of card + gap
  const scrollPosition = carousel.scrollLeft;
  const activeIndex = Math.round(scrollPosition / cardWidth);

  dots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Function to scroll to card when a dot is clicked
function scrollToCard(index) {
  const carousel = document.querySelector(".carousel");
  const cardWidth = 520 + 40; // Width of card + gap
  carousel.scrollTo({
    left: index * cardWidth,
    behavior: "smooth",
  });
}

// Add click event listeners to dots
function addDotListeners() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index, 10);
      scrollToCard(index);
    });
  });
}

// Initialize the carousel and dots
document.addEventListener("DOMContentLoaded", () => {
  renderCards(); // Render the cards dynamically
  renderDots(); // Render dots dynamically
  enableHorizontalScroll(); // Enable horizontal scroll
  addDotListeners(); // Attach click events to dots
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("scroll", updateActiveDot); // Update active dot on scroll
});
