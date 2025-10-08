// import React from "react";
// import MenuTable from "../menu/MenuTable";
// import { Button, Grid, IconButton } from "@mui/material";
// import OrderTable from "../order/OrderTable";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {

//   const navigate = useNavigate();

//   const handleAddResturant = () => {
//     navigate("/admin/resturant/new/resturant"); // navigate to form route
//   };




//   return (
//     <div className="m-5">
//       <div className="pb-5">
//         <IconButton onClick={handleAddResturant}>
//           <Button variant="contained">Add Restaurant</Button>
//         </IconButton>
//       </div>
//       <Grid container spacing={2}>
//         <Grid item size={6}>
//           <MenuTable />
//         </Grid>
//         <Grid item size={6}>
//           <OrderTable />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;












import React from "react";
import MenuTable from "../menu/MenuTable";
import { Button, Grid, IconButton } from "@mui/material";
import OrderTable from "../order/OrderTable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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

      <Grid container spacing={2}>
        {/* Full width on mobile, half on md+ */}
        <Grid item size={6} md={6}>
          <MenuTable />
        </Grid>
        <Grid item size={6} md={6}>
          <OrderTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
