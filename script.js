// Presentation State
let currentSlideIndex = 0;
const totalSlides = 23; // Updated to include motivational slide
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
    const animatedElements = currentSlide.querySelectorAll('.slide-title, .slide-title i, .slide-description, .subject-item, .subject-title, .subject-title i, .title-item, .title-name, .title-name i, .title-level, .title-duration, .logo-img, .logo-item, .motivational-item, .motivational-text, .motivational-text i, .final-message, .final-text, .final-text i');
    
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
    initTVOptimizations();

    // Hide navigation controls since it's fully automatic
    const controls = document.querySelector('.presentation-controls');
    if (controls) {
        controls.style.display = 'none';
    }
});

// TV Optimizations
function initTVOptimizations() {
    // Auto-fullscreen for TV displays
    if (window.innerWidth >= 1920) {
        requestFullscreen();
    }
    
    // Hide cursor on TV displays
    if (window.innerWidth >= 1920) {
        document.body.style.cursor = 'none';
    }
    
    // Prevent accidental exits
    document.addEventListener('keydown', function(e) {
        if (window.innerWidth >= 1920) {
            // Prevent F11, Alt+F4, Ctrl+W, etc.
            if (e.key === 'F11' || 
                (e.altKey && e.key === 'F4') || 
                (e.ctrlKey && e.key === 'w') ||
                (e.ctrlKey && e.key === 'W')) {
                e.preventDefault();
                return false;
            }
        }
    });
    
    // Prevent right-click context menu on TV
    document.addEventListener('contextmenu', function(e) {
        if (window.innerWidth >= 1920) {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevent text selection on TV
    document.addEventListener('selectstart', function(e) {
        if (window.innerWidth >= 1920) {
            e.preventDefault();
            return false;
        }
    });
    
    // Keep screen awake
    if (window.innerWidth >= 1920) {
        keepScreenAwake();
    }
}

// Request fullscreen
function requestFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

// Keep screen awake
function keepScreenAwake() {
    // Wake lock API (if supported)
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').then(function(lock) {
            console.log('Screen wake lock active');
        }).catch(function(err) {
            console.log('Wake lock error:', err);
        });
    }
    
    // Fallback: simulate user activity
    setInterval(function() {
        if (window.innerWidth >= 1920) {
            // Simulate minimal mouse movement to prevent screen saver
            const event = new MouseEvent('mousemove', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: Math.random() * 10,
                clientY: Math.random() * 10
            });
            document.dispatchEvent(event);
        }
    }, 30000); // Every 30 seconds
}

// Handle fullscreen changes
document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
        console.log('Entered fullscreen mode');
        // Additional fullscreen optimizations
        document.body.style.cursor = 'none';
    } else {
        console.log('Exited fullscreen mode');
        // Re-enter fullscreen if on TV
        if (window.innerWidth >= 1920) {
            setTimeout(requestFullscreen, 1000);
        }
    }
});

// Handle visibility changes (prevent sleep)
document.addEventListener('visibilitychange', function() {
    if (window.innerWidth >= 1920 && document.hidden) {
        // Try to keep the page visible
        document.title = 'UNLu Presentación';
    }
});
