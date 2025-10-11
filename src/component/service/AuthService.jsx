import axios from "axios";
import { BASE_URL } from "../../../config/Config";

// export const registerService = async(data) => {
//   return await axios.post(`${BASE_URL}/auth/register`, data);
// };

export const sendOtpService = async (email) => {
  const response = await axios.post(`${BASE_URL}/auth/send-otp`, null, {
    params: { email },
  });
  return response.data;
};

export const registerWithOtpService = async (data, otp) => {
  const response = await axios.post(
    `${BASE_URL}/auth/register-with-otp`,
    data,
    { params: { otp } }
  );
  return response.data;
};

export const loginService = async(data) => {
  return await axios.post(`${BASE_URL}/auth/login`, data);
};
