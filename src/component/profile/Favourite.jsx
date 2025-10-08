import React, { useEffect, useState } from "react";
import ResturantCard from "../Resturant/ResturantCard";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites } from "../state/FavouriteSlice";
import { getUserFavourites } from "../service/ResturantService";

const Favourite = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.jwt);
  const favourites = useSelector((state) => state.favourites); // from redux

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await getUserFavourites(token); // service should return response.data
        dispatch(setFavourites(response));
      } catch (err) {
        console.error("Failed to fetch favourites", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFavourites();
    }
  }, [token, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="py-5 text-xl font-semibold text-center">My Favourites</h1>

      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : favourites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favourites.map((item) => (
              <ResturantCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favourites yet</p>
        )}
      </div>
    </div>
  );
};

export default Favourite;
