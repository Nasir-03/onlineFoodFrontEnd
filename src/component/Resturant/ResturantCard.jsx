import { Card, Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, setFavourites } from "../state/FavouriteSlice";
import axios from "axios";
import { BASE_URL } from "../../../config/Config";

const ResturantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.jwt) || "";

  useEffect(()=>{console.log("item is: ",item)},[item])

  const handlecart = (item) => {
    // navigate(`/resturant/${item.address.city}/${item.name}/${item.id}`);
  }

  // save favourits in DB
  const handleFavr = async (item) => {
    try {
      const res = await axios.put(
        // `http://localhost:8080/api/resturants/${item.id}/add-favouraite`, 
        `${BASE_URL}/api/resturants/${item.id}/add-favouraite`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // usually you need "Bearer "
          },
        }
      );

      // use backend response (it contains added/removed DTO)
      dispatch(addToFavourites(item));
    } catch (err) {
      console.error("Failed to toggle favourite", err);
    }
  };

  useEffect(() => {
  const fetchFavourites = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/resturants/favourites`,
 {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setFavourites(res.data));
    } catch (err) {
      console.error("Failed to fetch favourites", err);
    }
  };

  if (token) {
    fetchFavourites();
  }
}, [token, dispatch]);


   const handleNavigateToResturant = ()=> {
    if (!token) {
      navigate("/account/login");
      return;
    }
      if (item.open){
        navigate(`/resturant/${item.address.city}/${item.name}/${item.id}`)
      }
   }

  const favourites = useSelector((state) => state.favourites) || [];

   const isFavourite = favourites.some((fav) => fav.id === item.id);

  return (
    <Card className="mx-5 w-full hover:scale-105 duration-300 cursor-pointer">
    <div
        onClick={() => handleCard(item)}
        className={`${item.open ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <div className="relative">
           <img
            src={item.images[0]}
            className="h-[10rem] w-[100%] object-cover"
           />

          <Chip
            size="small"
            className="absolute top-2 left-2"
            color={item.open ? "success" : "error"}
            label={item.open ? "Open" : "Closed"}
          />
        </div>
        <div className="flex justify-between p-3">
          <p onClick={handleNavigateToResturant} className="text-xl cursor-pointer">{item.name}</p>
          <IconButton onClick={() => handleFavr(item)}>
            {isFavourite ? (
              <FavoriteOutlinedIcon color="error" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        </div>
        <div className="text-gray-500 px-3 pb-3">{item.description}</div>
      </div>
    </Card>
  );
};

export default ResturantCard;
