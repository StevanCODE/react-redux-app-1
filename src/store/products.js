import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
  name:'products',
  initialState:{items:[]},
  reducers: {
    addCart(state,action){
      state.items = action.payload
    },
    addProduct(state,action){
      state.push(action.payload)
    },
    removeProduct(state,action){
      state = state.filter(item => item.id !== action.payload) 
    }
  }
})
export const productActions =  productsSlice.actions
export default productsSlice.reducer