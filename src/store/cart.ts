import {defineStore} from "pinia";
import {ECart} from "~/composables/useEnum";
import {IProduct} from "~/composables/useTypes";
import {storeData,showMessage,getItem} from "~/composables/useHelper";

interface State {
    cart:IProduct[]

}

export const useCartStore=defineStore('cart',{
    state:():State=>{
        return {
            cart:[],
        }
    },
    getters:{
        [ECart.GET_CART](state){
          return state.cart
        },
        [ECart.GET_CART_LENGTH](state){
            return state.cart.length
        },
        [ECart.GET_IS_EXIST]:(state)=>(data:IProduct):boolean=>{
            return state.cart.some(item=>item.id===data.id)
        },
        [ECart.GET_PRODUCT_INDEX_BY_ID]:(state)=>(id:number)=>{
            return state.cart.findIndex(item=>item.id===id)
        },
        [ECart.GET_TOTAL_PRICE](state):number{
            let sum:number=0
            state.cart.forEach(item=>{
                sum+=item.price* item.count
            })
            return sum
        }
    },
    actions:{
        [ECart.ADD_TO_CART](data:IProduct){
          if(this['getIsExist'](data)){
              const idx=this['getProductIndexById'](data.id)
              this.cart[idx].count++
              showMessage('Product updated!','success')
          }else{
              this.cart.push(data)
              showMessage('Product added!','success')
          }
          storeData(this.cart)
      },
        [ECart.INCREMENT](id:number){
            const idx=this['getProductIndexById'](id)
            this.cart[idx].count++
            storeData(this.cart)
            showMessage('Product updated!','success')
        },
        [ECart.DECREMENT](id:number){
            const idx=this['getProductIndexById'](id)
            this.cart[idx].count--
            if(this.cart[idx].count<1){
                this.cart[idx].count=1
            }
            storeData(this.cart)
            showMessage('Product updated!','success')
        },
        [ECart.DELETE_PRODUCT](id:number){
            const idx=this['getProductIndexById'](id)
            this.cart.splice(idx,1)
            showMessage('Product deleted!','info')
            storeData(this.cart)
        }
    },
    hydrate(state) {
        if(process.client){
            state.cart=getItem()
        }
    }
})