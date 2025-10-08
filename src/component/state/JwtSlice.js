import { createSlice } from "@reduxjs/toolkit";

const initialJwt = localStorage.getItem("jwt") || "";

const JwtSlice = createSlice({
  name: "jwt",
  initialState: initialJwt,
  reducers: {
    addJwt: (state, action) => {
      localStorage.setItem("jwt", action.payload);
      return action.payload;
    },
    removeJwt: () => {
      localStorage.removeItem("jwt");
      return "";
    }
  }
});

export const { addJwt, removeJwt } = JwtSlice.actions;
export default JwtSlice.reducer;
