async function getData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        // console.log(data);
        displayData(data);
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
    
}

getData()


async function displayData(data){
    const productList = document.querySelector('.productList');

    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="image">
            <img src=${product.image.desktop} alt="">
          </div>
          <div class="add-cart">
            <i class="fa-solid fa-cart-plus"></i>
            <p>Add to Cart</p>
          </div>
          <div class="details">
            <p class="name">${product.category}</p>
            <h3 class="title">${product.name}</h3>
            <span class="price">$${product.price}</span>
          </div>
          `
          productList.appendChild(productDiv);



    })
    console.log(productList)
}
