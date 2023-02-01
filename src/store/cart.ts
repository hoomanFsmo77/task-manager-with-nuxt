import {defineStore} from "pinia";
interface State {
    cart:object[]
}
function storeData(value:State) {
    if(process.client){
        localStorage.setItem('_cart_x',JSON.stringify(value))
    }
}
function getItem() {
    const data=localStorage.getItem('_cart_x')
    if(data){
        return JSON.parse(data)
    }else{
        return []
    }

}


export const useCartStore=defineStore('cart',{
    state:():State=>{
        return {
            cart:[]
        }
    },
    getters:{
        getCartLength(state){
            return state.cart.length
        }
    },
    hydrate(state) {
        if(process.client){
            state.cart=getItem()
        }
    }
})