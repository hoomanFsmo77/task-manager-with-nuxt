import { _ as __nuxt_component_0$2 } from './server.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, withCtx, createTextVNode, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useCartStore } from './cart-e28b672b.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useCartStore();
    const cartLength = computed(() => store["getCartLength"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-expand-lg bg-body-tertiary border-bottom border-1" }, _attrs))}><div class="container-fluid"><div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav"><li class="nav-item me-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        "active-class": "active",
        to: { name: "index" },
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item me-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        "active-class": "active",
        to: { name: "tasks-tasks" },
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tasks`);
          } else {
            return [
              createTextVNode("Tasks")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item me-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        "active-class": "active",
        to: { name: "products" },
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Product`);
          } else {
            return [
              createTextVNode("Product")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><button type="button" class="btn ms-auto me-3 my-1 btn-primary position-relative"><i class="bi bi-bag-fill"></i><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${ssrInterpolate(unref(cartLength))}</span></button></div></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  name: "default"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LayoutHeader = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_LayoutHeader, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-9fb24d14.mjs.map
