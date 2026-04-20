// --- CONFIGURATION ---
// REPLACE THIS URL with your deployed Google Apps Script Web App URL
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyntl9KgopGO3kzGrw3Clj2LyPNDmTDArgLHmP-9DIx8clNjOHNOKLZXwfOcAVx6e8i/exec";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Location from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const locationName = urlParams.get('location') || 'Unknown Location';
    
    // Log for debugging
    console.log(`Kiosk initialized for location: ${locationName}`);

    // 2. DOM Elements
    const feedbackView = document.getElementById('feedback-view');
    const thankYouView = document.getElementById('thank-you-view');
    const buttons = document.querySelectorAll('.feedback-btn');

    // 3. Event Listeners for Buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sentiment = this.getAttribute('data-sentiment');
            handleFeedback(sentiment);
        });
    });

    // 4. Main Handler Function
    function handleFeedback(sentiment) {
        // Prevent multiple clicks while animating
        if (thankYouView.classList.contains('active')) return;

        const timestamp = new Date().toISOString();

        // Prepare data payload
        const payload = {
            timestamp: timestamp,
            location: locationName,
            sentiment: sentiment
        };

        // Send data to webhook
        sendData(payload);

        // UI Transition
        showThankYouScreen();
    }

    // 5. Send Data to Google Apps Script
    function sendData(data) {
        if (WEBHOOK_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
            console.warn("Webhook URL not configured. Data not sent.", data);
            return;
        }

        fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Essential to prevent CORS blocking from Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Feedback sent successfully (no-cors mode).");
        }).catch(error => {
            console.error("Error sending feedback:", error);
        });
    }

    // 6. UI Transitions
    function showThankYouScreen() {
        // Hide Feedback View
        feedbackView.classList.remove('active');
        feedbackView.classList.add('hidden');

        // Show Thank You View
        thankYouView.classList.remove('hidden');
        // Small delay to allow display:block to apply before transition
        setTimeout(() => {
            thankYouView.classList.add('active');
        }, 50);

        // Reset after 3 seconds
        setTimeout(resetViews, 3000);
    }

    function resetViews() {
        // Hide Thank You View
        thankYouView.classList.remove('active');
        
        setTimeout(() => {
            thankYouView.classList.add('hidden');
            
            // Show Feedback View
            feedbackView.classList.remove('hidden');
            setTimeout(() => {
                feedbackView.classList.add('active');
            }, 50);
        }, 500); // Wait for fade out transition
    }
});
