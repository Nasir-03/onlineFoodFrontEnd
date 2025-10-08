import React, { useEffect } from "react";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Chip, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../state/CartSlice";
import { removeFromCartService, updateQuantityService } from "../service/CartService";

const CartItem = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.jwt);

   
      const handleUpdate = async (item, delta) => {
    try {
      const newQty = item.quantity + delta;

      if (newQty < 1) {
        // delete
        await removeFromCartService(item.id, jwt);
        // Here we reuse updateQuantity by subtracting the whole quantity (so it disappears).
        dispatch(updateQuantity({ id: item.id, change: -item.quantity }));
      } else {
        // send absolute quantity (not the delta)
        const updatedItem = await updateQuantityService(item.id, newQty, jwt);
        // backend should return the saved CartItems; if it does, use it to compute the change:
        const returnedQty = updatedItem && updatedItem.quantity != null ? updatedItem.quantity : newQty;
        dispatch(updateQuantity({ id: item.id, change: returnedQty - item.quantity }));
      }
    } catch (err) {
      console.error("Failed to update cart item:", err);
      // optionally show a toast / snackbar to the user
    }
  };
     

  useEffect(() => {
    console.log("cart data is: ", cart);
  }, [cart]);

  if (cart.length === 0) {
    return <div>Not any item into add to cart</div>;
  }

  return (
    <div className="px-5 pt-5">
      {cart.map((item, index) => (
        <div key={index} className="pb-5">
          <div className="flex items-center space-x-5 md-mx:flex-col md-mx:items-center md-mx:justify-center">
            <div>
              <img
                src={item.food.images[0]}
                className="w-[5rem] h-[5rem] object-cover"
              />
            </div>

            <div className="flex items-center justify-between w-[70%]">
              <div className="space-y-3 w-full">
                <p>{item.food.name}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <IconButton
                      onClick={()=>handleUpdate(item,-1)}
                    >
                      <RemoveCircleOutlinedIcon />
                    </IconButton>
                    <div className="w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </div>
                    <IconButton
                      // onClick={() =>
                      //   dispatch(updateQuantity({ id: item.id, change: +1 }))
                      // }
                        onClick={()=>handleUpdate(item,+1)}
                    >
                      <AddCircleOutlinedIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <p>${item.totalPrice}</p>
            </div>
          </div>
          <div className="pt-5 space-x-2">
            {item.food.ingredients.map((ingredient) => (
              <Chip label={ingredient.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;