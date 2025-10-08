import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [], // array where each element is a cart item object
  reducers: {
    addToCart: (state, action) => {
      console.log("Redux payload:", action.payload);
      if (!action.payload) return;

      const itemExists = state.find((item) => item.id === action.payload.id);

      if (itemExists) {
        itemExists.quantity += 1;
        // ✅ also ensure resturantId is not lost
        itemExists.resturantId = action.payload.resturantId;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // you can also have a separate reducer to adjust quantity up/down
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index].quantity += change;
        if (state[index].quantity < 1) {
          state.splice(index, 1); // ✅ remove directly
        } else {
          state[index].totalPrice =
            state[index].quantity * state[index].food.price;
        }
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    setCart: (state, action) => {
      // assuming action.payload is something like { listItems: [...] }
      return action.payload.listItems || [];
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, setCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;