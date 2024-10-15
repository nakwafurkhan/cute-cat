const duration = 5; // duration in seconds

// Function to generate a random number up to a specified maximum
function random(num) {
    return Math.floor(Math.random() * num);
}

// Function to generate a random number within a specified range
function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to get random styles for the balloons
function getRandomStyles() {
    var r = random(255); // Random red value
    var g = random(255); // Random green value
    var b = random(255); // Random blue value
    var mt = random(200); // Random top margin
    var ml = random(50); // Random left margin
    var dur = random(5) + 5; // Random duration (5 to 10 seconds)
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7);
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

// Function to create a balloon and append it to the balloon container
function createBalloon(balloonContainer) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);

    // Remove the balloon after the specified duration
    setTimeout(() => {
        balloonContainer.remove();
    }, duration * 1000);
}

// Function to create a specified number of balloons
function createBalloons(num) {
    var balloonContainer = document.createElement("div");
    balloonContainer.id = "balloon-container";
    document.body.appendChild(balloonContainer);

    for (var i = num; i > 0; i--) {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(function () {
            createBalloon(balloonContainer);
        });
    }
}

// Function to create fireworks
function createFireworks() {
    for (var i = 0; i < 20; i++) {
        (function () {
            var firework = document.createElement("div");
            firework.className = "firework";
            firework.style.left = Math.random() * window.innerWidth + "px";
            firework.style.top = Math.random() * window.innerHeight + "px";
            document.body.appendChild(firework);

            // Remove the fireworks after the specified duration
            setTimeout(function () {
                firework.remove();
            }, duration * 1000);
        })();
    }
}

// Function to create a thunderstorm effect
function createThunderstorm() {
    var thunderstormContainer = document.createElement('div');
    thunderstormContainer.id = 'thunderstorm';

    document.body.appendChild(thunderstormContainer);

    // Create raindrops at intervals
    const rain = setInterval(function () {
        createRaindrop(thunderstormContainer);
    }, 50);

    // Stop the rain and remove the thunderstorm after the specified duration
    setTimeout(function () {
        clearInterval(rain);
        thunderstormContainer.remove();
    }, duration * 1000);
}

// Function to create raindrops
function createRaindrop(thunderstormContainer) {
    const raindrop = document.createElement("div");
    raindrop.className = "raindrop";
    thunderstormContainer.appendChild(raindrop);

    const startX = random_range(0, window.innerWidth); // Random starting X position
    const startY = random_range(-10, -5); // Random starting Y position above the screen
    const duration = random_range(0.5, 2); // Random duration for falling

    // Use GSAP to animate the raindrop falling
    gsap.fromTo(
        raindrop,
        { x: startX, y: startY, opacity: 1 },
        {
            x: startX + 20,
            y: window.innerHeight + 20,
            opacity: 0,
            duration,
            ease: "linear",
            onComplete: () => {
                thunderstormContainer.removeChild(raindrop); // Remove the raindrop after animation
            }
        }
    );
}

// Function to show a funny message on the screen
function showFunnyMessage(message) {
    // Create a div for the funny message
    var funnyMessageDiv = document.createElement('div');
    funnyMessageDiv.className = 'funny-message';
    funnyMessageDiv.textContent = message;

    // Append the div to the body
    document.body.appendChild(funnyMessageDiv);

    // Remove the message after the specified duration
    setTimeout(function () {
        funnyMessageDiv.remove();
    }, duration * 1000); // Remove the message after (n) seconds
}

// Function to show a dancing cat animation
function showDancingCat(referenceImage) {
    // Change the gif image to the dancing cat
    referenceImage.src = 'public/cat-state-2.gif';

    // Change back to the original image after the specified duration
    setTimeout(function () {
        referenceImage.src = 'public/cat-state-1.gif';
    }, duration * 1000);
}

// Function to show a crying cat animation
function showCryingCat(referenceImage) {
    // Change the gif image to the crying cat
    referenceImage.src = 'public/cat-state-4.gif';

    // Change back to the original image after the specified duration
    setTimeout(function () {
        referenceImage.src = 'public/cat-state-1.gif';
    }, duration * 1000);
}

// Function to preload images
function preloadImages() {
    // Array to store image URLs
    const imageUrls = [
        'public/cat-state-1.gif',
        'public/cat-state-2.gif',
        'public/cat-state-3.gif',
        'public/cat-state-4.gif',
    ];

    // Iterate through each image URL
    imageUrls.forEach(url => {
        // Create a new image element
        const img = new Image();

        // Set the image source to preload the image
        img.src = url;
    });
}

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Preload images when the window loads
    preloadImages();

    // Get the "Yes" button element
    var yesButton = document.querySelector('button:nth-of-type(1)');
    var noButton = document.querySelector('button:nth-of-type(2)');

    // Get the image element
    var imageElement = document.querySelector('img');

    // Check for smartphone compatibility
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    var isMouseOver = false;

    var mouseLeaveTimeout;

    // Add a mouseover event listener to the image element
    imageElement.addEventListener('mouseover', function () {
        if (!isTouchDevice) {
            isMouseOver = true;
            imageElement.src = 'public/cat-state-3.gif'; // Change to a different image on hover
        }
    });

    // Add a mouseleave event listener to the image element
    imageElement.addEventListener('mouseleave', function () {
        if (!isTouchDevice) {
            clearTimeout(mouseLeaveTimeout);

            // Set a delay before changing the image source on mouseleave
            mouseLeaveTimeout = setTimeout(function () {
                isMouseOver = false;
                imageElement.src = 'public/cat-state-1.gif'; // Change back to the original image
            }, 300); // Adjust the delay as needed
        }
    });

    // Add a touchstart event listener to the image element
    imageElement.addEventListener('touchstart', function () {
        if (isMouseOver) {
            return; // Do not change if already hovered
        }

        isMouseOver = false;

        // Change the image source when the image is clicked
        imageElement.src = 'public/cat-state-3.gif';

        // Reset the image source after (n) seconds
        setTimeout(function () {
            if (!imageElement.src.includes('public/cat-state-2.gif') &&
                !imageElement.src.includes('public/cat-state-4.gif')) {
                imageElement.src = 'public/cat-state-1.gif'; // Change back to the original image
            }
        }, 1500); // Duration to reset the image
    });

    // Add a click event listener to the "Yes" button
    yesButton.addEventListener('click', function () {
        // Show dancing cat
        showDancingCat(imageElement);

        // Create floating balloons
        createBalloons(50);

        // Create fireworks on "Yes" button click
        createFireworks();

        // Add a funny message when the "Yes" button is clicked
        showFunnyMessage("You're full of energy! Awesome! 🌟");
    });

    // Add a click event listener to the "No" button
    noButton.addEventListener('click', function () {
        // Show crying cat
        showCryingCat(imageElement);

        // Make it rain
        createThunderstorm();

        // Add a funny message when the "No" button is clicked
        showFunnyMessage("I want to see you smile 💔");
    });
});
