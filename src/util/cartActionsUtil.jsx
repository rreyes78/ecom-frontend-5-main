// cart schema
// [{cartItem:item1, count:1},{cartItem:item, count:2}]

export const addToCart=(cart, cartItem,item_discount, setCart)=>{
    const isAdded=cart.filter(item => item.cartItem.id === cartItem.id).length>=1
    if(!isAdded)
    setCart([...cart, {cartItem:cartItem, count:1, discount:item_discount}])
    else
    setCart(cart.map(item =>item.cartItem.id === cartItem.id ? {cartItem:cartItem, count:item.count+1, discount:item_discount} : item))
}

export const removeToCart=(cart, cartItem, setCart)=>{

    console.log(cartItem)
    
    if (cart.length <= 0) return;
    
    const newCart = [...cart];
    newCart.splice(cartItem.index, 1);
    setCart(newCart);

    
}

//This can be called when you add or subtract the count
//Note updatedCount is either updatedCount++ or updatedCount-- before passing here
export const updateCartItem=(cart, cartItem,updatedCount,setCart)=>{

    if(updatedCount==0){
        const updatedList = cart.filter(item => item.cartItem.id !== cartItem.id)
        setCart(updatedList)
    }
    else
        setCart(cart.map(item =>item.cartItem.id === cartItem.id ? {cartItem:cartItem, count:updatedCount, discount:item.discount} : item))
}