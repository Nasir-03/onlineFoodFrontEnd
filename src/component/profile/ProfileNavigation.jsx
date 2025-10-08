import React, { useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, useMediaQuery, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeJwt } from "../state/JwtSlice";
import { removeUser } from "../state/UserSlice";
import { clearCart } from "../state/CartSlice";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favourite", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payment", icon: <AccountTreeIcon /> },
  { title: "Notification", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const navbarHeight = 84; // Adjust to your navbar height in px

const ProfileNavigation = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:1025px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(removeJwt());
      dispatch(removeUser());
      dispatch(clearCart());
      navigate("/");
      return;
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }

    if (isSmallScreen) setOpen(false); // close drawer on mobile
  };

  return (
    <>
      {/* Menu Icon for mobile */}
      {isSmallScreen && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: `${navbarHeight + 16}px`,
            left: 16,
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={isSmallScreen ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            top: `${navbarHeight}px`,
            height: `calc(100% - ${navbarHeight}px)`,
            width: isSmallScreen ? "30vw" : "250px",
            zIndex: 1200,
          },
        }}
      >
        <div className="flex flex-col justify-start pt-6 px-4 text-xl gap-6 h-full">
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => handleNavigate(item)}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.title}</span>
              </div>
              {index !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default ProfileNavigation;
