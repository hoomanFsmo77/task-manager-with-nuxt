import { useSSRContext, defineComponent, mergeProps, unref, computed } from 'vue';
import { u as useProductStore } from './products-d75ad03d.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import './server.mjs';
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
import 'ohash';
import './cart-e28b672b.mjs';
import 'sweetalert2';

const useProductShow = () => {
  const store = useProductStore();
  const products = computed(() => store["getProducts"]);
  return {
    products
  };
};
const useProductAdd = (id) => {
  const store = useProductStore();
  const addToCart = () => {
    store["addProduct"](id);
  };
  return {
    addToCart
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductItem",
  __ssrInlineRender: true,
  props: {
    id: null,
    title: null,
    img: null,
    description: null,
    price: null,
    count: null
  },
  setup(__props) {
    const { img, title, description, price, count, id } = __props;
    useProductAdd(id);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card",
        style: { "width": "auto" }
      }, _attrs))}><img${ssrRenderAttr("src", __props.img)} class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${ssrInterpolate(__props.title)}</h5><p class="card-text">${ssrInterpolate(__props.description)}</p><div class="d-flex flex-row justify-content-between align-items-center"><button class="btn btn-primary">Add To Cart</button><p class="m-0 fs-4"> $${ssrInterpolate(__props.price)}</p></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/products/ProductItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const { products } = useProductShow();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductsProductItem = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mt-5" }, _attrs))}><div class="row g-2"><!--[-->`);
      ssrRenderList(unref(products), (item) => {
        _push(`<div class="col-3">`);
        _push(ssrRenderComponent(_component_ProductsProductItem, {
          img: item.img,
          title: item.title,
          description: item.description,
          price: item.price,
          count: item.count,
          id: item.id
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=products-1153be00.mjs.map
