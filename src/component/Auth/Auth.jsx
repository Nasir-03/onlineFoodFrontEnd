// import { Box, Modal } from '@mui/material';
// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// // import { style } from '../cart/Cart';
// import RegisterForm from './RegisterForm';
// import LoginForm from './LoginForm';


// const style = {
//   position: "absolute",
//   top: { xs: "5%", sm: "50%" },   // near top on mobile, center on desktop
//   left: "50%",
//   transform: {
//     xs: "translateX(-50%)",       // only center horizontally on mobile
//     sm: "translate(-50%, -50%)",  // fully center on desktop
//   },
//   width: "95%",
//   maxWidth: 400,
//   maxHeight: "90vh",
//   overflowY: "auto",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: { xs: 2, sm: 4 },
//   borderRadius: 2,
// };


// const Auth = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const handleOnClose = ()=> {
//         navigate("/")
//     }

//   return (
//     <div>
       
//        <Modal
//   onClose={handleOnClose}
//   open={
//     location.pathname === "/account/register" ||
//     location.pathname === "/account/login"
//   }
//   slotProps={{
//     backdrop: {
//       sx: { backgroundColor: "rgba(0,0,0,0.4)" },
//     },
//   }}
// >
//   <Box sx={style}>
//     {location.pathname === "/account/register"
//       ? <RegisterForm />
//       : <LoginForm />}
//   </Box>
// </Modal>




//     </div>
//   )
// }

// export default Auth





import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: { xs: "20%", sm: "55%" }, // top on mobile, center on desktop
    left: "50%",
    transform: { xs: "translateX(-50%)", sm: "translate(-50%, -50%)" },
    width: { xs: "90%", sm: 400 },
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
    borderRadius: 2,
  };

  return (
    <Modal
      onClose={handleOnClose}
      open={
        location.pathname === "/account/register" ||
        location.pathname === "/account/login"
      }
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0,0,0,0.4)" },
        },
      }}
    >
      <Box sx={style}>
        {location.pathname === "/account/register" ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </Box>
    </Modal>
  );
};

export default Auth;
