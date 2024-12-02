import { calculateCartQuantity, cart, removeFromCart, updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartSummaryHTML= '';
cart.forEach((cartItem)=>{
  const productId= cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if (product.id=== productId){
      matchingProduct= product;
      
    }
  })
  cartSummaryHTML +=` <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span class= "quantity-name">
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link " data-product-id=${matchingProduct.id}>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionHTML(matchingProduct, cartItem)};
              </div>
            </div>
          </div>`
})
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.js-delete-link').forEach(
(link)=>{
  link.addEventListener('click', ()=>{
    const productId= link.dataset.productId;
    removeFromCart(productId);
  const container =
  document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    calculateCartQuantity();
  })
});

document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId= link.dataset.productId;
    const cartContainerElement = document.querySelector(`.js-cart-item-container-${productId}`)
    cartContainerElement.classList.add('is-editing-quantity');
    calculateCartQuantity();
    
  } )
})
document.querySelectorAll('.js-save-quantity-link').forEach(
  (link)=>{
    const productId= link.dataset.productId;
    link.addEventListener('click', ()=>{
      let newQuantity=0;
      let cartContainerElement = document.querySelector(`.js-cart-item-container-${productId}`)
      newQuantity= Number(document.querySelector(`.js-quantity-input-${productId}`).value)
      if (newQuantity >0 ){
      updateQuantity(productId, newQuantity)
      cartContainerElement.classList.remove('is-editing-quantity');
      } else{
        alert('Invalid Option');
      }
    })
  }
)

function deliveryOptionHTML(matchingProduct, cartItem){
let html ='';
deliveryOptions.forEach((deliveryOption)=>{
  const today=(dayjs());
  const deliveryDate= today.add(deliveryOption.deliveryDays, 'days');
  const dateString= deliveryDate.format('dddd, MMMM D');
  let priceString=''; 
  if( deliveryOption.priceCents === 0){priceString= 'FREE' } else{ priceString= `$${formatCurrency(deliveryOption.priceCents)}-`; }
  const isChecked = deliveryOption.id == cartItem.deliveryOptionId;
  html+= `
        <div class="delivery-option">
        <input 
            type="radio" 
            name="delivery-option-${matchingProduct.id}" 
            class="delivery-option-input" 
            ${isChecked ? 'checked' : ''}>

        <div>
          <div class="delivery-option-date">
          ${dateString}
          </div>
          <div class="delivery-option-price">
          ${priceString} Shipping
          </div>
        </div>
      </div>`
})
return html;
}
