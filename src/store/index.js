import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products"
import cartReducer from "./cart"


const store = configureStore({
  reducer: {products: productReducer, cart:cartReducer}
})

export default store