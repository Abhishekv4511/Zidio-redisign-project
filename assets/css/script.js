// Toggle search bar visibility on search icon click
document.getElementById('search-icon').addEventListener('click', function() {
  const searchBar = document.getElementById('search-bar');
  searchBar.classList.toggle('active');
  if (searchBar.classList.contains('active')) {
      searchBar.focus(); // Focus on the search bar when it becomes visible
  }
});

// Change header background and text color on scroll
window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  if (window.scrollY > window.innerHeight * 0.05) { // Change to 5% of the viewport height
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});


// Testimonial section carousel
const logos = document.querySelectorAll('.customers');
const feedbackTexts = document.querySelectorAll('.feedback-text');
let currentLogoIndex = 0;

// Function to remove active classes
function removeActiveClasses() {
  logos.forEach(logo => logo.classList.remove('active'));
  feedbackTexts.forEach(text => text.classList.remove('active'));
}

// Function to update feedback and logo styles
function updateFeedback(logo, feedbackId) {
  removeActiveClasses();
  logo.classList.add('active');
  document.getElementById(feedbackId).classList.add('active');
}

// Logo click event listener
logos.forEach((logo, index) => {
  logo.addEventListener('click', function() {
      const feedbackId = this.getAttribute('data-feedback');
      updateFeedback(this, feedbackId);
      currentLogoIndex = index; 
  });
});

// Next/prev button logic
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

function updateCarousel(direction) {
  removeActiveClasses();

  if (direction === 'next') {
      currentLogoIndex = (currentLogoIndex + 1) % logos.length;
  } else {
      currentLogoIndex = (currentLogoIndex - 1 + logos.length) % logos.length;
  }

  const currentLogo = logos[currentLogoIndex];
  const feedbackId = currentLogo.getAttribute('data-feedback');
  updateFeedback(currentLogo, feedbackId);
}

// Event listeners for next and previous buttons
nextBtn.addEventListener('click', () => {
  updateCarousel('next');
  updateCarouselScroll('next'); // Update scroll position
});

prevBtn.addEventListener('click', () => {
  updateCarousel('prev');
  updateCarouselScroll('prev'); // Update scroll position
});

// Auto-play functionality
let autoPlayInterval = setInterval(() => updateCarousel('next'), 3000);

// Stop auto-play on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseover', () => clearInterval(autoPlayInterval));
carousel.addEventListener('mouseout', () => {
  autoPlayInterval = setInterval(() => updateCarousel('next'), 3000);
});

// Scroll the carousel horizontally by the width of one logo
function updateCarouselScroll(direction) {
  const logoWidth = logos[0].offsetWidth + 30; // 30 is for margin or padding
  if (direction === 'next') {
      carousel.scrollBy({ left: logoWidth, behavior: 'smooth' }); 
  } else {
      carousel.scrollBy({ left: -logoWidth, behavior: 'smooth' }); 
  }
}

// Initialize the first logo as active
updateFeedback(logos[0], logos[0].getAttribute('data-feedback'));
