
function showminiCart1 () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    console.log(totalQuantity);
    const minicart = document.querySelector("[mini-cart-quantity]");
    minicart.innerHTML = totalQuantity;
};
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
                updateQuantityTour();
                showminiCart1()

    })

}

// hàm xóa tour trong giỏ hàng
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


// hàm cập nhật số tour trong giỏ hàng

function updateQuantityTour(){
    const inputQuantity=document.querySelectorAll("[tour-list]  input[item-id]");
    inputQuantity.forEach(input =>{
        input.addEventListener("change", () =>{
            const tourId = input.getAttribute('item-id');
            const newQuantity = parseInt(input.value);
            const cart = JSON.parse(localStorage.getItem('cart'));
            const cartID = cart.find(item => item.tourId == tourId);
            if(cartID) {
                cartID.quantity = newQuantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            drawTour();
        })
    })
}

drawTour();

// Lấy thông tin đặt tour gửi cho backend
const formTour=document.querySelector("[form-order]");
if(formTour){
    formTour.addEventListener("submit", (event) => {
        event.preventDefault();
        const fullName=event.target.elements.fullName.value;
        const phone=event.target.elements.phone.value;
        const note=event.target.elements.note.value;

        const cart=JSON.parse(localStorage.getItem("cart"));
        const data={
            info:{
                name:fullName,
                phone:phone,
                note:note,

            },
            cart:cart
        }


        fetch("/order",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
}

