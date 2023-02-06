import {useProductStore} from "~/store/products";

export const useProductAdd=(id:number)=>{
    const store=useProductStore()
    const addToCart = () => {
        store['addProduct'](id)
    }

    return{
        addToCart
    }
}