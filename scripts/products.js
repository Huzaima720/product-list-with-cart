async function getData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    // console.log(data);
    displayData(data);
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

getData();

async function displayData(data) {
  const productList = document.querySelector(".productList");

  data.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <div class="image">
            <img src=${product.image.desktop} alt="">
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
            <p class="name">${product.category}</p>
            <h3 class="title">${product.name}</h3>
            <span class="price">$${product.price}</span>
          </div>
          `;
    productList.appendChild(productDiv);
  });

  const products = productList.children;

  Array.from(products).forEach((product) => {
    // Add event listener for add to cart button
    const img = product.querySelector(".image");
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
      addToCart(product)
      displayCart()
    });
    plus.addEventListener("click", () => {
      quantity.innerText = parseInt(quantity.innerText) + 1;
      updateCart(product)
      displayCart()

    });
    minus.addEventListener("click", () => {
      if (quantity.innerText > 1) {
        quantity.innerText = parseInt(quantity.innerText) - 1;
        updateCart(product)
        displayCart()
      } else {
        quantity.innerText = 0;
        cartControlBtn.style.display = "none";
        addCartBtn.style.display = "flex";
        img.classList.remove("selected");
        removeFromCart(product)
        displayCart()
      }

    });
  });
}


