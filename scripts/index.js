let bagItems; 
function onload(){
    let bagItemsString=localStorage.getItem('bagItems');
    bagItems= bagItemsString ? JSON.parse(bagItemsString) :[];
displayItemsOnHomePage();
displayBagIcon();
}
onload();
function displayItemsOnHomePage(){
let itemsContainerElement = document.querySelector('.items-container');
if(!itemsContainerElement)return;
let innerHTML='';
items.forEach(item=>{
innerHTML+=`<div class ="item-container"> 
        <img class="item-image" src=${item.image} alt="item image">
        <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price" >Rs ${item.original_price}</span>
            <span class= "discount_percentage">(${item.discount_percentage}%OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to bag</button>
    </div>`
});
itemsContainerElement.innerHTML=innerHTML;
}
function addToBag(itemId){
bagItems.push(itemId);
localStorage.setItem('bagItems',JSON.stringify(bagItems));
displayBagIcon();
}

//FXN3:
function displayBagIcon(){
    let bagItemCountElement= document.querySelector('.bag-item-count');
    if(bagItems.length>0){
    bagItemCountElement.style.visibility='visible';
    bagItemCountElement.innerText= bagItems.length;
    }
    else{bagItemCountElement.style.visibility='hidden';}
}


