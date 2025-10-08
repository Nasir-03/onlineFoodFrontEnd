import axios from "axios";
import { BASE_URL } from "../../../config/Config";

export const registerService = async(data) => {
  return await axios.post(`${BASE_URL}/auth/register`, data);
};

export const loginService = async(data) => {
  return await axios.post(`${BASE_URL}/auth/login`, data);
};
