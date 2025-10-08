import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    initialState:[],
    name:"favourites",
    reducers:{
        addToFavourites:(state,action) => {
          const index = state.findIndex(item => item.id === action.payload.id);
          if (index != -1){
            // Already in slice so remove it
            state.splice(index,1);
          }else{
            state.push(action.payload)
          }
        },

       setFavourites: (state, action) => {
  return Array.isArray(action.payload) ? action.payload : [];
}

    }
})

export const {addToFavourites,setFavourites} = favouriteSlice.actions;
export default favouriteSlice.reducer;