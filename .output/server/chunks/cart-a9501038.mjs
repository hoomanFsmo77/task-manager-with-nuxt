import { u as useNuxtApp, _ as __nuxt_component_0$2 } from './server.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode, computed } from 'vue';
import { u as useCartStore, s as showMessage } from './cart-e28b672b.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'defu';
import './config.mjs';
import 'destr';
import 'scule';
import 'sweetalert2';

const useCartShow = () => {
  const store = useCartStore();
  const cartList = computed(() => store["getCart"]);
  const cartLength = computed(() => store["getCartLength"]);
  const totalPrice = computed(() => store["getTotalPrice"]);
  const clearCart = () => {
    store.$reset();
    showMessage("Cart cleared!", "info");
  };
  store.$subscribe((mutation, state) => {
    if (mutation.type === "patch function")
      ;
  });
  return {
    cartList,
    totalPrice,
    clearCart,
    cartLength
  };
};
const useCartUpdate = (id) => {
  const cartStore = useCartStore();
  const increment = () => {
    cartStore["increment"](id);
  };
  const decrement = () => {
    cartStore["decrement"](id);
  };
  const deleteProduct = () => {
    cartStore["deleteProduct"](id);
  };
  return {
    increment,
    decrement,
    deleteProduct
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    img: null,
    title: null,
    description: null,
    price: null,
    count: null,
    id: null
  },
  setup(__props) {
    const { img, description, price, title, count, id } = __props;
    const { $dollar } = useNuxtApp();
    useCartUpdate(id);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><th scope="row"><div class="d-flex flex-row align-items-center"><img${ssrRenderAttr("src", __props.img)} width="100" alt=""><div class="ms-4"><h3>${ssrInterpolate(__props.title)}</h3><p>${ssrInterpolate(__props.description)}</p></div></div></th><td>${ssrInterpolate(unref($dollar)(__props.price))}</td><td><div class="d-flex justify-content-center flex-row gap-1 align-items-center"><button class="btn btn-success rounded-circle"><i class="bi bi-dash"></i></button><span class="mx-2">${ssrInterpolate(__props.count)}</span><button class="btn btn-success rounded-circle"><i class="bi bi-plus"></i></button></div></td><td class="text-center">${ssrInterpolate(unref($dollar)(__props.price * __props.count))}</td><td class="text-center"><button class="btn btn-danger"> Delete </button></td></tr>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/Item.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { cartList, totalPrice, clearCart, cartLength } = useCartShow();
    useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CartItem = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mt-5" }, _attrs))}>`);
      if (unref(cartLength) > 0) {
        _push(`<div class="row"><div class="col-12"><table class="table table-responsive align-middle"><thead><tr><th scope="col">Product</th><th scope="col">Price</th><th scope="col" class="text-center">Quantity</th><th scope="col">Subtotal</th><th scope="col" class="text-center">Action</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(cartList), (item) => {
          _push(ssrRenderComponent(_component_CartItem, {
            img: item.img,
            title: item.title,
            description: item.description,
            price: item.price,
            count: item.count,
            id: item.id
          }, null, _parent));
        });
        _push(`<!--]--></tbody></table><div class="p-2 d-flex flex-row justify-content-between"><button class="btn btn-dark"> CLEAR CART </button><div class="d-flex flex-row align-items-center"><p class="fs-3 m-0"> Total: ${ssrInterpolate("$" + unref(totalPrice))}</p><button class="btn btn-warning ms-3"> Checkout </button></div></div></div></div>`);
      } else {
        _push(`<div class="row"><div class="col-12 d-flex flex-row justify-content-center"><div class="d-flex justify-content-center flex-column align-items-center"><i style="${ssrRenderStyle({ "font-size": "5rem" })}" class="bi bi-basket-fill"></i><p class="text-center fs-3 m-0">Cart is empty!</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "btn btn-outline-secondary mt-2",
          to: { name: "products" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Products `);
            } else {
              return [
                createTextVNode(" Products ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-a9501038.mjs.map
