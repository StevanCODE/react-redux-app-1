import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name:'cart',
  initialState:{items:[], show: true},
  reducers: {
    addCart(state,action){
      state.items = action.payload
    },
    toggleCart(state,action){
      if(action.payload !== true){
        state.show = !state.show
      }
      else{
        state.show = true
      }
    },
    addItem(state,action){
      if(state.items.some(item => item.id === action.payload.id)){
        state.items = state.items.map(item => {
          if(item.id === action.payload.id){
            item.quantity += action.payload.quantity
            return item
          }
          else return item
        })
      }else{
        state.items.push(action.payload)
      }
    },
    increment(state,action){
      if(state.items.some(item => item.id === action.payload)){
        state.items = state.items.map(item => {
          if(item.id === action.payload){
            item.quantity += 1
            return item
          }
          else return item
        })
      }
    },
    decrement(state,action){
      if(state.items.some(item => item.id === action.payload)){
        state.items = state.items.map(item => {
          if(item.id === action.payload){
            if(item.quantity === 1){
              return null
            }
            else if(item.quantity > 1){
              item.quantity -= 1
            }
            return item
          }
          else return item
        }).filter(Boolean)
      }
    }
  }
})

// THUNK , custom action creator, thunk je funkcija koja vraca funckiju koja odlaze neku akciju
// Koristimo thunk funckije jer sami reduceri u reduxu (a i generalno) moraju da budu pure funkcije bez ikakvih side-effectova i asinhronog koda
export function loadCartData(url = 'https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json'){
  const cart = []
  return async (dispatch) => {
    try{
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Error Getting Data')
      }
      const data = await response.json()
      for (const meal in data){
        cart.push(data[meal])
      }
      if(cart.length > 0) dispatch(cartSlice.actions.addCart(cart))
    }catch(err) {
      console.log(err.message)
    }
  }
}

export function putCartData(cartData, url = 'https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json'){
  return async(dispatch) => {
    try{
      await fetch(url, {
        method:"PUT",
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
      })
    }
    catch(err){
      console.log(err.message)
    }
  }
}

export const cartActions = cartSlice.actions
export default cartSlice.reducer