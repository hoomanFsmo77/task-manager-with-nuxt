import Swal ,{SweetAlertIcon} from "sweetalert2";
import {IProduct} from "~/composables/useTypes";
interface State {
    cart:IProduct[]
}

export function storeData(value:State["cart"]) {
    if(process.client){
        localStorage.setItem('_cart_x',JSON.stringify(value))
    }
}
export function getItem() {
    const data=localStorage.getItem('_cart_x')
    if(data){
        return JSON.parse(data)
    }else{
        return []
    }
}
export function showMessage(msg:string,icon:SweetAlertIcon) {
     Swal.fire({
        toast:true,
        position: 'top',
        icon: icon,
        title: msg,
        showConfirmButton: false,
        timer: 1500
    })
}
