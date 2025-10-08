import React, { useEffect } from 'react'
import FoodCategoryTable from './FoodCategoryTable'
import { getResturantByUserId } from '../../src/component/service/ResturantService';

const FoodCategory = () => {

  const [resturant, setResturant] = React.useState(null);

  const jwt = localStorage.getItem("jwt");
  
    // Fetch user's restaurants
    useEffect(() => {
      if (!jwt) return;
  
      const fetchRestaurants = async () => {
        try {
          const response = await getResturantByUserId(jwt);
          console.log("Fetched restaurants:", response);
          setResturant(response);
        } catch (err) {
          console.error("Error fetching restaurants:", err);
        }
    }
    fetchRestaurants();
  }, [jwt]);

  return (
    <div>
       <FoodCategoryTable resturant={resturant} />
    </div>
  )
}

export default FoodCategory
