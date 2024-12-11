import { formatCurrency } from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct } from "./products.js";
import { getUpdatedOrders } from "../scripts/checkout/paymentSummary.js";
const  orders = await getUpdatedOrders();
function convertTime(timeStamp){
  const date= dayjs(timeStamp)
  const formattedDate= date.format('MMMM D')
  return formattedDate;
}
let orderContainerHTML;
let accumulatorContainer= '';
async function generateOrderHTML(){
if(orders.length===0){ document.querySelector('.js-orders-grid').innerHTML= '<p>You have no orders yet</p>'}
for (const order of orders){
  const formattedDate = convertTime(order.orderTime)
  const orderId= order.id
  const itemsHTML= await generateOrderItemHTML(order.products)
  orderContainerHTML= `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${itemsHTML}
          </div>`
          
          accumulatorContainer += orderContainerHTML;
}
document.querySelector('.js-orders-grid').innerHTML = accumulatorContainer;
}
await generateOrderHTML();

async function generateOrderItemHTML(orderItem){
  let  orderItemsHTML='';
  for( const item of orderItem){ 
    const convertedEstimateDeliveryTime = convertTime(item.estimatedDeliveryTime)
    const detailedItem = await getProduct(item.productId)
    const html= `
              <div class="product-image-container">
              <img src=${detailedItem.image}>
            </div>

            <div class="product-details">
              <div class="product-name">${detailedItem.name}</div>
              <div class="product-delivery-date">
                Arriving on: ${convertedEstimateDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div> `
            orderItemsHTML+= html;
    }
 return orderItemsHTML;
 }



