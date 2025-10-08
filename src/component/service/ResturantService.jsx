import axios from "axios";
import { BASE_URL } from "../../../config/Config";

  export const createResturant = async(data,jwt) => {
    const response = await axios.post(`${BASE_URL}/api/admin/resturant/create`,data,{
      headers: {
      Authorization: `Bearer ${jwt}`
    },
    })
    return response.data;
  }

export const getAllResturant = async ()=> {
  try{
    const response = await axios.get(`${BASE_URL}/api/resturants/getAll`);
    return response.data;
  }catch(err) {
    throw err;
  }
}


export const getResturantById = async (id, jwt) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/resturants/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};


export const getResturantByUserId = async (jwt) => {
  const response = await axios.get(
    `${BASE_URL}/api/admin/resturant/findUserById`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};

export const deleteResturantById = async(id,jwt) => {
  const response = await axios.delete(`${BASE_URL}/api/admin/resturant/delete/${id}`,{
    headers: { 
      Authorization: `Bearer ${jwt}`
    }
  });
  return response.data;
};

export const getUserFavourites = async(jwt) => {
  const response = await axios.get(`${BASE_URL}/api/resturants/favourites`,{
    headers: { 
      Authorization: `Bearer ${jwt}`
    }
  });
  return response.data;
};
