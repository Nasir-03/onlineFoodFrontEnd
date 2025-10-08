import React from "react";
import MenuTable from "../menu/MenuTable";
import { Button, Grid, IconButton, useMediaQuery } from "@mui/material";
import OrderTable from "../order/OrderTable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handleAddResturant = () => {
    navigate("/admin/resturant/new/resturant");
  };

  return (
    <div className="m-5">
      <div className="pb-5">
        <IconButton onClick={handleAddResturant}>
          <Button variant="contained">Add Restaurant</Button>
        </IconButton>
      </div>

      <Grid container spacing={2} direction={isLargeScreen ? "row" : "column"}>
        {/* Full width on mobile, half on md+ */}
        <Grid item size={isLargeScreen ? 6 : 12}>
          <MenuTable />
        </Grid>
        <Grid item size={isLargeScreen ? 6 : 12}>
          <OrderTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
