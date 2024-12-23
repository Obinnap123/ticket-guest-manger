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
    category: "Marketing Support Provision",
    testimonial: `I had already prepared my bank account to get debited when I was going to try out T&AM for the very first time, but it turned out that I wasn't going to be debited as the platform is absolutely free to use with easy navigation & event set-up as an icing on the cake!
I can't thank you enough T&AM.

`,
    rating: 5,
    picture: "../images/woman-pink.jpg",
    name: "Fumite",
    role: "Manager",
    company: "Tech Co.",
  },
  {
    category: "Free To Use",
    testimonial: `I had already prepared my bank account to get debited when I was going to try out T&AM for the very first time, but it turned out that I wasn't going to be debited as the platform is absolutely free to use with easy navigation & event set-up as an icing on the cake!
I can't thank you enough T&AM.
`,
    rating: 5,
    picture: "../images/woman3.jpg",
    name: "Toyin",
    role: "Engineer",
    company: "Build Inc.",
  },
  {
    category: "So Affordable",
    testimonial: `T&AM must have had the masses by heart while developing their commission structure, as it's so economical and affordable, which has always given me the chance to take care of my event expenses easily with enough ticket sales funds.
T&AM is such a blessing!
`,
    rating: 5,
    picture: "../images/man1.jpg",
    name: "Simon Peter",
    role: "Designer",
    company: "Creative Hub",
  },
  {
    category: "Easy Check In By My Event Attendees",
    testimonial: `T&AM must have had the masses by heart while developing their commission structure, as it's so economical and affordable, which has always given me the chance to take care of my event expenses easily with enough ticket sales funds.
    T&AM is such a blessing!
    `,
    rating: 5,
    picture: "../images/man2.jpg",
    name: "Theodore",
    role: "Designer",
    company: "Creative Hub",
  },
  //   {
  //     category: "Great Quality",
  //     testimonial:
  //       "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
  //     rating: 5,
  //     picture: "https://via.placeholder.com/100",
  //     name: "Alex Johnson",
  //     role: "Designer",
  //     company: "Creative Hub",
  //   },
  //   {
  //     category: "Great Quality",
  //     testimonial: `I had already prepared my bank account to get debited when I was going to try out T&AM for the very first time, but it turned out that I wasn't going to be debited as the platform is absolutely free to use with easy navigation & event set-up as an icing on the cake
  //       I can't thank you enough T&AM, I've seen a lot from other paid platforms out there.

  // `,
  //     rating: 5,
  //     picture: "https://via.placeholder.com/100",
  //     name: "Alex Johnson",
  //     role: "Designer",
  //     company: "Creative Hub",
  //   },
  //   {
  //     category: "Great Quality",
  //     testimonial:
  //       "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
  //     rating: 5,
  //     picture: "https://via.placeholder.com/100",
  //     name: "Alex Johnson",
  //     role: "Designer",
  //     company: "Creative Hub",
  //   },
  //   {
  //     category: "Great Quality",
  //     testimonial:
  //       "Engaging with the freelancers we found on the platform was a revelation. Their dedication to fulfilling our requests and offering innovative suggestions was remarkable and excellent.",
  //     rating: 5,
  //     picture: "https://via.placeholder.com/100",
  //     name: "Alex Johnson",
  //     role: "Designer",
  //     company: "Creative Hub",
  //   },
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

