// Ranking Loop Script
// This script runs on the ranking page to handle the infinite loop

// Timing configuration
const RANKING_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to return to presentation after ranking duration
function returnToPresentation() {
    // Return to the presentation page
    window.location.href = 'https://codes-unlu.github.io/Web-Expo/';
}

// Start the countdown to return to presentation
function startRankingCountdown() {
    console.log('Ranking phase started. Returning to presentation in 5 minutes...');
    
    // Set timeout to return to presentation
    setTimeout(() => {
        console.log('Ranking phase completed. Returning to presentation...');
        returnToPresentation();
    }, RANKING_DURATION);
    
    // Add visual countdown indicator
    addCountdownIndicator();
}

// Add visual countdown indicator
function addCountdownIndicator() {
    const countdownIndicator = document.createElement('div');
    countdownIndicator.id = 'countdownIndicator';
    countdownIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 0, 255, 0.2);
        color: #ff00ff;
        padding: 10px 15px;
        border-radius: 20px;
        font-family: 'Orbitron', sans-serif;
        font-size: 12px;
        font-weight: bold;
        z-index: 1001;
        border: 2px solid #ff00ff;
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(countdownIndicator);
    
    // Update countdown every second
    let timeLeft = RANKING_DURATION;
    const countdownInterval = setInterval(() => {
        timeLeft -= 1000;
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        
        countdownIndicator.innerHTML = `⏰ ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
    
    // Initial update
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    countdownIndicator.innerHTML = `⏰ ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start the ranking countdown
    startRankingCountdown();
    
    // Add keyboard shortcut to manually return to presentation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('Manual return to presentation triggered');
            returnToPresentation();
        }
    });
    
    console.log('Ranking loop script initialized');
});
