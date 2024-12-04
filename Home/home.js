/* import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'; */

/* 
let currentIndex = 0;
            const totalSlides = 2;

            function moveToSlide(index) {
                currentIndex = index;
                const radioToCheck = document.getElementById(`radio${index + 1}`);
                if (radioToCheck) radioToCheck.checked = true;
            }

            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                moveToSlide(currentIndex);
            }, 5000); 

let panelsElement = document.querySelectorAll('.panel'); */


/* let removeActiveClasses = () => {
    panelsElement.forEach(panel => {
        panel.classList.remove('active');
    });
};

panelsElement.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
}); */

document.getElementById("three-canvas").addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
      window.location.href = "customize.html"; // Replace with your desired URL
  }
});
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


const canvas = document.getElementById("three-canvas");
const tooltip = document.getElementById("tooltip");

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    tooltip.style.left = `${e.clientX - rect.left}px`;
    tooltip.style.top = `${e.clientY - rect.top}px`;
});

canvas.addEventListener("mouseover", () => {
    tooltip.style.display = "block";

});

canvas.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
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