function createCard(data) {
  // Create the card element
  const card = document.createElement("div");
  card.classList.add("card");

  // Image
  const image = document.createElement("img");
  image.src = data.imageSrc || "https://via.placeholder.com/300";
  image.alt = data.imageAlt || "Card Image";
  card.appendChild(image);

  // Card Content
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  // Button
  const button = document.createElement("button");
  button.textContent = data.buttonText || "Click Me";
  button.style.marginBottom = "10px";
  button.style.backgroundColor = "rgba(249, 164, 83, 1)";
  button.style.cursor = "pointer";

  // Create the <a> tag
  const link = document.createElement("a");
  link.href = data.buttonLink || "#"; // Replace with the actual URL or "#" if none provided
  link.target = "_blank"; // Opens the link in a new tab
  link.style.textDecoration = "none"; // Ensures no underline

  // Append the button to the <a> tag
  link.appendChild(button);

  // Append the <a> tag wherever needed (e.g., cardContent)
  cardContent.appendChild(link);

  // button.style.backgroundColor = "rgba(249, 164, 83, 1)";
  // Subtitle
  const subtitle = document.createElement("h3");
  subtitle.textContent = data.subtitle || "Default Subtitle";
  cardContent.appendChild(subtitle);

  // Horizontal Rule
  cardContent.appendChild(createHorizontalRule());

  // Price Row
  const priceRow = createRow("Price", `₦${data.price}`);
  cardContent.appendChild(priceRow);
  cardContent.appendChild(createHorizontalRule());

  // Slots Left Row
  const slotsRow = createRow("Slots Left", data.slotsLeft);
  cardContent.appendChild(slotsRow);
  cardContent.appendChild(createHorizontalRule());

  // Date Row
  const dateRow = createRow("Date", `${data.date} (${data.time})`);
  cardContent.appendChild(dateRow);
  cardContent.appendChild(createHorizontalRule());

  // Social Media Icons
  const socialIcons = document.createElement("div");
  socialIcons.classList.add("social-icons");

  data.socialMedia.forEach((icon) => {
    const link = document.createElement("a");
    link.href = icon.link || "#"; // Replace with the actual link, or use "#" if none is provided
    link.target = "_blank"; // Opens the link in a new tab
    link.style.marginRight = "10px";

    const socialIcon = document.createElement("img");
    socialIcon.src = icon.src;
    socialIcon.alt = icon.alt || "Social Icon";

    // Append the image to the link
    link.appendChild(socialIcon);

    // Append the link to the socialIcons container
    socialIcons.appendChild(link);
  });

  cardContent.appendChild(socialIcons);
  card.appendChild(cardContent);

  return card;
}

function createRow(leftText, rightText) {
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.justifyContent = "space-between";

  const left = document.createElement("p");
  left.textContent = leftText;

  const right = document.createElement("p");
  right.textContent = rightText;

  row.appendChild(left);
  row.appendChild(right);
  return row;
}

function createHorizontalRule() {
  const hr = document.createElement("hr");
  hr.classList.add("horizontal-rule");
  return hr;
}

