import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

class Cart{
  cartItems;
#localStorageKey;
  constructor(localStorageKey){
this.#localStorageKey= localStorageKey;
this.#loadFromStorage();
  };
#loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(`${this.localStorageKey}`))||[{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionId: '1'
    }, {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionId: '3'
    }]}
saveToStorage(){
      localStorage.setItem(`${this.localStorageKey}`, JSON.stringify(this.cartItems))}
  addToCart(productId){
        let matchingItem;
        let quantityOfOrder= document.querySelector(`.js-quantity-selector-${productId}`);
        const addedToCart= document.querySelector(`.js-added-to-cart-${productId}`);
       /*addedToCart.classList.add(`js-added-to-cart`);*/
       setTimeout(()=>{ addedToCart.classList.remove(`js-added-to-cart`);},2000)
         this.cartItems.forEach((cartItem)=>{
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
          this.saveToStorage();
      }
removeFromCart(productId){
        const newCart= [];
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId!== productId ){
            newCart.push(cartItem);
          }
        this.cartItems=newCart;
        this.saveToStorage();
        renderPaymentSummary();
        })
      }
calculateCartQuantity(){
        let cartQuantity= 0;
        this.cartItems.forEach((cartItem)=>{
        cartQuantity+= cartItem.quantity;
        if(document.title==='Checkout') {document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} Items`
      }
       else if(document.title==='Amazon Project'){ 
        document.querySelector('.js-cart-quantity').innerHTML= cartQuantity; 
        }})}
updateQuantity(productId, newQuantity){
          cart.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            cartItem.quantity = newQuantity;
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML= cartItem.quantity;
            saveToStorage();
            calculateCartQuantity();
          } })}
updateDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartItem)=>{
              if(productId=== cartItem.productId){
                matchingItem=cartItem;
              }})
              matchingItem.deliveryOptionId = deliveryOptionId;
              this.saveToStorage();
          }

}

const cart= new Cart('cart-oop');
const businessCart= new Cart('cart-business');


console.log(cart);
console.log(businessCart);
