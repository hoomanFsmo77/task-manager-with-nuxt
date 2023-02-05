import {useProductStore} from "~/store/products";
import {IProduct} from "~/composables/useTypes";

export const useProductShow=()=>{
    const store=useProductStore()
    const products=computed<IProduct[]>(()=>store['getProducts'])

    return{
        products
    }
}