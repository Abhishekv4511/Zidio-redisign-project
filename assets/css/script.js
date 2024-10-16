// Toggle search bar visibility on search icon click
document.getElementById('search-icon').addEventListener('click', function() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('active');
    searchBar.focus(); // Focus on the search bar when it becomes visible
});

// Change header background and text color on scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > window.innerHeight * 0.5) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//Testimonial section carousel

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

nextBtn.addEventListener('click', () => updateCarousel('next'));
prevBtn.addEventListener('click', () => updateCarousel('prev'));
// Auto-play functionality
let autoPlayInterval = setInterval(() => updateCarousel('next'), 3000);

// Stop auto-play on hover
document.querySelector('.carousel').addEventListener('mouseover', () => clearInterval(autoPlayInterval));
document.querySelector('.carousel').addEventListener('mouseout', () => {
    autoPlayInterval = setInterval(() => updateCarousel('next'), 3000);
});

const carousel = document.querySelector('.carousel');
const logoWidth = document.querySelector('.customers').offsetWidth; 

// Scroll the carousel horizontally by the width of one logo
nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: logoWidth + 30, behavior: 'smooth' }); 
});

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -(logoWidth + 30), behavior: 'smooth' }); 
});

const feedbacks = document.querySelectorAll('.feedback-text');
let activeIndex = 0;

// Function to update the active logo and feedback
function updateActiveLogo(index) {
  logos.forEach((logo, i) => {
    logo.classList.toggle('active', i === index); 
  });
  feedbacks.forEach((feedback, i) => {
    feedback.classList.toggle('active', i === index); 
  });
}

// Scroll the carousel horizontally by the width of one logo and update active logo
nextBtn.addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % logos.length; 
  updateActiveLogo(activeIndex);
  const logoWidth = logos[0].offsetWidth + 30;
  carousel.scrollBy({ left: logoWidth, behavior: 'smooth' }); 
});

prevBtn.addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + logos.length) % logos.length; 
  updateActiveLogo(activeIndex);
  const logoWidth = logos[0].offsetWidth + 30;
  carousel.scrollBy({ left: -logoWidth, behavior: 'smooth' }); 
});

// Initialize the first logo as active
updateActiveLogo(activeIndex);

