import React from "react";
import ProfileNavigation from "./ProfileNavigation";
import UserProfile from "./UserProfile";
import { Route, Routes } from "react-router-dom";
import Order from "./Order";
import Favourite from "./Favourite";
import Address from "./Address";
import Events from "./Events";
import Logout from "./Logout";
import { useMediaQuery } from "@mui/material";

const navbarHeight = 64; // same as above

const Profile = () => {
  const isSmallScreen = useMediaQuery("(max-width:1025px)");

  return (
    <div className={`flex ${isSmallScreen ? "flex-col" :"flex-row"} w-full px-10`}>
      {/* Sidebar / Navigation */}
      <div
        className={`${isSmallScreen ? "w-full" : "w-[10px]"}`}
        style={{
          position: "sticky",
          top: `${navbarHeight}px`,
          height: isSmallScreen ? "auto" : `calc(100vh - ${navbarHeight}px)`,
        }}
      >
        <ProfileNavigation />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 px-4 ${isSmallScreen ? "mt-4" : "ml-[250px]"}`}
      >
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/address" element={<Address />} />
          <Route path="/events" element={<Events />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
