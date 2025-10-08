import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import MenuCard from "./MenuCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getResturantById } from "../service/ResturantService";
import { getResturantFood } from "../service/FoodService";

const foodTypes = [
  { label: "Veg", value: "Veg" },
  { label: "Nonveg", value: "NonVeg" },
  { label: "Seasonally", value: "Seasonally" },
];

const ResturantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const [foodCategory, setFoodCategory] = useState("");
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const resturant = useSelector((state) => state.rest);

  const [resturantData, setResturantData] = useState([]);
  const { id } = useParams();
  const jwt = useSelector((state) => state.jwt);

  // fetch restaurant details
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getResturantById(id, jwt);
        setResturantData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [id, jwt]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // fetch menu with filters
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getResturantFood(
          foodType === "Veg",
          foodType === "Seasonally",
          foodType === "Non Veg",
          selectedCategory,
          id,
          jwt
        );
        setMenu(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [id, jwt, selectedCategory, foodType]);

  return (
    <div className="px-4 md:px-10 lg:px-20">
      {resturantData && (
        <div>
          {/* Banner */}
          <section>
            <h3 className="text-gray-500 py-3 text-sm md:text-base">
              Home / india / indian fast food / {id}
            </h3>

            <Grid container spacing={2} className="mt-5">
              <Grid item xs={12}>
                <img
                  src="/resturant2.jpg"
                  alt="resturant"
                  className="w-full h-[25vh] md:h-[40vh] object-cover rounded-lg"
                />
              </Grid>

              <Grid item md={6} sm={12} xs={12}>
                <img
                  src="/restur3.jpg"
                  alt="resturant"
                  className="w-full h-[25vh] md:h-[40vh] object-cover rounded-lg"
                />
              </Grid>

              <Grid item md={6} sm={12} xs={12}>
                <img
                  src="/restur4.jpg"
                  alt="resturant"
                  className="w-full h-[25vh] md:h-[40vh] object-cover rounded-lg"
                />
              </Grid>
            </Grid>

            {/* Info */}
            <div className="pt-4 pb-5">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {resturantData.name}
              </h1>
              <p className="text-sm text-gray-500">{resturantData.description}</p>
              <div className="flex flex-col sm:flex-row sm:gap-5 pt-2 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <FmdGoodOutlinedIcon fontSize="small" /> 1.2km from your location
                </span>
                <span className="flex items-center gap-2">
                  <DateRangeOutlinedIcon fontSize="small" /> Opens at 10:00 am
                </span>
              </div>
            </div>
          </section>

          <Divider />

          {/* Layout */}
          <section className="py-5 w-full flex flex-col lg:flex-row gap-5 min-h-screen">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-1/4 lg:sticky top-20 self-start space-y-5">
              <div className="p-3 rounded-lg border border-gray-700 space-y-5">
                {/* Food Types */}
                <div className="space-y-3">
                  <Typography variant="h6">Food Types</Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="food-type"
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                    >
                      {foodTypes.map((type) => (
                        <FormControlLabel
                          key={type.value}
                          value={type.value}
                          control={<Radio />}
                          label={type.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>

                <Divider />

                {/* Food Categories */}
                <div className="space-y-3">
                  <Typography variant="h6">Food Categories</Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="food-category"
                      value={foodCategory}
                      onChange={(e) => {
                        setFoodCategory(e.target.value);
                        setSelectedCategory(e.target.value);
                      }}
                    >
                      {resturantData?.categories?.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={item.name}
                          control={<Radio />}
                          label={item.name}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </aside>

            {/* Right Content */}
            <div className="flex-1">
              {menu.length > 0 ? (
                menu.map((item, index) => (
                  <div className="pb-5" key={index}>
                    <MenuCard item={item} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-10">
                  No items available
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ResturantDetails;
