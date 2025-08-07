// Presentation State
let currentSlideIndex = 0;
const totalSlides = 22; // Updated to reflect the current total number of slides
let autoPlayInterval;

// Timing configuration
const SLIDE_DURATION = (6 * 60 * 1000) / totalSlides; // 6 minutes total / number of slides

// DOM Elements
const slides = document.querySelectorAll('.slide');

// Initialize presentation
function initPresentation() {
    showSlide(0);
    startAutoPlay();
}

// Show specific slide
function showSlide(index) {
    // Hide all slides and reset animations
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
        slide.style.transform = 'translateX(100%)';
        
        // Reset all animations in the slide
        const animatedElements = slide.querySelectorAll('.slide-title, .slide-title i, .slide-description, .subject-item, .subject-title, .subject-title i, .title-item, .title-name, .title-name i, .title-level, .title-duration, .logo-img, .logo-item');
        animatedElements.forEach(element => {
            element.classList.remove('animate');
        });
    });

    // Show current slide
    slides[index].classList.add('active');
    slides[index].style.transform = 'translateX(0)';

    // Show previous slide for transition effect
    if (index > 0) {
        slides[index - 1].classList.add('prev');
        slides[index - 1].style.transform = 'translateX(-100%)';
    }

    currentSlideIndex = index;

    // Trigger animations for the active slide after a short delay
    setTimeout(() => {
        triggerSlideAnimations(index);
    }, 100);
}

// Trigger animations for specific slide
function triggerSlideAnimations(slideIndex) {
    const currentSlide = slides[slideIndex];
    if (!currentSlide) return;

    // Get all animated elements in the current slide
    const animatedElements = currentSlide.querySelectorAll('.slide-title, .slide-title i, .slide-description, .subject-item, .subject-title, .subject-title i, .title-item, .title-name, .title-name i, .title-level, .title-duration, .logo-img, .logo-item');
    
    // Add animate class to trigger animations
    animatedElements.forEach(element => {
        element.classList.add('animate');
    });
}

// Navigate to next slide
function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        showSlide(currentSlideIndex + 1);
    } else {
        // Loop back to the beginning
        showSlide(0);
    }
}

// Start auto-play mode
function startAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }

    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, SLIDE_DURATION);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initPresentation();

    // Hide navigation controls since it's fully automatic
    const controls = document.querySelector('.presentation-controls');
    if (controls) {
        controls.style.display = 'none';
    }
});
