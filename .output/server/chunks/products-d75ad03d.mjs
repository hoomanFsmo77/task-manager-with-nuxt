import { d as defineStore, u as useNuxtApp, c as createError } from './server.mjs';
import { ref, getCurrentInstance, onServerPrefetch, unref, computed, reactive } from 'vue';
import { hash } from 'ohash';
import { E as ETask, s as showMessage, a as EProduct, u as useCartStore } from './cart-e28b672b.mjs';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a2, _b, _c, _d, _e, _f;
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_f = (_e = getCachedData()) != null ? _e : (_a = options.default) == null ? void 0 : _a.call(options)) != null ? _f : null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a3;
      var _a22;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_a3 = (_a22 = options.default) == null ? void 0 : _a22.call(options)) != null ? _a3 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const apiFetch = $fetch.create({ baseURL: "https://jsonplaceholder.typicode.com/todos" });
const useTaskStore = defineStore("task", {
  state: () => {
    return {
      tasks: [],
      fetchFlag: false,
      updateFlag: false,
      taskIdUpdating: null
    };
  },
  getters: {
    [ETask.GET_TASK](state) {
      return state.tasks;
    },
    [ETask.GET_TASK_ID](state) {
      return state.taskIdUpdating;
    },
    [ETask.GET_FECTH_FLAG](state) {
      return state.fetchFlag;
    },
    [ETask.GET_UPDATE_FLAG](state) {
      return state.updateFlag;
    },
    [ETask.GET_UPDATED_TASK_INDEX]: (state) => (id) => {
      return state.tasks.findIndex((item) => item.id === id);
    },
    [ETask.GET_LAST_ID](state) {
      return state.tasks.length + 1;
    }
  },
  actions: {
    async [ETask.SET_TASK](itemToShow) {
      const { data, error, pending } = await useAsyncData("setTask", () => apiFetch("", { retry: 3, query: { _limit: itemToShow } }));
      if (data.value) {
        this.tasks = data.value;
        this.fetchFlag = !pending.value;
      }
      if (error.value) {
        console.log(error);
      }
    },
    async [ETask.SET_UPDATED_TASK](id, completed) {
      const index = this["getUpdatedTaskIndex"](id);
      this.taskIdUpdating = this.tasks[index].id;
      this.updateFlag = false;
      const { data, error, pending } = await useAsyncData("updateTask", () => apiFetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      }));
      if (data.value) {
        this.updateFlag = !pending.value;
        this.tasks[index].completed = !this.tasks[index].completed;
        this.taskIdUpdating = null;
        showMessage("Task Updated!", "success");
      }
      if (error.value) {
        this.taskIdUpdating = null;
        showMessage("Something went wrong!", "error");
      }
    },
    async [ETask.DELETE_TASK](id) {
      const index = this["getUpdatedTaskIndex"](id);
      this.updateFlag = false;
      this.taskIdUpdating = this.tasks[index].id;
      const { error, pending, data } = await useAsyncData("deleteTask", () => apiFetch(`/${id}`, { method: "DELETE" }));
      if (data.value) {
        this.tasks.splice(index, 1);
        this.updateFlag = !pending.value;
        this.taskIdUpdating = null;
        showMessage("Task Updated!", "warning");
      }
      if (error.value) {
        this.updateFlag = true;
        this.taskIdUpdating = null;
        showMessage("Something went wrong!", "error");
      }
    },
    async [ETask.CREATE_TASK](newTask) {
      const id = this["getLastId"];
      const { error, data } = await useFetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          title: newTask.content,
          completed: newTask.completed
        })
      }, "$6W72Rwp4kX");
      if (data.value) {
        this.tasks.unshift({
          id,
          title: newTask.content,
          completed: newTask.completed
        });
        showMessage("Task Added!", "success");
      }
      if (error.value) {
        showMessage("Something went wrong!", "error");
      }
    }
  }
});
const useProductStore = defineStore("products", {
  state: () => {
    return {
      products: [
        {
          id: 1,
          title: "Samsung Galaxy S20",
          img: "data:image/jpeg;base64,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",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          price: 300,
          count: 1
        },
        {
          id: 2,
          title: "iPhone 12",
          img: "data:image/jpeg;base64,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",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          price: 500,
          count: 1
        },
        {
          id: 3,
          title: "Redmi Note 8",
          img: "data:image/jpeg;base64,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",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          price: 600,
          count: 1
        },
        {
          id: 4,
          title: "Samsung Galaxy A71",
          img: "data:image/jpeg;base64,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",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          price: 700,
          count: 1
        }
      ]
    };
  },
  getters: {
    [EProduct.GET_PRODUCTS](state) {
      return state.products;
    },
    [EProduct.GET_PRODUCT_BY_ID]: (state) => (id) => {
      return state.products.filter((item) => item.id === id)[0];
    }
  },
  actions: {
    [EProduct.ADD_PRODUCT](id) {
      const cartStore = useCartStore();
      const target = this["getProductById"](id);
      cartStore["addToCart"](target);
    }
  }
});

export { useTaskStore as a, useProductStore as u };
//# sourceMappingURL=products-d75ad03d.mjs.map
