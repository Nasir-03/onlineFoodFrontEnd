import axios from "axios";
import { BASE_URL } from "../../../config/Config";

export const createFood = async (data, jwt) => {
  const payload = {
    ...data,
    vegeterian: Boolean(data.vegeterian),   // force boolean
    seasonal: Boolean(data.seasonal),       // force boolean
    price: Number(data.price),
    ingredients: data.ingredients.map(i =>
      typeof i === "string"
        ? { name: i, category: { id: data.category?.id } }
        : i
    )
  };

  console.log("Payload being sent:", payload);

  const response = await axios.post(
    `${BASE_URL}/api/admin/food/create`,
    payload,
    { headers: { Authorization: `Bearer ${jwt}` } }
  );

  return response.data;
};



export const getResturantFood = async (vegeterian, seasonal, nonVeg, food_category, id, jwt) => {
  const response = await axios.get(`${BASE_URL}/api/food/resturant/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    params: {
      vegeterian,
      seasonal,
      nonVeg,
      food_category
    }
  });
  return response.data;
};

export const createFoodCategory = async(data, jwt) => {
  const resturantId = Number(data.resturantId); // convert to number
  const payload = { name: data.name };

  const response = await axios.post(`${BASE_URL}/admin/category/${resturantId}`, payload, {
    headers: { Authorization: `Bearer ${jwt}` }
  });
  return response.data;
};



export const fetchFoodCategory = async (resturantId, jwt) => {
  const response = await axios.get(
    `${BASE_URL}/api/category/resturant/${resturantId}`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
  return response.data;
};

export const deleteFood = async (foodId, jwt) => {
  const response = await axios.delete(`${BASE_URL}/api/admin/food/delete/${foodId}`, {
    headers: { Authorization: `Bearer ${jwt}` }
  });
  return response.data;
}


export const getAllCategories = async (resturantId, jwt) => {
  const response = await axios.get(`${BASE_URL}/api/category/resturant/${resturantId}`, {
    headers: { Authorization: `Bearer ${jwt}` }
  });
  return response.data;
}

export const deleteCategory = async (categoryId, resturantId) => {
  const jwt = localStorage.getItem("jwt"); // get token
  const response = await axios.delete(
    `${BASE_URL}/api/delete/category/${categoryId}/${resturantId}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};
