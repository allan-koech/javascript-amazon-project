import { cart } from "../../data/cart.js"
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"

const orders= JSON.parse(localStorage.getItem('orders'))|| [];
async function updateOrders(newOrder){
  orders.unshift(newOrder); 
  localStorage.setItem('orders', JSON.stringify(orders))
}
export async function getUpdatedOrders(){
  return orders;
}

export async function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents= 0;
for(const cartItem of cart){
  const product= await getProduct(cartItem.productId);
  productPriceCents += product.priceCents * cartItem.quantity;
  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
  shippingPriceCents += deliveryOption.priceCents
}
const totalBeforeTaxCents = shippingPriceCents+productPriceCents;
const taxCents= 10 * totalBeforeTaxCents/ 100;
const totalCents =totalBeforeTaxCents + taxCents;
const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
           $${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
          
        `
        
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
document.querySelector('.js-place-order-button').addEventListener('click', async  ()=>{
       
        const response= await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({cart : cart}) })
        const newOrder = await response.json();
        await updateOrders(newOrder);
        getUpdatedOrders()
        window.location.href= 'orders.html'
        
        

})

}

