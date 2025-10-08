import React, { useEffect, useState } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import ResturantCard from "../Resturant/ResturantCard";
import { useSelector } from "react-redux";
import { getAllResturant } from "../service/ResturantService";

const Home = () => {
  
  const jwt = useSelector((state) => state.jwt);
  const [resturant,setResturant] = useState([]);

   useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getAllResturant();
      console.log("Restaurants:", data); 
      setResturant(data); // store directly, no wrapping
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };
  fetchData();
}, [jwt]);


  return (
    <div className="overflow-x-hidden">
      {/* <section className="banner z-50 relative flex justify-center items-center">
        <div>
          <img src="/bgg.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="w-[50vw] z-10 text-center">
          <p className="text-4xl font-bold text-gray-200 z-10">
            Taste the Convience: food fast, fresh, delivered to your doorstep
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout">
         
        </div>
      </section> */}

      <section className="banner relative w-full h-[80vh] flex justify-center items-center">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/bgg.jpg"
      alt="Background"
      className="w-full h-full object-cover"
    />
    {/* Optional overlay */}
    <div className="absolute inset-0 bg-black/40"></div>
  </div>

  {/* Centered Text */}
  <div className="relative z-10 text-center px-4">
    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
      Taste the Convenience: food fast, fresh, delivered to your doorstep
    </p>
  </div>
</section>


      <section className="p-10">
        <p className="text-3xl font-semibold pb-5 text-gray-400">Top meals</p>
        <MultiItemCarousel />
      </section>

      <section className="p-10">
        <p className="text-3xl font-semibold pb-5 text-gray-400">
          Popular Restaurants
        </p>
        <div className="grid grid-cols-4 xl-mx:grid-cols-3 gap-10 bs-mx:grid-cols-2 xs-mx:grid-cols-1 xs-mx:gap-5 justify-items-center">
          {resturant.map((item) => {
            return <ResturantCard item={item}/>;
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
