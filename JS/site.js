if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}

function ready(){
    const items = document.querySelectorAll('.content-item');
    const _shoppingCart = document.querySelector('#shopping_cart');
    let _productsCounter = Number.parseInt(_shoppingCart.dataset.productsCount);
    console.log(_productsCounter);
    items.forEach((item)=>{
        let shoppingCart = item.querySelector('.shoppingCart');
        shoppingCart.addEventListener('click',(e)=>{
            e.preventDefault();
            _productsCounter+=1;
            console.log(e.target);
            _shoppingCart.dataset.productsCount=_productsCounter;
        });
        console.log(shoppingCart);
    });
}
function changeProductsCount(counter){
    this._counter=counter<0?1:counter;
    _shoppingCart.dataset.productsCount=_counter;
}