import {useCartStore} from "~/store/cart";
import {IProduct} from "~/composables/useTypes";
import {storeData,showMessage} from "~/composables/useHelper";

export const useCartShow=()=>{
    const store=useCartStore()
    const cartList=computed<IProduct[]>(()=>store['getCart'])
    const cartLength=computed(()=>store['getCartLength'])
    const totalPrice=computed<number>(()=>store['getTotalPrice'])
    const clearCart = () => {
        store.$reset()
        showMessage('Cart cleared!','info')
    }
    store.$subscribe((mutation, state)=>{
        if(mutation.type==="patch function"){
            storeData([])
        }
    })
    return{
        cartList,totalPrice,clearCart,cartLength
    }
}