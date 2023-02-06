export enum ETask {
    "GET_TASK"='getTask',
    "SET_TASK"='setTasks',
    "SET_UPDATED_TASK"='setUpdatedTask',
    "GET_FECTH_FLAG"='getFetchFlag',
    "GET_UPDATED_TASK_INDEX"='getUpdatedTaskIndex',
    "GET_UPDATE_FLAG"='getUpdateFlag',
    "GET_TASK_ID"='getTaskId',
    "DELETE_TASK"='deleteTask',
    "CREATE_TASK"='createTask',
    "GET_LAST_ID"='getLastId'
}
export enum EProduct {
    "GET_PRODUCTS"='getProducts',
    "ADD_PRODUCT"="addProduct",
    "GET_PRODUCT_BY_ID"="getProductById"
}


export enum ECart {
    "GET_CART"='getCart',
    "GET_CART_LENGTH"="getCartLength",
    "ADD_TO_CART"="addToCart",
    "GET_IS_EXIST"="getIsExist",
    "GET_PRODUCT_INDEX_BY_ID"="getProductIndexById",
    "INCREMENT"='increment',
    "DECREMENT"='decrement',
    "DELETE_PRODUCT"='deleteProduct',
    "GET_TOTAL_PRICE"="getTotalPrice"
}