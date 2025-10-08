import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/CartSlice";
import { addToCartService } from "../service/CartService";
import { useParams } from "react-router-dom";

const MenuCard = ({ item }) => {

  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.jwt);
    const { id: restaurantId } = useParams(); // ✅ safe here

 


  // const handleAddToCart = async (e) => {
  //   e.preventDefault();
  //   const itemWithResturant = { ...item, resturantId: id };
  //   dispatch(addToCart(itemWithResturant));

  //   try {
  //     await addToCartService(item.id, 1, id, jwt, []);
  //   } catch (err) {
  //     console.log("Error:", err);
  //   }
  // };

  const handleAddToCart = async (e) => {
  e.preventDefault();
  
  const itemWithResturant = { ...item, resturantId: restaurantId };
  dispatch(addToCart(itemWithResturant));

  try {
    await addToCartService(item.id, 1, restaurantId, jwt, []);
  } catch (err) {
    console.log("Error:", err);
  }
};


  return (
    <Accordion defaultExpanded className="w-full">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full">
          {/* Food Image */}
          <img
            src={item.images[0]}
            alt="food"
            className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-lg object-cover"
          />

          {/* Food Info */}
          <div className="sm:pl-5 pt-3 sm:pt-0 flex-1">
            <Typography className="text-base md:text-lg font-semibold text-gray-200">
              {item.name}
            </Typography>
            <p className="text-gray-400 text-sm md:text-base">₹ {item.price}</p>
            <Typography
              className="pt-2 text-xs md:text-sm text-gray-400"
              sx={{ wordBreak: "break-word" }}
            >
              {item.description}
            </Typography>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        {/* Ingredients */}
        <div className="flex gap-3 flex-wrap">
          {item.ingredients.map((ingredient) => (
            <FormGroup key={ingredient.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={ingredient.inStoke}
                    size="small"
                  />
                }
                label={ingredient.name}
              />
            </FormGroup>
          ))}
        </div>

        {/* Add to Cart Button */}
        <div className="pt-5">
          <Button
            onClick={handleAddToCart}
            variant="contained"
            type="submit"
            fullWidth
          >
            Add to cart
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
