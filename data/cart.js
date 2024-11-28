export let cart=JSON.parse(localStorage.getItem('cart'))||[{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2
}, {
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1
}]
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
    quantity: Number(quantityOfOrder.value)})
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
  })
}
export function updateQuantity(){
  document.querySelector('.js-return-to-home-link').innerHTML = `${cart.length} Items`
}