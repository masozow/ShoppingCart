if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}

const productsID=[];
const _shoppingCart=document.querySelector('#shopping_cart');

function ready(){
    window.localStorage.removeItem('_shoppingCartProducts');
    const items = document.querySelectorAll('.content-item');
    items.forEach((item)=>{
        setShoppingCartClickEvent(item);
    });
}


function setShoppingCartClickEvent(shoppingCartItem){
    let shoppingCart = shoppingCartItem.querySelector('.shoppingCart');
    shoppingCart.addEventListener('click',(e)=>{
        e.preventDefault();
        setShoppingCartProductsList(e.target);
    });
}
function changeShoppingCartCounter(quantity){
    const _shoppingCartCounter = Number.parseInt(_shoppingCart.dataset.productsCount);
    _shoppingCart.dataset.productsCount=_shoppingCartCounter+quantity;
}
function setShoppingCartProductsList(caller){
    console.log(productObjectFormatter(caller));
    if(productsID.includes(caller.parentNode.id))
    {
        changeShoppingCartCounter(-1);
        const indexID = productsID.indexOf(caller.parentNode.id);
        productsID.splice(indexID,1);
        caller.classList.remove('shoppingCart-added');
    }
    else
    {
        changeShoppingCartCounter(1);
        productsID.push(caller.parentNode.id);
        caller.classList.add('shoppingCart-added');
    }
    window.localStorage.setItem('_shoppingCartProducts',productsID);
}
function productObjectFormatter(caller){
    const productObject={};
    const contentItem=caller.parentNode.parentNode.parentNode;
    productObject.id=caller.parentNode.id;
    productObject.productName = contentItem.querySelector('.product-name').textContent;
    productObject.productPrice = contentItem.querySelector('.price').textContent;
    productObject.productDescription = contentItem.querySelector('.item-text').textContent;
    productObject.imageURL=contentItem.querySelector('img').src;
    return productObject;
}