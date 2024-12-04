const slider = document.getElementById("imageSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let counter = 0;
console.log(slider.children.length)
const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentIndex * 300}px)`;
};

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        counter -= 6;
        updateSliderPosition();
    }
});

nextBtn.addEventListener("click", () => {
    if (counter < slider.children.length - 1) {
        currentIndex++;
        counter += 6;
        updateSliderPosition();
    }
});

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

let keyList  = document.querySelectorAll('.toggelers p');
keyList.forEach((key)=>{
    
    key.addEventListener("click",function(){
        for(let i=0; i<keyList.length;i++){
            keyList[i].classList.remove("toggelers-active");
            
        };
        key.classList.toggle("toggelers-active");
        
    }); 
    
}); 

let colorsList = document.querySelectorAll('ul.colors li');
console.log(colorsList)
function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215);
    // Convert the number to a hexadecimal string and pad with leading zeros if necessary
    return `#${randomColor.toString(16).padStart(6, '0')}`;
}

// Example usage
/* let bgColor;
// e.g., #a3c9f1
colorsList.forEach((color)=>{
    
     bgColor = getRandomHexColor();
     console.log(bgColor); 
     color.style.backgroundColor=`${bgColor}`

}) */

function formatText(command, value = null) {
    document.execCommand(command, false, value);
  }

  /* document.getElementById("save").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        window.location.href = "../Cart/Cart.html"; // Replace with your desired URL
    }
  }); */
 
  document.getElementById("home-logo").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        window.location.href = "index.html"; // Replace with your desired URL
    }
  });


  // Declare global variables
let priceCounter;
let tracker;
let countNumber;
let count; // The count element to update

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the data from the API
    fetch('http://custmize.digitalgo.net/api/get_single_product/DIHAW14054')
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            if (data.success) {
                const mainPrice = parseFloat(data.data.main_price); 
                const minimum = parseInt(data.data.min_sale, 10);
                console.log(data.data, minimum);

                // Update the piece price
                document.querySelector('.piecePrice').textContent = `${mainPrice}$`;

                // Initialize variables
                priceCounter = mainPrice * minimum; // Initial price based on the minimum sale
                countNumber = minimum;

                // Select DOM elements
                tracker = document.querySelector('#draggableDiv div span.totalPrice');
                count = document.querySelector('.count'); // The element that shows the count
              let num = 0;
              num = num + 5;
                // Set initial values
                if (tracker) tracker.innerText = `${priceCounter}$`;
                if (count) count.textContent = countNumber;

                // Add event listeners for plus and minus buttons
                const plus = document.querySelector('.fa-plus');
                const minus = document.querySelector('.fa-minus');

                if (plus) {
                    plus.addEventListener('click', () => {
                        countNumber += 1; // Increment the count
                        if (count) count.textContent = countNumber; // Update the count display
                        priceCounter = mainPrice * countNumber ; // Recalculate the total price
                        if (tracker) tracker.innerText = `${priceCounter.toFixed(2)}$`; // Update the price tracker
                    });
                }

                if (minus) {
                    minus.addEventListener('click', () => {
                        if (countNumber > minimum) {
                            countNumber -= 1; // Decrement the count
                            if (count) count.textContent = countNumber; // Update the count display
                            priceCounter = mainPrice * countNumber; // Recalculate the total price
                            if (tracker) tracker.innerText = `${priceCounter.toFixed(2)}$`; // Update the price tracker
                        }
                    });
                }
            } else {
                console.error("Product data not found or invalid:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
        });
});

// Other code related to slider and canvas...

  
  
  
    
 
    

    
  document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("canvas");
    const imageInput = document.getElementById("imageInput");
    const textInput = document.getElementById("textInput");
    const addTextButton = document.getElementById("addTextButton");
    const deleteButton = document.getElementById("deleteButton");
    const canvas = new fabric.Canvas(canvasElement);

    let logoPerSizePrice = 0; // Default price

// Function to fetch data from the API and resolve the data
function fetchPriceData() {
  return new Promise((resolve, reject) => {
    fetch('https://custmize.digitalgo.net/api/size_calculate')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          resolve(data.data); // Resolve with the fetched data
        } else {
          reject('Failed to fetch data');
        }
      })
      .catch(error => reject(error));
  });
}

let InitialPriceStack = [];
let flag = false;
// Function to calculate the logo price
function calculateLogoPrice() {
  fetchPriceData().then(data => {
    InitialPriceStack.push(logoPerSizePrice);
    // Listen for object scaling event on the canvas
    canvas.on('object:scaling', (e) => {
          flag = true;
      const activeObject = e.target; // Get the object being resized
      if (activeObject) {
        const width = activeObject.width * activeObject.scaleX; // Scaled width
        const height = activeObject.height * activeObject.scaleY; // Scaled height
        console.log(`Width: ${width}, Height: ${height}`);

        // Calculate the area (width * height)
        const area = width * height;

        // Extract percentage and factor from the API data
        const percentage = parseFloat(data.persantige); // from the API response
        const factor = parseFloat(data.factor); // from the API response

        // Apply the formula: area * percentage
        const result = area * percentage;

        // Compare the result with the factor and set the price accordingly
        if (result < factor) {
          logoPerSizePrice = 0.5;
        } else if (result === factor) {
          logoPerSizePrice = 1;
        } else {
          logoPerSizePrice = 1.5;
        }

        // Log the final price for testing purposes
        console.log(`Final Logo Price: ${logoPerSizePrice}`);
        let flag = false;
        
        if ( logoPerSizePrice !== InitialPriceStack[0]){
          console.log(InitialPriceStack[0])
          priceCounter -= InitialPriceStack[0];
          
          priceCounter += logoPerSizePrice;
          InitialPriceStack = []
          InitialPriceStack.push(logoPerSizePrice)
          tracker.innerText = `${priceCounter}$`;
        }
        
        InitialPriceStack.push(logoPerSizePrice);
        
        
      }
    });
  }).catch(error => {
    console.error('Error fetching price data:', error);
  });
}

