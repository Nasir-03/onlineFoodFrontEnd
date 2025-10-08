import axios from "axios";
import { BASE_URL } from "../../../config/Config";


export const addToCartService = async (foodId, quantity,resturantId, jwt, ingredients = []) => {
  const response = await axios.put(
    `${BASE_URL}/api/cart/add`,
    {
      foodId,         // backend expects `foodId`
      quantity,       // backend expects `quantity`
      resturantId,
      ingredients     // backend expects `ingredients`
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.data;
};

export const removeFromCartService = async(id, jwt) => {
  const response = await axios.delete(`${BASE_URL}/api/cart-item/${id}/remove`, {
    headers: { Authorization: `Bearer ${jwt}` }
  });
  return response.data;
};


export const getUserCartService = async(jwt)=> {
    const response = await axios.get(`${BASE_URL}/api/cart`,{
        headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    return response.data;
}

export const updateQuantityService = async (id, quantity, jwt) => {
  const response = await axios.put(
    `${BASE_URL}/api/cart-item/update`,
    {
      cartItemId: id,
      quantity: quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};
