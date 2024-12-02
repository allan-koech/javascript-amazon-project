import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const today= dayjs();
const deliveryDate= today.add(7, 'days')
export const deliveryOptions= [
  {
    id: 1,
    deliveryDays: 7,
    priceCents:0
  }, {
    id: 2,
    deliveryDays: 3,
    priceCents:499
  },{
    id: 3,
    deliveryDays: 1,
    priceCents:999
  }

]
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(Number(option.id)=== Number(deliveryOptionId)){
    deliveryOption=option;
    }
  })
  return deliveryOption || deliveryOptions[0]
}