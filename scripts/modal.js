

const order = document.querySelector(".cart .confirm ");

const modal = document.querySelector('.modal');


const orderItems = document.querySelector('.order-items');

order.addEventListener("click", () => {
    modal.showModal();
  modal.style.display = "flex"


  cart.forEach((item) =>{
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
        
            <div class="order-product">
              <img src="./assets/images/image-waffle-thumbnail.jpg" alt="">
              <div class="details">
                <h3 class="name">${item.name}e</h3>
                <p class="qty-price">${item.quantity} x $${item.price}</p>
              </div>
                </div>
                <div class="price">
                  <h2>$${item.totalPrice}</h2>
                </div>
   
           
        `
        orderItems.appendChild(itemDiv);
    
        
        
    })
    const closeModalBtn = document.querySelector('.model-footer');
    closeModalBtn.addEventListener('click', () =>{
        modal.style.display = 'none';
    })


})


