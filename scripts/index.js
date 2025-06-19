let bagItems; //bagItems is a variale

function onload(){
    let bagItemsString=localStorage.getItem('bagItems');
    bagItems= bagItemsString ? JSON.parse(bagItemsString) :[];//means if bagItemsString is present already , then get it from local storage by parsing it later; otherwise allot empty array to bagItems
//above line converts bagItems into an array consisting of IDs of items
//since bagItenms nowbecame an array , displayItemsOnHomePage() fxn mein .push funxtion is applicable 
displayItemsOnHomePage();//calling the display items function so that the fxn runs!
displayBagIcon();//calling the display bag icon 
}
onload();
//FXN 1:putting the for each loop, and html of items-container into a fxn:
function displayItemsOnHomePage(){
let itemsContainerElement = document.querySelector('.items-container');
if(!itemsContainerElement)return;//USING THIS WE AVOIDED AN ERROR THAT WAS EARIER CAUSING AN ERROR IN THIS FXN AND DUE TO THIS INSIDE BAG, THE COUNT WAS NOT GETTING UPDATED PROPERLY 
//above line means that if itemsCElt is null or undefined just return
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
    </div>`//note that we added the unique id of item as parameter in addToBag fxn
});
itemsContainerElement.innerHTML=innerHTML;
}
//FXN2:making the addToBag function so that on clicking add to cart , items get added to cart
function addToBag(itemId){
bagItems.push(itemId);//bagItems consist of itemIDs
//using local storage to sustain bag count even after page refresh
localStorage.setItem('bagItems',JSON.stringify(bagItems));
displayBagIcon();//calling display icon fxn to change count of bag
}

//FXN3:
function displayBagIcon(){//we call this fxn as soon someone presses add to bag
    let bagItemCountElement= document.querySelector('.bag-item-count');
    if(bagItems.length>0){
    bagItemCountElement.style.visibility='visible';//dom visibility set to visible if >0 items in
    bagItemCountElement.innerText= bagItems.length;
    }
    else{bagItemCountElement.style.visibility='hidden';}
}
//AVOID USING ARROW FUNCTIONS BCZ CALLING THEM GIVES ERROR SOMETIMES DUE TO THEIR PROPERTY THAT THEY CANT BE CALLED BEFORE THEY ARE DEFINEDconsole.log(bagItems);


// console.log(bagItems);
