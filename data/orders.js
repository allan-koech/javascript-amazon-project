import { formatCurrency } from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct } from "./products.js";
const orders=[]
function convertTime(timeStamp){
  const date= dayjs(timeStamp)
  const formattedDate= date.format('MMMM D')
  return formattedDate;
}
const newOrder = {
  "id": "0e3713e6-209f-4bef-a3e2-ca267ad830ea",
  "orderTime": "2024-02-27T20:57:02.235Z",
  "totalCostCents": 5800,
  "products": [
    {
      "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "quantity": 2,
      "estimatedDeliveryTime": "2024-03-01T20:57:02.235Z"
    },
    {
      "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      "quantity": 1,
      "estimatedDeliveryTime": "2024-03-01T20:57:02.235Z"
    }
  ]
}
orders.push(newOrder)
let orderContainerHTML;
async function generateOrderHTML(){

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

}
document.querySelector('.js-orders-grid').innerHTML = orderContainerHTML;
}
generateOrderHTML();
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



