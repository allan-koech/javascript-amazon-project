import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { addToCart,cart,loadFromStorage } from "../../data/cart.js";
renderOrderSummary();
describe('test suite:render order summary', ()=>{
  afterEach(()=>{
    document.querySelector('.js-cart-container').innerHTML= '';
  })
  document.querySelector('.js-cart-container').innerHTML+= '<div class="js-order-summary"></div> <div class="js-payment-summary"></div>'
  const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  it('displays the cart', ()=>{
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    return JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2 ,
      deliveryOptionId: '1'
    }, {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1 ,
      deliveryOptionId: '3'
    }]
);})
spyOn(localStorage, 'setItem');
loadFromStorage();
addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
expect(cart.length).toEqual(2)
expect(localStorage.setItem).toHaveBeenCalledTimes(1);

})
it('removes a product',()=>{
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    return JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2 ,
      deliveryOptionId: '1'
    }, {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1 ,
      deliveryOptionId: '3'
    }])})
    loadFromStorage();
    console.log(
      document.querySelector('.js-payment-summary')
    )
    
   })})

