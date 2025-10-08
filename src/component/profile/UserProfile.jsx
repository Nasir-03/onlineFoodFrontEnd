import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../state/CartSlice";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../state/UserSlice";
import { removeJwt } from "../state/JwtSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || "{}";

  useEffect(()=>{console.log("user is ",user.fullName)})

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(clearCart());
    dispatch(removeJwt())
    console.log("logout");
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">{user.fullName}</h1>
        <p>Email: {user.email}</p>
        <Button
          variant="contained"
          sx={{ margin: "2rem 0rem" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
