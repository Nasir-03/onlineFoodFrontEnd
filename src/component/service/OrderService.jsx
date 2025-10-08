import axios from "axios"
import { BASE_URL } from "../../../config/Config";

export const createOrderService = async (value, jwt) => {
  const response = await axios.post(`${BASE_URL}/api/order`, value, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = response.data; // backend JSON

  if (data.payment_url) {
    window.location.href = data.payment_url;  // ✅ redirect works
  }

  return data;
};

export const fetchResturantOrders = async (resturantId, jwt) => {
  const response = await axios.get(`${BASE_URL}/api/admin/order/resturant/${resturantId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};

export const updateOrderStatusService = async (orderId, status, jwt) => {
  const response = await axios.put(
    `${BASE_URL}/api/admin/order/${orderId}/${status}`,
    {}, // empty body
    { headers: { Authorization: `Bearer ${jwt}` } } // headers go here
  );
  return response.data;
};


export const getUserOrderService = async (jwt) => {
  const response = await axios.get(`${BASE_URL}/api/order/user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};
