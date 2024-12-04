document.getElementById("home-logo").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        window.location.href = "index.html"; // Replace with your desired URL
    }
  });
let offer = document.querySelector('.offer');
let tracker = document.querySelector('.tracker');
let trackerCommand = document.querySelector('.tracker-command');
let form =  document.querySelector('form');
let profile = document.querySelector('a.profile');
console.log(offer,form,profile);
profile.addEventListener('click',()=>{
    offer.style.display='flex';
    form.style.display='flex';
    tracker.style.display='none';

})
trackerCommand.addEventListener('click',()=>{
    offer.style.display='none';
    form.style.display='none';
    tracker.style.display='flex';

})

window.addEventListener('DOMContentLoaded', (event) => {
    const logoutLink = document.getElementById('logoutLink');
    
    logoutLink.addEventListener('click', (event) => {
        // Prevent the default anchor link behavior
        event.preventDefault();
        
        // Clear the localStorage
        localStorage.clear();
        
        // Redirect to the home page
        window.location.href = 'index.html';  // Update the URL based on your home page
    });
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