const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons');

let startX;
let currentIndex = 0;

// Add click event listeners to each button
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const slideWidth = slider.offsetWidth;
        // Determine the target scroll position based on the index of the button
        const targetScroll = slideWidth * index;
        // Scroll to the target position
        slider.scrollTo({
            left: targetScroll,
            behavior: 'smooth' // Smooth scroll behavior
        });
        console.log(`Image ${index + 1} clicked`);
        currentIndex = index; // Update the current index
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let intervalId;

    // Function to simulate a click on the current button
    function pressButton() {
        buttons[currentIndex].click();
        currentIndex = (currentIndex + 1) % buttons.length; // Loop back to 0 after reaching the last button
    }

    // Function to start the automatic cycling of buttons every 5 seconds
    function startAutoCycle() {
        intervalId = setInterval(pressButton, 5000);
    }

    function startResetCycle() {
        intervalId = setInterval(pressButton, 7000);
    }

    // Start the automatic cycling when the page loads
    startAutoCycle();

    // Function to reset the 5-second timer when a button is clicked
    function resetTimer() {
        clearInterval(intervalId);  // Clear the existing interval
        startResetCycle();  // Restart the interval
    }

    // Add event listeners to each button to reset the timer when clicked
    buttons.forEach(button => {
        button.addEventListener('click', resetTimer);
    });

    // Add touch event listeners for swipe functionality
    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);
    slider.addEventListener('touchend', handleTouchEnd, false);

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (!startX) {
            return;
        }

        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 50) { // Threshold for swipe detection
            if (diffX > 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % buttons.length;
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            }
            buttons[currentIndex].click();
            startX = null; // Reset startX to prevent multiple swipes
        }
    }

    function handleTouchEnd() {
        startX = null; // Reset startX when touch ends
    }
});
    
