import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, getDeliveryDay } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
export async function renderOrderSummary(){
let cartSummaryHTML= '';
for (const cartItem of cart) {
const productId= cartItem.productId;
const matchingProduct= await getProduct(productId);
const deliveryOptionId = cartItem.deliveryOptionId;
const deliveryDay= getDeliveryDay(deliveryOptionId)
const today=dayjs();
    const deliveryDate= today.add(getDeliveryOption(deliveryOptionId).deliveryDays, 'days');
    const dateString= deliveryDate.format('dddd, MMMM D');
    
cartSummaryHTML +=` <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
            <div class="delivery-date js-delivery-date-${matchingProduct.id}">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                 ${matchingProduct.getPrice()}
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
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionHTML(matchingProduct, cartItem)}
              
              </div>
            </div>
          </div>`
}
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
    renderPaymentSummary();
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
      renderPaymentSummary();
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
  const today=dayjs();
  const deliveryDate= today.add(deliveryOption.deliveryDays, 'days');
  const dateString= deliveryDate.format('dddd, MMMM D');
  let priceString=''; 
  if( deliveryOption.priceCents === 0){priceString= 'FREE' } else{ priceString= `$${formatCurrency(deliveryOption.priceCents)}-`; }
  const isChecked = deliveryOption.id == cartItem.deliveryOptionId;
  html+= `
        <div class="delivery-option js-delivery-option"
        data-product-id= "${matchingProduct.id}"
        data-delivery-option-id= "${deliveryOption.id}">
        <input 
            type="radio" 
            name="delivery-option-${matchingProduct.id}" 
            class="delivery-option-input" 
            ${isChecked ? 'checked' : ''}
            value = '${dateString}'>

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
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
element.addEventListener('click', ()=>{
  const {productId, deliveryOptionId} = element.dataset;
  updateDeliveryOption(productId, deliveryOptionId)
  renderOrderSummary();
  renderPaymentSummary();
})
})
}
renderOrderSummary();