// Example Data
const cardDataArray = [
  {
    imageSrc: "../images/glass-img.png",
    imageAlt: "Image 1",
    buttonText: "Party",
    buttonLink: "https://ticketguestmanager.com/events-category/5/Party",
    subtitle: "Abeokuta palm wine hangout",
    price: "1,500.00",
    slotsLeft: "120",
    date: "24 Nov. 2024",
    time: "10:30am",
    socialMedia: [
      {
        src: "../images/facebook-icon-orange.svg",
        alt: "facebook-icon",
        link: "https://web.facebook.com/eventticketsmanager/",
      },
      {
        src: "../images/instagram-icon-orange.svg",
        alt: "instagram-icon",
        link: "https://www.instagram.com/ticket_and_attendee_manager/",
      },
      {
        src: "../images/twitter-icon-orange.svg",
        alt: "twitter-icon",
        link: "https://x.com/Guestsmanager",
      },
      // { src: "https://via.placeholder.com/24", alt: "Twitter" },
    ],
  },
  {
    imageSrc: "../images/book-img.png",
    imageAlt: "Image 2",
    buttonText: "Education",
    buttonLink: "https://ticketguestmanager.com/events-category/22/Education",
    subtitle: "Learning lounge: sip & study",
    price: "2,000.00",
    slotsLeft: "90",
    date: "25 Nov. 2024",
    time: "11:00am",
    socialMedia: [
      {
        src: "../images/facebook-icon-orange.svg",
        alt: "facebook-icon",
        link: "https://web.facebook.com/eventticketsmanager/",
      },
      {
        src: "../images/instagram-icon-orange.svg",
        alt: "instagram-icon",
        link: "https://www.instagram.com/ticket_and_attendee_manager/",
      },
      {
        src: "../images/twitter-icon-orange.svg",
        alt: "twitter-icon",
        link: "https://x.com/Guestsmanager",
      },
    ],
  },
  {
    imageSrc: "../images/birthday-img.png",
    imageAlt: "Image 3",
    buttonText: "Birthday",
    buttonLink: "https://ticketguestmanager.com/events-category/18/Birthday",
    subtitle: "Birthday bash at palm oasis",
    price: "3,000.00",
    slotsLeft: "70",
    date: "26 Nov. 2024",
    time: "12:00pm",
    socialMedia: [
      {
        src: "../images/facebook-icon-orange.svg",
        alt: "facebook-icon",
        link: "https://web.facebook.com/eventticketsmanager/",
      },
      {
        src: "../images/instagram-icon-orange.svg",
        alt: "instagram-icon",
        link: "https://www.instagram.com/ticket_and_attendee_manager/",
      },
      {
        src: "../images/twitter-icon-orange.svg",
        alt: "twitter-icon",
        link: "https://x.com/Guestsmanager",
      },
    ],
  },
  {
    imageSrc: "../images/lady-writing-img.png",
    imageAlt: "Image 3",
    buttonText: "Conference",
    buttonLink: "https://ticketguestmanager.com/events-category/14/conference",
    subtitle: "Innovative minds conference",
    price: "3,000.00",
    slotsLeft: "70",
    date: "26 Nov. 2024",
    time: "12:00pm",
    socialMedia: [
      {
        src: "../images/facebook-icon-orange.svg",
        alt: "facebook-icon",
        link: "https://web.facebook.com/eventticketsmanager/",
      },
      {
        src: "../images/instagram-icon-orange.svg",
        alt: "instagram-icon",
        link: "https://www.instagram.com/ticket_and_attendee_manager/",
      },
      {
        src: "../images/twitter-icon-orange.svg",
        alt: "twitter-icon",
        link: "https://x.com/Guestsmanager",
      },
    ],
  },
  {
    imageSrc: "../images/light-img.png",
    imageAlt: "Image 3",
    buttonText: "Awards",
    buttonLink: "https://ticketguestmanager.com/events-category/19/Awards",
    subtitle: "Euphoria under the stars",
    price: "3,000.00",
    slotsLeft: "70",
    date: "26 Nov. 2024",
    time: "12:00pm",
    socialMedia: [
      {
        src: "../images/facebook-icon-orange.svg",
        alt: "facebook-icon",
        link: "https://web.facebook.com/eventticketsmanager/",
      },
      {
        src: "../images/instagram-icon-orange.svg",
        alt: "instagram-icon",
        link: "https://www.instagram.com/ticket_and_attendee_manager/",
      },
      {
        src: "../images/twitter-icon-orange.svg",
        alt: "twitter-icon",
        link: "https://x.com/Guestsmanager",
      },
    ],
  },
  {
    imageSrc: "../images/hand-img.png",
    imageAlt: "Image 3",
    buttonText: "Charity",
    buttonLink: "https://ticketguestmanager.com/events-category/20/Charity",
    subtitle: "Sip for a cause: charity palm wine fest",
    price: "3,000.00",
    slotsLeft: "70",
    date: "26 Nov. 2024",
    time: "12:00pm",
    socialMedia: [
      {
        src: "../images/facebook-icon-orange.svg",
        alt: "facebook-icon",
        link: "https://web.facebook.com/eventticketsmanager/",
      },
      {
        src: "../images/instagram-icon-orange.svg",
        alt: "instagram-icon",
        link: "https://www.instagram.com/ticket_and_attendee_manager/",
      },
      {
        src: "../images/twitter-icon-orange.svg",
        alt: "twitter-icon",
        link: "https://x.com/Guestsmanager",
      },
    ],
  },
  // Add data for 3 more cards
];

// Render all cards
const cardContainer = document.getElementById("cardContainer");
cardDataArray.forEach((data) => {
  cardContainer.appendChild(createCard(data));
});
