if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}

const products=[];
const _shoppingCart=document.querySelector('#shopping_cart');
function ready(){
    window.addEventListener('storage',(e)=>{
        setShoppingCartCounter();
    });
    const items = document.querySelectorAll('.content-item');
    items.forEach((item)=>{
        setShoppingCartClickEvent(item);
    });
}
async function setShoppingCartCounter(){
    const storedProducts= await JSON.parse(localStorage.getItem('_shoppingCartProducts'));
    _shoppingCart.dataset.productsCount=storedProducts.length;    
}
function setShoppingCartClickEvent(shoppingCartItem){
    let shoppingCart = shoppingCartItem.querySelector('.im-shopping-cart');
    shoppingCart.addEventListener('click',(e)=>{
        /*e.stopPropagation();*/
        setShoppingCartProductsList(e.target);
    });
}

async function setShoppingCartProductsList(caller){
    if(products.filter(prod=>prod.id==caller.id).length>0)
    {
        const indexOfID = products.findIndex(prod=>prod.id==caller.id);
        products.splice(indexOfID,1);
        caller.classList.remove('shoppingCart-added');
        caller.dataset.tooltip="Add to cart";
    }
    else
    {
        products.push(productObjectFormatter(caller));
        caller.classList.add('shoppingCart-added');
        caller.dataset.tooltip="Remove from cart";
        
    }
    await window.localStorage.setItem('_shoppingCartProducts',JSON.stringify(products));
    setShoppingCartCounter();
    //_shoppingCart.dataset.productsCount=products.length;
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