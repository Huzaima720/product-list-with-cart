let cart = [];

function addToCart(product) {
  let name = product.querySelector(".name").innerText;
  let price = product.querySelector(".price").innerText;
  price = parseInt(price.replace(/[^0-9]/g, ""));
  let quantity = product.querySelector(".quantity").innerText;
  let totalPrice = parseInt(price) * parseInt(quantity);

  let item = {
    name,
    price,
    quantity,
    totalPrice,
  };

  cart.push(item);
}

function updateCart(product) {
  let name = product.querySelector(".name").innerText;
  let price = product.querySelector(".price").innerText;
  price = parseInt(price.replace(/[^0-9]/g, ""));

  let quantity = product.querySelector(".quantity").innerText;
  let totalPrice = parseInt(price) * parseInt(quantity);

  let item = cart.find((item) => item.name === name);
  item.quantity = quantity;
  item.totalPrice = totalPrice;
}

function removeFromCart(product) {
  let name = product.querySelector(".name").innerText;

  cart = cart.filter((item) => item.name !== name);
}
const EmptyCart = document.querySelector(".emptyCart");
const CartItems = document.querySelector(".items");

function displayCart() {
  if (cart.length > 0) {
    EmptyCart.style.display = "none";
    CartItems.style.display = "block";
    CartItems.innerHTML = "";
    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemDiv.innerHTML = `
            <div>
            <p class="name">${item.name}</p>
            <span class="qty">${item.quantity}x </span>
            <span class="price">@${item.price} </span>
            <span class="total">${item.totalPrice} </span>
          </div>
          <div>
            <i class="fa-regular fa-circle-xmark icon"></i>
          </div>
            `;
            CartItems.appendChild(itemDiv);
    });
    
  } else if (cart.length == 0) {
    EmptyCart.style.display = "flex";
    CartItems.style.display = "none";
  }
}
