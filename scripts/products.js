let data 
async function getData() {
  try {
    const response = await fetch("data.json");
    data = await response.json();
    // console.log(data);
    displayData(data);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

getData();


// Fetch data from JSON file and display it in the product list
const productList = document.querySelector(".productList");

async function displayData(data) {
  data.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <div class="image">
            <picture >
            <source srcset="${product.image.mobile}" media="(max-width: 568px)">
            <source srcset="${product.image.tablet}" media="(max-width: 768px)">
            <source srcset="${product.image.desktop}" media="(min-width: 769px)">
            <img src=${product.image.desktop} alt="">
            </picture>
          </div>
          <div class="add-cart btn">
            <i class="fa-solid fa-cart-plus"></i>
            <p>Add to Cart</p>
          </div>
          <div class="cart-control btn ">
            <i class="fa-solid fa-plus"></i>
            <p class="quantity">0</p>
            <i class="fa-solid fa-minus"></i>
          </div>
          <div class="details">
            <p class="category">${product.category}</p>
            <h3 class="name">${product.name}</h3>
            <span class="price">$${product.price}</span>
          </div>
          `;
    productList.appendChild(productDiv);
  });

  const products = productList.children;

  Array.from(products).forEach((product) => {
    // Add event listener for add to cart button
    const img = product.querySelector(".image ");
    const addCartBtn = product.querySelector(".add-cart");
    const cartControlBtn = product.querySelector(".cart-control");
    const quantity = product.querySelector(".quantity");
    const plus = product.querySelector(".fa-plus");
    const minus = product.querySelector(".fa-minus");

    addCartBtn.addEventListener("click", () => {
      // Show cart control buttons and hide add to cart button
      cartControlBtn.style.display = "flex";
      addCartBtn.style.display = "none";
      img.classList.toggle("selected");
      if (parseInt(quantity.innerText) === 0) {
        quantity.innerText = 1;
      }
      addToCart(product);
      displayCart();
    });
    plus.addEventListener("click", () => {
      quantity.innerText = parseInt(quantity.innerText) + 1;
      updateCart(product);
      displayCart();
    });
    minus.addEventListener("click", () => {
      if (quantity.innerText > 1) {
        quantity.innerText = parseInt(quantity.innerText) - 1;
        updateCart(product);
        displayCart();
      } else {
        quantity.innerText = 0;
        cartControlBtn.style.display = "none";
        addCartBtn.style.display = "flex";
        img.classList.remove("selected");
        removeFromCart(product);
        displayCart();
      }
    });
  });
}

 function getProduct(name){
  return data.find(item => item.name === name)
}


function resetProductCard(name) {
  const products = productList.children;

  Array.from(products).forEach((product) => {
    const productName = product.querySelector(".name").innerText;
    const img = product.querySelector(".image");
    const addCartBtn = product.querySelector(".add-cart");
    const cartControlBtn = product.querySelector(".cart-control");
    const quantity = product.querySelector(".quantity");
    if (productName === name) {
      img.classList.remove("selected");
      addCartBtn.style.display = "flex";
      cartControlBtn.style.display = "none";
      quantity.innerText = 0;
    }
  });
}

function resetAllProducts() {
  const products = productList.children;
  Array.from(products).forEach((product) => {
    const productName = product.querySelector(".name").innerText;
    const img = product.querySelector(".image");
    const addCartBtn = product.querySelector(".add-cart");
    const cartControlBtn = product.querySelector(".cart-control");
    const quantity = product.querySelector(".quantity");

    img.classList.remove("selected");
    addCartBtn.style.display = "flex";
    cartControlBtn.style.display = "none";
    quantity.innerText = 0;
  });
}
