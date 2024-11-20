const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons');

let currentIndex = 0;
let intervalId;
let startX;

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

slider.addEventListener('touchstart', function(event) {
    event.preventDefault();
    startX = event.touches[0].clientX;
});

slider.addEventListener('touchmove', function(event) {
    event.preventDefault();
    // No need to do anything here for now
});

slider.addEventListener('touchend', function(event) {
    event.preventDefault();
    const endX = event.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // Threshold for swipe detection
        if (diffX > 0) {
            // Swipe left, show next image
            currentIndex = (currentIndex + 1) % buttons.length;
            console.log('Swiping left');
        } else {
            // Swipe right, show previous image
            currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            console.log('Swiping right');
        }
        buttons[currentIndex].click();
    }
});

// Function to simulate a click on the current button
function pressButton() {
    buttons[currentIndex].click();
    currentIndex = (currentIndex + 1) % buttons.length; // Loop back to 0 after reaching the last button
}

// Function to start the automatic cycling of buttons every 5 seconds
function startAutoCycle() {
    intervalId = setInterval(pressButton, 5000);
}

// Function to start the automatic cycling of buttons every 7 seconds
function startResetCycle() {
    intervalId = setInterval(pressButton, 7000);
}

document.addEventListener('DOMContentLoaded', function() {
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
});
