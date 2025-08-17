

function drawTour(){
    fetch("http://localhost:3000/cart/list-json", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: localStorage.getItem('cart') 
})
    .then(response => response.json())
    .then(data => {
        
            const htmlArray=data.tour.map((item, index) => {
                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td><img src="${item.image}" alt="${item.infoTour.title}" width="80px" /></td>
                        <td><a href="/tours/detail/${item.infoTour.slug}" class="text-decoration-none">${item.infoTour.title}</a></td>
                        <td>${item.price_special.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td>
                            <input type="number" min="1" 
                            value="${item.quantity}"
                             item-id="${item.tourId}" 
                             class="quantity-input"
                             name="quantity"
                             style="width: 60px;"
                              />
                        </td>
                        <td>${item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td>
                            <button class="btn-remove"  btn-delete="${item.tourId}" data-id="${item.tourId}">Xóa</button>
                        </td>
                    </tr>
                `;
            });
            const tbody = document.querySelector("[tour-list]");
            console.log(tbody);
              tbody.innerHTML = htmlArray.join("");

              const totalPriceElement = document.querySelector("[total-price]");
              const totalPrice = data.tour.reduce((acc, item) => acc + item.totalPrice, 0);
              totalPriceElement.innerHTML = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
              deleteTour();

    })

}

function deleteTour(){
    const buttonDelete=document.querySelectorAll("[btn-delete]");
    buttonDelete.forEach(button => {
        button.addEventListener("click", (event) => {
            const tourId = button.getAttribute('btn-delete');
            console.log(tourId);
            const cart = JSON.parse(localStorage.getItem('cart'));
            console.log(cart)
            const updatedCart = cart.filter(item => item.tourId != tourId);
            console.log(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
           drawTour();
     
        });
    });
}

drawTour();
