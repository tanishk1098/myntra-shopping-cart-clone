const CONVENIENCE_FEES=99;
let bagItemObjects;

onload();//calling onload fxn

function onload(){
loadBagItemsObjects();
displayBagItems();
displayBagSummary();
}

function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary');
if (bagItems.length === 0) {
bagSummaryElement.innerHTML = `
  <div class="empty-bag-message">
    <h2>Your bag is empty.<br>Keep shopping</h2>
  </div>
`;
    return;
  }

let totalItems=bagItems.length;
let totalMRP=0;
let totalDiscount=0;
let innerHTML='';
bagItemObjects.forEach(bagItem=>{
totalMRP+=bagItem.original_price;
totalDiscount+=bagItem.original_price - bagItem.current_price;

})
let finalPayment=totalMRP-totalDiscount+CONVENIENCE_FEES;
bagSummaryElement.innerHTML=generateSummaryHTML(totalItems,totalDiscount,totalMRP,finalPayment);
}

function loadBagItemsObjects(){//this fxn converting ,bascially returning actual items through mapping by itemIds
console.log(bagItems);//bagItems is an array of itemIds
 bagItemObjects=bagItems.map(itemId =>{ 
for(let i =0;i<items.length;i++){
  if(itemId==items[i].id)return items[i];}
})
console.log(bagItemObjects);//bagItemObjects is an arr of item objects(can check console for results

}
 

function displayBagItems(){
  // console.log(bagItems);//this gave us only ids of the items, but we need actual items->so we iterate whole array 'items' from items.js ,
  //  so if id matches we obtain that item from items.js
//WE CONVERT "bagItems" ID to Actual objects
  let containerElement=document.querySelector('.bag-items-container');
  let innerHTML='';
bagItemObjects.forEach(item => {
     innerHTML+=generateItemHTML(item);}
    );

  containerElement.innerHTML=innerHTML;
 };

function removeFromBag(itemId){
// bagItems= bagItems.filter(bagItemId => bagItemId!= itemId);//it constructs a new array consisting of all Ids that are not equal to ItemId
//WE ARE NOT USING ABOVE line with use of .filter BCZ IF 4 SIMILAR ITEMS ARE IN CART , THEN BY PRESSING'X' FOR 1 ITEM REMOES ALL 4 ITEMS AS THEY HAVE SAME ID
  const indexToRemove = bagItems.indexOf(itemId); // find particular ndex to be removed
  if (indexToRemove !== -1) {
    bagItems.splice(indexToRemove, 1); // remove just one item
  }
  //now storing into local storage so that our page survives refresh
localStorage.setItem('bagItems',JSON.stringify(bagItems));
//now call back these 2 fxns again
loadBagItemsObjects();
displayBagIcon();//upadates bag count
displayBagItems();
displayBagSummary();

}
 function generateItemHTML(item) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}

function generateSummaryHTML(totalItems,totalDiscount,totalMRP,finalPayment){
  return ` <div class="bag-details-container"> 
            <div class="price-header">PRICE DETAILS (${totalItems}items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
