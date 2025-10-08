import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "../Theme/DarkTheme";

import Navbar from "./component/Navbar";
import Profile from "./component/profile/Profile";
import CustomRouters from "./component/Routers/CustomRouters";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserCartService } from "./component/service/CartService";
import { setCart } from "./component/state/CartSlice";
import Routers from "./component/Routers/Routers";

const App = () => {

   const dispatch = useDispatch();
   const jwt = useSelector((state)=>state.jwt)

    useEffect(()=>{
       const fetchCart = async()=> {
        try{
          const response = await getUserCartService(jwt);
          dispatch(setCart(response));
        }catch(err){
          console.log("error is: ",err);
        }
       }
       fetchCart();
    },[jwt])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
};

export default App;
