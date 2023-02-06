import {useCartStore} from "~/store/cart";

export const useCartUpdate=(id:number)=>{
    const cartStore=useCartStore()
    const increment = () => {
      cartStore['increment'](id)
    }
    const decrement = () => {
      cartStore['decrement'](id)
    }
    const deleteProduct = () => {
      cartStore['deleteProduct'](id)
    }


    return{
        increment,decrement,deleteProduct
    }
}