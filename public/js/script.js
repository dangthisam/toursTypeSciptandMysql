 var swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
const showminiCart = () => {

  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    console.log(totalQuantity);
    const minicart = document.querySelector("[mini-cart-quantity]");
    minicart.innerHTML = totalQuantity;


};

showminiCart();

    // thêm tua vào giỏ hàng 

    const formAddCart = document.querySelector('form.form-add-to-cart');
    formAddCart.addEventListener('submit', function (e) {
      e.preventDefault();

     const quantity=parseInt(e.target.elements.quantity.value);
     const tourId=parseInt(formAddCart.getAttribute('tour-id'));
     if(quantity>0 && tourId){
      const cart=JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.tourId === tourId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ tourId, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      
      alert('Thêm tour vào giỏ hàng thành công!');
      showminiCart();
     }


    });

