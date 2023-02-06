import { d as defineStore } from './server.mjs';
import Swal from 'sweetalert2';

var ETask = /* @__PURE__ */ ((ETask2) => {
  ETask2["GET_TASK"] = "getTask";
  ETask2["SET_TASK"] = "setTasks";
  ETask2["SET_UPDATED_TASK"] = "setUpdatedTask";
  ETask2["GET_FECTH_FLAG"] = "getFetchFlag";
  ETask2["GET_UPDATED_TASK_INDEX"] = "getUpdatedTaskIndex";
  ETask2["GET_UPDATE_FLAG"] = "getUpdateFlag";
  ETask2["GET_TASK_ID"] = "getTaskId";
  ETask2["DELETE_TASK"] = "deleteTask";
  ETask2["CREATE_TASK"] = "createTask";
  ETask2["GET_LAST_ID"] = "getLastId";
  return ETask2;
})(ETask || {});
var EProduct = /* @__PURE__ */ ((EProduct2) => {
  EProduct2["GET_PRODUCTS"] = "getProducts";
  EProduct2["ADD_PRODUCT"] = "addProduct";
  EProduct2["GET_PRODUCT_BY_ID"] = "getProductById";
  return EProduct2;
})(EProduct || {});
var ECart = /* @__PURE__ */ ((ECart2) => {
  ECart2["GET_CART"] = "getCart";
  ECart2["GET_CART_LENGTH"] = "getCartLength";
  ECart2["ADD_TO_CART"] = "addToCart";
  ECart2["GET_IS_EXIST"] = "getIsExist";
  ECart2["GET_PRODUCT_INDEX_BY_ID"] = "getProductIndexById";
  ECart2["INCREMENT"] = "increment";
  ECart2["DECREMENT"] = "decrement";
  ECart2["DELETE_PRODUCT"] = "deleteProduct";
  ECart2["GET_TOTAL_PRICE"] = "getTotalPrice";
  return ECart2;
})(ECart || {});
function storeData(value) {
}
function showMessage(msg, icon) {
  Swal.fire({
    toast: true,
    position: "top",
    icon,
    title: msg,
    showConfirmButton: false,
    timer: 1500
  });
}
const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: []
    };
  },
  getters: {
    [ECart.GET_CART](state) {
      return state.cart;
    },
    [ECart.GET_CART_LENGTH](state) {
      return state.cart.length;
    },
    [ECart.GET_IS_EXIST]: (state) => (data) => {
      return state.cart.some((item) => item.id === data.id);
    },
    [ECart.GET_PRODUCT_INDEX_BY_ID]: (state) => (id) => {
      return state.cart.findIndex((item) => item.id === id);
    },
    [ECart.GET_TOTAL_PRICE](state) {
      let sum = 0;
      state.cart.forEach((item) => {
        sum += item.price * item.count;
      });
      return sum;
    }
  },
  actions: {
    [ECart.ADD_TO_CART](data) {
      if (this["getIsExist"](data)) {
        const idx = this["getProductIndexById"](data.id);
        this.cart[idx].count++;
        showMessage("Product updated!", "success");
      } else {
        this.cart.push(data);
        showMessage("Product added!", "success");
      }
      storeData(this.cart);
    },
    [ECart.INCREMENT](id) {
      const idx = this["getProductIndexById"](id);
      this.cart[idx].count++;
      storeData(this.cart);
      showMessage("Product updated!", "success");
    },
    [ECart.DECREMENT](id) {
      const idx = this["getProductIndexById"](id);
      this.cart[idx].count--;
      if (this.cart[idx].count < 1) {
        this.cart[idx].count = 1;
      }
      storeData(this.cart);
      showMessage("Product updated!", "success");
    },
    [ECart.DELETE_PRODUCT](id) {
      const idx = this["getProductIndexById"](id);
      this.cart.splice(idx, 1);
      showMessage("Product deleted!", "info");
      storeData(this.cart);
    }
  },
  hydrate(state) {
  }
});

export { ETask as E, EProduct as a, showMessage as s, useCartStore as u };
//# sourceMappingURL=cart-e28b672b.mjs.map
