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

// Sample Data for the Cards
const feedbackData = [
  {
    category: "Exceptional job matching service",
    testimonial:
      "Working with the freelancers on the platform was a game-changer for our project. Their dedication to meeting our needs while offering innovative ideas truly set them apart.",
    rating: 5,
    picture: "../images/man's-img.jpeg",
    name: "John Doe",
    role: "Manager",
    company: "Tech Co.",
  },
  {
    category: "Great services",
    testimonial:
      "The freelancers we connected with on the platform exceeded all expectations. Their commitment to delivering exactly what we wanted, along with fresh perspectives, was impressive.",
    rating: 5,
    picture: "../images/woman's-img.jpg",
    name: "Jane Smith",
    role: "Engineer",
    company: "Build Inc.",
  },
  {
    category: "Success stories with service",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "https://via.placeholder.com/100",
    name: "Alex Johnson",
    role: "Designer",
    company: "Creative Hub",
  },
  {
    category: "Great Quality",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "https://via.placeholder.com/100",
    name: "Alex Johnson",
    role: "Designer",
    company: "Creative Hub",
  },
  {
    category: "Great Quality",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "https://via.placeholder.com/100",
    name: "Alex Johnson",
    role: "Designer",
    company: "Creative Hub",
  },
  {
    category: "Great Quality",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "https://via.placeholder.com/100",
    name: "Alex Johnson",
    role: "Designer",
    company: "Creative Hub",
  },
  {
    category: "Great Quality",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "https://via.placeholder.com/100",
    name: "Alex Johnson",
    role: "Designer",
    company: "Creative Hub",
  },
  {
    category: "Great Quality",
    testimonial:
      "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
    rating: 5,
    picture: "https://via.placeholder.com/100",
    name: "Alex Johnson",
    role: "Designer",
    company: "Creative Hub",
  },
];

// Function to Render Swiper Slides
function renderSwiperSlides() {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  feedbackData.forEach((data) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="card">
        <div class="feedback-category">${data.category}</div>
        <div class="testimonial">${data.testimonial}</div>
        <div class="rating">${renderRatingStars(data.rating)}</div>
        <div class="client-info">
          <img src="${data.picture}" alt="${data.name}" />
          <div class="client-details">
            <div class="client-name">${data.name}</div>
            <div class="client-role">${data.role}, ${data.company}</div>
          </div>
        </div>
      </div>
    `;

    swiperWrapper.appendChild(slide);
  });
}

// Function to Render Stars for Rating
// function renderRatingStars(rating) {
//   return Array(rating)
//     .fill("⭐")
//     .join("");
// }

function renderStars(count) {
  return Array(count).fill("<span>&#9733;</span>").join("");
}

function renderRatingStars(count) {
  const starImageURL = "../images/star.svg"; // Replace with your star image URL
  return Array(count)
    .fill(`<img src="${starImageURL}" alt="Star" class="rating-star">`)
    .join("");
}
// console.log(renderPictureRating());
// // Initialize Swiper with Settings
function initializeSwiper() {
  new Swiper(".mySwiper", {
    slidesPerView: 2.5,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
      1200: { slidesPerView: 2.5 },
    },
  });
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  renderSwiperSlides();
  initializeSwiper();
});
