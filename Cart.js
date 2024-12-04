const draggableDiv = document.getElementById("draggableDiv");
console.log(draggableDiv)
// Variables to store the current position and the offset
let isDragging = false;
let offsetX, offsetY;

// Mouse down: Initialize dragging
draggableDiv.addEventListener("mousedown", (event) => {
    isDragging = true;

    // Calculate the offset from the mouse position to the top-left corner of the div
    offsetX = event.clientX - draggableDiv.offsetLeft;
    offsetY = event.clientY - draggableDiv.offsetTop;

    // Add event listeners for mousemove and mouseup
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

// Function to handle the dragging
function onMouseMove(event) {
    if (!isDragging) return;

    // Calculate the new position
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    // Update the position of the div
    draggableDiv.style.left = `${x}px`;
    draggableDiv.style.top = `${y}px`;
}

// Mouse up: Stop dragging
function onMouseUp() {
    isDragging = false;

    // Remove event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}
function hideData(){
    document.querySelector(`.exit`).style='display:none';
    document.querySelector(`.otp`).style='display:none';}
function showData(){
    document.querySelector(`.exit`).style='display:block';
    document.querySelector(`.otp`).style='display:block';}
document.getElementById("home-logo").addEventListener("click", function (event) {
        if (event.target === event.currentTarget) {
            window.location.href = "index.html"; // Replace with your desired URL
        }
      });
      window.addEventListener('DOMContentLoaded', (event) => {
        const loginLink = document.getElementById('loginLink');
        
        const userName = localStorage.getItem('userName');
        
        if (userName) {
            // If userName exists in localStorage, update the link to show the user's name
            loginLink.innerHTML = `<i class="fa-solid fa-user"></i> مرحبًا, ${userName}`;
            loginLink.setAttribute('href', 'Profile.html'); // Prevent navigation to login page
            
      
        }
      });

      logoButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Replace with your desired URL
    });
    window.onload = function() {
        updateCartCount();
      };
      
      function updateCartCount() {
        // Retrieve the fruits array from localStorage
        let fruits = JSON.parse(localStorage.getItem('fruits')) || [];
        
        // Get the cart count element
        const cartCount = document.getElementById('cart-count');
        
        // Check if fruits array has any items
        if (fruits.length > 0) {
            // Show the red dot with the number of items
            cartCount.style.display = 'block';
            cartCount.textContent = fruits.length;
        } else {
            // Hide the red dot if no items
            cartCount.style.display = 'none';
        }
      }