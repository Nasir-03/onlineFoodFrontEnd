import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../config/Config";

const useFindUser = () => {
  const jwt = useSelector((state) => state.jwt);
  

  const findUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  };

  return findUser;
};

export default useFindUser;
