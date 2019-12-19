if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}

const _shoppingCart=document.querySelector('#shopping_cart');
const _productsItem='_shoppingCartProducts';

function ready(){
    window.addEventListener('storage',(e)=>{
        setShoppingCartCounter();
        updateSelectedShoppingCartsClass();
    });
    const items = document.querySelectorAll('.content-item');
    items.forEach((item)=>{
        setShoppingCartClickEvent(item);
    });
}
async function setShoppingCartCounter(){
    const storedProducts= await JSON.parse(localStorage.getItem('_shoppingCartProducts'));
    _shoppingCart.dataset.productsCount=storedProducts!=null?storedProducts.length:0;    
}
function setShoppingCartClickEvent(shoppingCartItem){
    let shoppingCart = shoppingCartItem.querySelector('.im-shopping-cart');
    shoppingCart.addEventListener('click',(e)=>{
        /*e.stopPropagation();*/
        setShoppingCartProductsList(e.target);
    });
}

async function setShoppingCartProductsList(caller){
    let storedProducts = await getStoredProducts(_productsItem);
    if (storedProducts!=null && storedProducts.filter(prod => prod.id == caller.id).length > 0) {
        const indexOfID = storedProducts.findIndex(prod => prod.id == caller.id);
        storedProducts.splice(indexOfID, 1);
        caller.dataset.tooltip = "Add to cart";
    }
    else {
        if(storedProducts===null)
        {
            storedProducts=[];
            console.log(storedProducts);
        }
        storedProducts.push(productObjectFormatter(caller));
        caller.dataset.tooltip = "Remove from cart";
    }
    await window.localStorage.setItem('_shoppingCartProducts',JSON.stringify(storedProducts));
    await updateSelectedShoppingCartsClass();
    await setShoppingCartCounter();
}

function productObjectFormatter(caller){
    const productObject={};
    const contentItem=caller.parentNode.parentNode;
    productObject.id=caller.id;
    productObject.productName = contentItem.querySelector('.product-name').textContent;
    productObject.productPrice = contentItem.querySelector('.price').textContent;
    productObject.productDescription = contentItem.querySelector('.item-text').textContent;
    productObject.imageURL=contentItem.querySelector('img').src;
    return productObject;
}
async function getStoredProducts(item){
    return await JSON.parse(localStorage.getItem(item));
}
async function updateSelectedShoppingCartsClass(){
    const _content=document.querySelector('.content');
    const existingShoppingCarts=_content.querySelectorAll('.shoppingCart');
    const storedProducts= await getStoredProducts(_productsItem);
    const storedIDs=storedProducts.map(p=>p.id);
    const existingShoppingCartsIDs=[];
    for (let index = 0; index < existingShoppingCarts.length; index++) {
        existingShoppingCartsIDs.push(existingShoppingCarts[index].id);
    }
    let removeClass=existingShoppingCartsIDs.filter(item=>!storedIDs.includes(item));
    storedIDs.forEach(elementID => {
        _content.querySelector('#\\3'+elementID+" ").classList.add('shoppingCart-added');
    });
    removeClass.forEach(elementID => {
        _content.querySelector('#\\3'+elementID+" ").classList.remove('shoppingCart-added');
    });
}