// console.clear();

let contentTitle;

console.log(document.cookie);

// Initialize cart badge
function updateCartBadge() {
  try {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const badge = document.getElementById("badge");
    if (badge) {
      badge.innerHTML = totalQuantity || '0';
    }
  } catch (error) {
    console.error('Error updating cart badge:', error);
    const badge = document.getElementById("badge");
    if (badge) {
      badge.innerHTML = '0';
    }
  }
}

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("THB " + ob.price.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }));
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// Load products from local API
async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products = await response.json();
    
    // Update cart badge
    updateCartBadge();
    
    // Clear existing content
    containerClothing.innerHTML = '';
    containerAccessories.innerHTML = '';
    
    // Sort products by category
    products.forEach(product => {
      if (product.isAccessory) {
        containerAccessories.appendChild(dynamicClothingSection(product));
        } else {
        containerClothing.appendChild(dynamicClothingSection(product));
        }
    });
  } catch (error) {
    console.error('Error loading products:', error);
    mainContainer.innerHTML = '<h2>Error loading products. Please try again later.</h2>';
  }
}

// Load products when page loads
loadProducts();