// Call the calculateLogoPrice function to initiate the process
calculateLogoPrice();

// Later in your synchronous code, you can access logoPerSizePrice
console.log('Current Logo Price:', logoPerSizePrice);

    // Add image to canvas
    imageInput.addEventListener("change", (e) => {
      const imgObj = e.target.files[0];
      if (imgObj) {
        const reader = new FileReader();
        calculateLogoPrice();
        priceCounter += logoPerSizePrice;
        console.log(priceCounter);
        tracker.innerText = `${priceCounter }$`
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;

          imageElement.onload = function () {
            const image = new fabric.Image(imageElement);
            image.set({
              left: 0,
              top: 0,
              scaleY: 0.1,
              scaleX: 0.1,
            });
            canvas.add(image);
            canvas.centerObject(image);
            canvas.setActiveObject(image);
           
          
          console.log(`Image width: ${imgWidth}, Image height: ${imgHeight}`);
          };

          // Reset the file input to allow uploading the same file again
          imageInput.value = "";
        };

        reader.readAsDataURL(imgObj);
      }
    });

   // Add styled text from the contenteditable div
   
   const editor = document.querySelector('.editor');

   addTextButton.addEventListener('click', () => {
    const styledHTML = editor.innerHTML.trim();
    if (styledHTML) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = styledHTML;
      calculateLogoPrice();
       priceCounter += logoPerSizePrice; 
      tracker.innerText = `${priceCounter }$` 
      let topPosition = 50; // Starting vertical position for text

      Array.from(tempDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Add plain text
          const textObject = new fabric.Text(node.textContent, {
            left: 50,
            top: topPosition,
            fontSize: 16,
            fill: 'black',
            fontFamily: 'Arial',
          });
          canvas.add(textObject);
          topPosition += 30; // Adjust top for next text
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Add styled text
          const styles = window.getComputedStyle(node);
          const textObject = new fabric.Text(node.textContent, {
            left: 50,
            top: topPosition,
            fontSize: parseInt(styles.fontSize),
            fill: styles.color,
            fontFamily: styles.fontFamily,
            fontStyle: styles.fontStyle,
            fontWeight: styles.fontWeight,
            textDecoration: styles.textDecorationLine,
          });
          canvas.add(textObject);
          topPosition += 30; // Adjust top for next text
        }
      });

      canvas.renderAll();
    } else {
      alert('Please enter some text in the editor.');
    }
  });

   // Optional: Add placeholder functionality
   /* editor.addEventListener('focus', () => {
     if (editor.dataset.placeholder && editor.innerText.trim() === '') {
       editor.innerText = '';
     }
   });

   editor.addEventListener('blur', () => {
     if (editor.innerText.trim() === '') {
       editor.innerText = editor.dataset.placeholder;
     }
   }); */
    // Delete selected item from canvas
    deleteButton.addEventListener("click", () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        calculateLogoPrice();
         priceCounter -= logoPerSizePrice; 
         tracker.innerText = `${priceCounter }$` 
      } else {
        alert("No item selected to delete!");
      }
    });
  });

 
  
 

function saveToLocalStorage() {
    const node = document.getElementById('tshirt-div'); // Div containing both the image and the canvas

    domtoimage.toPng(node).then(function (dataUrl) {
        // Retrieve existing images from local storage if available
        let images = JSON.parse(localStorage.getItem('tshirtImages')) || [];
        let prices =  JSON.parse(localStorage.getItem('fruits')) || [];
        
        // Add the new image to the array
        images.push(dataUrl);
        prices.push(priceCounter);
        console.log(prices);
        localStorage.setItem('fruits', JSON.stringify(prices));
        // Save the updated array back to local storage
        localStorage.setItem('tshirtImages', JSON.stringify(images));
        
        
        alert('تم حفظ طلبك تحقق من سلة التسوق');
        updateCartCount();
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    
    

}

// Get the button and the file input
const triggerButton = document.getElementById('triggerButton');
const imageInput = document.getElementById('imageInput');

// Add click event listener to the button
triggerButton.addEventListener('click', () => {
    imageInput.click(); // Trigger the file input
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


const imageSlider1 = document.querySelectorAll('.image-slider img'); // Get all images inside the imageSlider
            console.log(imageSlider1);
            imageSlider1.forEach((img) => {
                img.addEventListener('click', () => {
                    const imageUrl = img.src; // Get the source of the clicked image
                    document.getElementById('image').src = imageUrl; 
                    console.log(imageUrl);// Change the main product image to the clicked image
                });
            });

