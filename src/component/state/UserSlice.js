import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user")) || null;

const UserSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem("user");
      return null;
    }
  }
});

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
