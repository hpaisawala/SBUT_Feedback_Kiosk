// --- CONFIGURATION ---
// Ensure the URL is inside quotes to avoid syntax errors
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyntl9KgopGO3kzGrw3Clj2LyPNDmTDArgLHmP-9DIx8clNjOHNOKLZXwfOcAVx6e8i/exec";

document.addEventListener('DOMContentLoaded', () => {
    let activeLocation = '';

    // 1. DOM Elements
    const setupView = document.getElementById('setup-view');
    const feedbackView = document.getElementById('feedback-view');
    const thankYouView = document.getElementById('thank-you-view');
    const locationDropdown = document.getElementById('location-dropdown');
    const startBtn = document.getElementById('start-kiosk');
    const feedbackButtons = document.querySelectorAll('.feedback-btn');

    // 2. Handle Initial Kiosk Setup
    startBtn.addEventListener('click', () => {
        const selectedValue = locationDropdown.value;
        if (selectedValue) {
            activeLocation = selectedValue;
            
            // Hide Setup, Show Feedback
            setupView.classList.remove('active');
            setupView.classList.add('hidden');
            
            feedbackView.classList.remove('hidden');
            setTimeout(() => {
                feedbackView.classList.add('active');
            }, 50);
        } else {
            alert('Please select a location to begin.');
        }
    });

    // 3. Feedback Button Listeners
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (thankYouView.classList.contains('active')) return;
            
            const sentiment = this.getAttribute('data-sentiment');
            const payload = {
                timestamp: new Date().toISOString(),
                location: activeLocation, // Use the location from the dropdown
                sentiment: sentiment
            };

            sendData(payload);
            showThankYouScreen();
        });
    });

    // 4. Data Transmission
    function sendData(data) {
        fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(error => {
            console.error("Error sending feedback:", error);
        });
    }

    // 5. UI Transitions
    function showThankYouScreen() {
        feedbackView.classList.remove('active');
        setTimeout(() => {
            feedbackView.classList.add('hidden');
            thankYouView.classList.remove('hidden');
            setTimeout(() => {
                thankYouView.classList.add('active');
            }, 50);
        }, 500);

        // Auto-reset to Feedback View after 3 seconds
        setTimeout(() => {
            thankYouView.classList.remove('active');
            setTimeout(() => {
                thankYouView.classList.add('hidden');
                feedbackView.classList.remove('hidden');
                setTimeout(() => {
                    feedbackView.classList.add('active');
                }, 50);
            }, 500);
        }, 3000);
    }
});
