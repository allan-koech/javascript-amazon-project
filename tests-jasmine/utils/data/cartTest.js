import { addToCart,cart,loadFromStorage } from "../../../data/cart.js";
describe('test suite: test addToCartFunction', ()=>{
 it('adds new product to cart', ()=>{
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);})
      loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);})
    
  })
  it('adds an existing product into the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            quantity:Number(1),
                            deliveryOptionId: '1'  
  }]
);})
spyOn(localStorage, 'setItem');
loadFromStorage();
  addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
  expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  expect(cart.length).toEqual(1)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })


