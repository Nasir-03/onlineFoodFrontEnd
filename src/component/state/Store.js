import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./jwtSlice";
import userReducer from "./userSlice";
import favouriteReducer from "./FavouriteSlice"
import cartReducer from "./CartSlice"

export const store = configureStore({
  reducer: {
    jwt: jwtReducer,
    user: userReducer,
    favourites:favouriteReducer,
    cart: cartReducer
  }
});
