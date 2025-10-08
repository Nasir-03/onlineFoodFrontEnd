// import { Avatar, Badge, Box, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import MenuIcon from '@mui/icons-material/Menu';


// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const Navbar = () => {

//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const cart = useSelector((state)=>state.cart);


//   const handleAvatar = () => {
//   if (user?.id) { // or user?.fullName
//     if (user?.role === "ROLE_RESTURANT_OWNER") {
//       navigate("/admin/resturant");
//       return;
//     }
//     navigate("/my-profile");
//   } else {
//     navigate("/account/login");
//   }
// };


//   return (
//     <Box
//       sx={{
//         position: "sticky",
//         top: 0,
//         zIndex: 1000, // make sure navbar is above everything
//         bgcolor: "#e91e63",
//         px: { xs: 2, sm: 5 },
//         py: 2,
//         minHeight: 60, // ensure clickable area
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* Logo */}
//       <Box
//         sx={{
//           cursor: "pointer",
//           fontSize: "1.5rem",
//           fontWeight: 600,
//           color: "#f0f0f0",
//         }}
//         onClick={() => navigate("/")}
//       >
//         Nasir Food
//       </Box>

//       {/* Right side icons */}
//       {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2,  }}>
//         <IconButton sx={{ cursor: "pointer" }}>
//           <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
//         </IconButton>

//         <IconButton
//           sx={{
//             cursor: "pointer",
//             width: 40,
//             height: 40,
//             p: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={handleAvatar} 
//         >
//           {user ? (
//             <Avatar sx={{ bgcolor: "white", color: "black" }}>
//               {user?.fullName?.[0]?.toUpperCase() || "U"}
//             </Avatar>
//           ) : (
//             <AccountCircleIcon sx={{ color: "white", fontSize: 32 }} />
//           )}
//         </IconButton>

//         <IconButton sx={{ cursor: "pointer" }} onClick={()=>navigate("/cart")}>
//           <Badge badgeContent={cart?.length} color="error">
//             <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
//           </Badge>
//         </IconButton>
//       </Box>
//       <Box>
//         <IconButton className="hidden sm-mx:"> 
//            <MenuIcon sx={{ fontSize: "1.5rem", color: "white",}} />
//         </IconButton>
//       </Box> */}


//       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//   {/* Search + Avatar + Cart: show only on sm and up */}
//   <div className="hidden sm:flex items-center gap-2">
//     {/* Search */}
//     <IconButton sx={{ cursor: "pointer" }}>
//       <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
//     </IconButton>

//     {/* Avatar */}
//     <IconButton
//       sx={{
//         cursor: "pointer",
//         width: 40,
//         height: 40,
//         p: 0,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//       onClick={handleAvatar}
//     >
//       {user ? (
//         <Avatar sx={{ bgcolor: "white", color: "black" }}>
//           {user?.fullName?.[0]?.toUpperCase() || "U"}
//         </Avatar>
//       ) : (
//         <AccountCircleIcon sx={{ color: "white", fontSize: 32 }} />
//       )}
//     </IconButton>

//     {/* Cart */}
//     <IconButton sx={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>
//       <Badge badgeContent={cart?.length} color="error">
//         <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
//       </Badge>
//     </IconButton>
//   </div>

//   {/* Menu icon: show only on xs screens */}
//   <div className="sm:hidden">
//     <IconButton onClick={toggleDrawer(true)}>
//       <MenuIcon sx={{ fontSize: "1.5rem", color: "white" }} />
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {/* {DrawerList} */}
//       </Drawer>
//     </IconButton>
//   </div>
// </Box>

//     </Box>
//   );
// };

// export default Navbar;



import {
  Avatar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Drawer from "@mui/material/Drawer";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (state) => () => setOpen(state);

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleAvatar = () => {
    if (user?.id) {
      if (user?.role === "ROLE_RESTURANT_OWNER") {
        navigate("/admin/resturant");
        return;
      }
      navigate("/my-profile");
    } else {
      navigate("/account/login");
    }
  };

  const DrawerContent = () => (
    <Box sx={{ width: 150 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* Avatar + Name */}
        <ListItem>
          <ListItemIcon>
            {user ? (
              <Avatar sx={{ bgcolor: "pink", color: "black" }}>
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </Avatar>
            ) : (
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={user?.fullName || "Guest"}
            onClick={handleAvatar}
          />
        </ListItem>
        <Divider />

        {/* Search */}
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>

        {/* Cart */}
        <ListItem button onClick={() => navigate("/cart")}>
          <ListItemIcon>
            <Badge badgeContent={cart?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "#e91e63",
        px: { xs: 2, sm: 5 },
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          cursor: "pointer",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#f0f0f0",
        }}
        onClick={() => navigate("/")}
      >
        Nasir Food
      </Box>

      {/* Desktop: Avatar, Cart, Search */}
      <div className="hidden sm:flex items-center gap-2">
        <IconButton sx={{ color: "white" }}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleAvatar}>
          {user ? (
            <Avatar sx={{ bgcolor: "white", color: "black" }}>
              {user?.fullName?.[0]?.toUpperCase() || "U"}
            </Avatar>
          ) : (
            <AccountCircleIcon sx={{ color: "white", fontSize: 32 }} />
          )}
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={() => navigate("/cart")}>
          <Badge badgeContent={cart?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden">
        <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <DrawerContent />
        </Drawer>
      </div>
    </Box>
  );
};

export default Navbar;
