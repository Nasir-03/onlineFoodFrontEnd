import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./JwtSlice";
import userReducer from "./UserSlice";
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
