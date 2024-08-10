let cart = [];

async function addToCart(product) {

  let name = product.querySelector(".name").innerText;
  
  let price = product.querySelector(".price").innerText;
  price = parseFloat(price.replace(/[^0-9.]/g, ""));
  let quantity = product.querySelector(".quantity").innerText;
  let totalPrice = parseFloat(price) * parseFloat(quantity);
 

  let item = {
    name,
    price,
    quantity,
    totalPrice,
  };

  cart.push(item);
  displayCart();
}

function updateCart(product) {
  let name = product.querySelector(".name").innerText;
  let price = product.querySelector(".price").innerText;
  price = parseFloat(price.replace(/[^0-9.]/g, ""));

  let quantity = product.querySelector(".quantity").innerText;
  let totalPrice = parseFloat(price) * parseFloat(quantity);

  let item = cart.find((item) => item.name === name);
  item.quantity = quantity;
  item.totalPrice = totalPrice;
  displayCart();
}

function removeFromCart(product) {
  let name = product.querySelector(".name").innerText;
  cart = cart.filter((item) => item.name !== name);

  resetProductCard(name);
  displayCart();
}

function generateCartTotal() {
  let total = 0;
  cart.forEach((item) => {
    total += item.totalPrice;
  });
  return total.toFixed(2);
}

const EmptyCart = document.querySelector(".emptyCart");
const CartItems = document.querySelector(".items");
const cartDetails = document.querySelector(".cart .details");
const cartTotal = document.querySelector(".cart-total h2");


function displayCart() {
  if (cart.length > 0) {
    EmptyCart.style.display = "none";
    CartItems.style.display = "block";
    cartDetails.style.display = "block";

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
    
    const items = CartItems.querySelectorAll('.item')
    items.forEach(item => {
     const removeBtn = item.querySelector('.icon')
     removeBtn.addEventListener('click', () =>{
      // let name = item.querySelector(".name").innerText;
      // console.log(name);


      removeFromCart(item)
      displayCart()

     })
    });
    cartTotal.innerText =
      "$" +  generateCartTotal()
  } else if (cart.length == 0) {
    EmptyCart.style.display = "flex";
    CartItems.style.display = "none";
    cartDetails.style.display = "none";

    
  }
}


