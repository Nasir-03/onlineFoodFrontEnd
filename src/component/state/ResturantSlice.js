import { createSlice } from "@reduxjs/toolkit";

const resturantSlice = createSlice({
  name: "resturant",
  initialState: null, // no restaurant at the start
  reducers: {
    setResturant: (state,action)=> action.payload,

    createResturant: (state, action) => {
      return action.payload; // replace with the new restaurant
    },
    updateResturant:(state,action)=>{
        
    }
  },
});

export const { createResturant } = resturantSlice.actions;
export default resturantSlice.reducer;
