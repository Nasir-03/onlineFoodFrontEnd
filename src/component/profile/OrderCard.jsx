import { Button, Card, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { getUserOrderService } from "../service/OrderService";

const OrderCard = ({ order }) => {

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const extraSmall = useMediaQuery("(max-width:430px)");

  return (
    // <Card className="flex justify-between px-5 items-center w-full">
    //   <div className="flex items-center space-x-5 justify-center">
    //     <img src="/biryani.jpg" className="h-16 w-16 p-1" />
    //     <div className="xs-mx:text-sm">
    //       <p>{order.foodName}</p>
    //       <p>{order.totalPrice}</p>
    //     </div>
    //   </div>
    //   <div>
    //     <Button
    //       variant="contained"
    //       className="cursor-not-allowed"
    //       size="small"
    //       sx={{
    //         fontSize: isSmallScreen ? "0.65rem" : "0.75rem",
    //         padding: isSmallScreen ? "2px 6px" : "4px 10px",
    //         minWidth: isSmallScreen ? "50px" : "64px",
    //       }}
    //     >
    //       completed
    //     </Button>
    //   </div>
    // </Card>

    <Card
  className={`px-5 py-5 items-center w-full ${
    extraSmall ? "flex flex-col gap-3" : "flex justify-between"
  }`}
>
  {/* Top row (image + details) */}
  <div className="flex items-start space-x-5  w-full">
    <img src="/biryani.jpg" className="h-16 w-16 p-1" />
    <div className={`${extraSmall ? "text-sm" : ""}`}>
      <p>{order.foodName}</p>
      <p>{order.totalPrice}</p>
    </div>
  </div>

  {/* Bottom row (button) */}
  <div className={`${extraSmall ? "w-full flex justify-center" : ""}`}>
    <Button
      variant="contained"
      className="cursor-not-allowed"
      size="small"
      sx={{
        fontSize: extraSmall ? "0.65rem" : "0.75rem",
        padding: extraSmall ? "2px 6px" : "4px 10px",
        minWidth: extraSmall ? "50px" : "64px",
      }}
    >
      completed
    </Button>
  </div>
</Card>

  );
};

export default OrderCard;
