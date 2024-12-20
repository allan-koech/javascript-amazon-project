import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId: '1'
  }, {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId: '3'
  }]
}
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId){
  let matchingItem;
  let quantityOfOrder= document.querySelector(`.js-quantity-selector-${productId}`);
  const addedToCart= document.querySelector(`.js-added-to-cart-${productId}`);
 addedToCart.classList.add(`js-added-to-cart`);
 setTimeout(()=>{ addedToCart.classList.remove(`js-added-to-cart`);},2000)
   cart.forEach((cartItem)=>{
    if(productId=== cartItem.productId){
      matchingItem=cartItem;
    }
  })
  if (matchingItem){
    matchingItem.quantity+= Number(quantityOfOrder.value)
  } else {cart.push({
    productId:productId,
    quantity: Number(quantityOfOrder.value),
    deliveryOptionId: '1'
  })
    }
    saveToStorage();
}
export function removeFromCart(productId){
  const newCart= [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!== productId ){
      newCart.push(cartItem);
    }
  cart=newCart;
  saveToStorage();
  renderPaymentSummary();
  })
}

export function calculateCartQuantity(){
  let cartQuantity= 0;
  
  cart.forEach((cartItem)=>{
  cartQuantity+= cartItem.quantity;
  if(document.title==='Checkout') {document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} Items`
}
 else if(document.title==='Amazon Project'){ 
  document.querySelector('.js-cart-quantity').innerHTML= cartQuantity; 
  }})}
  calculateCartQuantity();
  export function updateQuantity(productId, newQuantity){
    cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML= cartItem.quantity;
      saveToStorage();
      calculateCartQuantity();
    } })  }
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId=== cartItem.productId){
      matchingItem=cartItem;
    }})
   
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

   

 