import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  name: "index"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mt-5 pt-5" }, _attrs))}><div class="row justify-content-center"><div class="col-10"><h1 class="text-center">Nuxt Tutorial - hoomanmousavi.ir </h1><p class="text-center"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam exercitationem minus iste, quia vel sunt tempore perferendis nesciunt necessitatibus voluptatem impedit eum obcaecati? Quisquam quasi saepe iste ea, nisi tenetur! </p></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-d2f9baf4.mjs.map
