import { a as useRoute, b as useState, n as navigateTo } from './server.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, computed, watch, reactive } from 'vue';
import { a as useTaskStore } from './products-d75ad03d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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

const useTaskShow = () => {
  const store = useTaskStore();
  const route = useRoute();
  const tasks = computed(() => store["getTask"]);
  const fetchFlag = computed(() => store["getFetchFlag"]);
  watch(
    () => route.params,
    () => {
      var _a;
      store["setTasks"]((_a = route.params.tasks) != null ? _a : 199);
    },
    {
      immediate: true
    }
  );
  return { tasks, fetchFlag };
};
const UseTaskFilter = () => {
  const toBeNarrow = useState("limit", () => "199");
  const filterTasks = () => {
    navigateTo({
      name: "tasks-tasks",
      params: { tasks: toBeNarrow.value }
    });
  };
  return {
    toBeNarrow,
    filterTasks
  };
};
const useTaskUpdate = (props) => {
  const store = useTaskStore();
  const updateTask = () => {
    store["setUpdatedTask"](props.id, props.completed);
  };
  return {
    updateTask
  };
};
const useTaskDelete = (props) => {
  const store = useTaskStore();
  const deleteTask = () => {
    store["deleteTask"](props.id);
  };
  return { deleteTask };
};
const useTaskCreate = () => {
  const store = useTaskStore();
  const newTaskInfo = reactive({
    completed: false,
    content: ""
  });
  const create = () => {
    store["createTask"](newTaskInfo);
  };
  store.$subscribe((mutation, state) => {
    newTaskInfo.content = "";
    newTaskInfo.completed = false;
  });
  return {
    create,
    newTaskInfo
  };
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const { create, newTaskInfo } = useTaskCreate();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="mb-5"><h4>Create Tasks</h4><div class="my-2 d-flex flex-row gap-1"><input${ssrRenderAttr("value", unref(newTaskInfo).content)} type="text" class="form-control" placeholder="Task"><button type="submit" class="btn btn-primary">create</button></div><div class="form-check"><input${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskInfo).completed) ? ssrLooseContain(unref(newTaskInfo).completed, "") : unref(newTaskInfo).completed) ? " checked" : ""} class="form-check-input" type="checkbox" value="" id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault"> completed </label></div></div></form>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tasks/Create.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Filter",
  __ssrInlineRender: true,
  setup(__props) {
    UseTaskFilter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-5" }, _attrs))}><h4 class="mb-3">Filter Tasks</h4><select class="form-select" aria-label="Default select example"><option selected value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="199">199</option></select></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tasks/Filter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Update",
  __ssrInlineRender: true,
  props: {
    completed: { type: Boolean },
    id: null
  },
  setup(__props) {
    const props = __props;
    useTaskUpdate(props);
    return (_ctx, _push, _parent, _attrs) => {
      if (!props.completed) {
        _push(`<i${ssrRenderAttrs(mergeProps({ class: "bi bi-check2 mx-1 point" }, _attrs))}></i>`);
      } else {
        _push(`<i${ssrRenderAttrs(mergeProps({ class: "bi bi-check2-all mx-1 point" }, _attrs))}></i>`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tasks/Update.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Delete",
  __ssrInlineRender: true,
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    useTaskDelete(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<i${ssrRenderAttrs(mergeProps({ class: "bi bi-trash2-fill point" }, _attrs))}></i>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tasks/Delete.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    content: null,
    completed: { type: Boolean },
    id: null
  },
  setup(__props) {
    const store = useTaskStore();
    const updateFlag = computed(() => store["getUpdateFlag"]);
    const taskId = computed(() => store["getTaskId"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TasksUpdate = _sfc_main$3;
      const _component_TasksDelete = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [{ "bg-secondary bg-opacity-25": __props.completed }, "card d-flex flex-row p-1 justify-content-between align-items-center"]
      }, _attrs))}>`);
      if (!unref(updateFlag) && unref(taskId) === __props.id) {
        _push(`<div class="p-3 flex-row d-flex w-100 justify-content-center"><div class="spinner-border m-auto" role="status"></div></div>`);
      } else {
        _push(`<!--[--><div class="${ssrRenderClass([{ "text-decoration-line-through": __props.completed }, "card-body"])}">${ssrInterpolate(__props.content)}</div><div class="d-flex flex-row">`);
        _push(ssrRenderComponent(_component_TasksUpdate, {
          id: __props.id,
          completed: __props.completed
        }, null, _parent));
        _push(ssrRenderComponent(_component_TasksDelete, { id: __props.id }, null, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tasks/Show.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[[tasks]]",
  __ssrInlineRender: true,
  setup(__props) {
    const { tasks, fetchFlag } = useTaskShow();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TasksCreate = _sfc_main$5;
      const _component_TasksFilter = _sfc_main$4;
      const _component_TasksShow = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mt-5 pt-4" }, _attrs))}><div class="row"><div class="col-6">`);
      _push(ssrRenderComponent(_component_TasksCreate, null, null, _parent));
      _push(`</div></div><div class="row"><div class="col-3">`);
      _push(ssrRenderComponent(_component_TasksFilter, null, null, _parent));
      _push(`</div></div>`);
      if (!unref(fetchFlag)) {
        _push(`<div class="row"><div class="col-12 d-flex justify-content-center flex-row"><div class="spinner-border" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}" role="status"><span class="visually-hidden">Loading...</span></div></div></div>`);
      } else {
        _push(`<div class="row g-2"><!--[-->`);
        ssrRenderList(unref(tasks), (item) => {
          _push(`<div class="col-4 p-1">`);
          _push(ssrRenderComponent(_component_TasksShow, {
            content: item.title,
            id: item.id,
            completed: item.completed
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tasks/[[tasks]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_tasks_-ee387a87.mjs.map
