import React from "react";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeJwt } from "../../src/component/state/JwtSlice";
import { removeUser } from "../../src/component/state/UserSlice";
import { clearCart } from "../../src/component/state/CartSlice";

const menu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Event", icon: <EventIcon />, path: "/event" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

const AdminSidebar = ({ handleClose }) => {

  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item)=> {
    navigate(`/admin/resturant${item.path}`)

     if (item.title === "Logout"){
           dispatch(removeJwt());
           dispatch(removeUser());
           dispatch(clearCart())
           console.log("logout");
           navigate("/");
           handleClose()
        }
  }



  return (
    <>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={true}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        disablePortal // 👈 this makes the drawer render inside parent
        sx={{
          zIndex: 1,
          position: "relative",
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? "70vw" : "20vw",
            height: "100vh", // full screen height
            position: "relative",
          },
        }}
      >
        <div className="flex flex-col text-xl h-full" >
          {menu.map((item, index) => (
            <div key={index} onClick={()=>handleNavigate(item)}>
              <div className="px-5 flex items-center gap-5 cursor-pointer py-5 hover:bg-gray-100">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {index !== menu.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default AdminSidebar;
