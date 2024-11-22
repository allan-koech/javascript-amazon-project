export const cart=[]

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
}