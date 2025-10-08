// import React from "react";
// import AdminSidebar from "./AdminSidebar";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Dashboard from "../Dashboard/Dashboard";
// import FoodCategory from "../FoodCategory/FoodCategory";
// import Ingredients from "../Ingredients/Ingredients";
// import Event from "../Event/Event";
// import ResturantDetails from "../Details/ResturantDetails";
// import Menu from "../menu/Menu";
// import Order from "../order/Order";
// import CreateMenuForm from "../menu/CreateMenuForm";
// import CreateResturantForm from "../CreateResturantForm";
// import { Button, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";

// const Admin = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (state) => () => setOpen(state);

//   return (
//     <div className="flex h-screen w-screen overflow-hidden">
//       {/* Sidebar for >=1280px (always visible) */}
//       <div className="hidden xl:block w-1/5 h-screen sticky top-0 bg-gray-900">
//         <AdminSidebar handleClose={() => setOpen(false)} />
//       </div>

//       {/* Menu button + Drawer for <1280px */}
//       <div className="block xl:hidden fixed top-4 left-4 z-50">
//         <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
//           <MenuIcon />
//         </IconButton>
//         <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
//           <div className="w-64 bg-gray-900 h-full">
//             <AdminSidebar handleClose={toggleDrawer(false)} />
//           </div>
//         </Drawer>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 h-screen overflow-y-auto bg-black">
//         <div className="flex justify-center py-10 bg-gray-800">
//           <Button variant="contained" onClick={() => navigate("/")}>
//             Home
//           </Button>
//         </div>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/orders" element={<Order />} />
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/category" element={<FoodCategory />} />
//           <Route path="/ingredients" element={<Ingredients />} />
//           <Route path="/event" element={<Event />} />
//           <Route path="/details" element={<ResturantDetails />} />
//           <Route path="/add-menu" element={<CreateMenuForm />} />
//           <Route path="/new/resturant" element={<CreateResturantForm />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Admin;





import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import Event from "../Event/Event";
import ResturantDetails from "../Details/ResturantDetails";
import Menu from "../menu/Menu";
import Order from "../order/Order";
import CreateMenuForm from "../menu/CreateMenuForm";
import CreateResturantForm from "../CreateResturantForm";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const Admin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1280px)");

  const toggleDrawer = (state) => () => setOpen(state);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* Sidebar for >=1280px (always visible) */}
      {isLargeScreen && (
        <div className="w-1/5 h-screen sticky top-100 bg-gray-100">
          <AdminSidebar handleClose={() => setOpen(false)} />
        </div>
      )}

      {/* Menu button + Drawer for <1280px */}
      {!isLargeScreen && (
        <div className="fixed top-4 left-4 z-50">
          <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            <div className="w-64 bg-gray-900 h-full">
              <AdminSidebar handleClose={toggleDrawer(false)} />
            </div>
          </Drawer>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="flex justify-center py-10 bg-gray-800">
          <Button variant="contained" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category" element={<FoodCategory />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/event" element={<Event />} />
          <Route path="/details" element={<ResturantDetails />} />
          <Route path="/add-menu" element={<CreateMenuForm />} />
          <Route path="/new/resturant" element={<CreateResturantForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
