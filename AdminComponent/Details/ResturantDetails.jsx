// import React, { useEffect } from "react";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
// import { useState } from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import { useSelector } from "react-redux";
// import {
//   createResturant,
//   deleteResturantById,
//   getResturantById,
//   getResturantByUserId,
// } from "../../src/component/service/ResturantService";
// import { Alert, IconButton, Snackbar } from "@mui/material";

// const ResturantDetails = () => {
//   const [restaurant, setRestaurant] = useState([]);
//   const handleResturantStatus = () => {};
//   const [notification, setNotification] = useState(null);

//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) {
//       getResturantByUserId(jwt)
//         .then((data) => {
//           console.log("response data is...", data);
//           setRestaurant(data);
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [jwt]);

//   const handleDeleteRestaurant = async(id) => {
//       try{
//           const response = await deleteResturantById(id,jwt);
//           console.log("delete response is: ",response);
//           setNotification({
//             severity: "success",
//             message: "Restaurant deleted successfully!",
//           });
//       }catch(err) {
//         setNotification({
//           severity: "error",
//           message: err.message || "Failed to delete restaurant.",
//         });
//         console.error(err);
//       }
//   }

//   return (
//     <>
//      {/* 🔔 Notification on TOP of screen */}
//           {notification && (
//             <Snackbar
//               open={!!notification}
//               autoHideDuration={3000}
//               onClose={() => setNotification(null)}
//               anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//               {notification && (
//                 <Alert
//                   onClose={() => setNotification(null)}
//                   severity={notification.severity}
//                   sx={{ width: "100%" }}
//                 >
//                   {notification.message}
//                 </Alert>
//               )}
//             </Snackbar>
//           )}
//     <div className="lg:px-20 px-5 w-full max-h-screen overflow-y-auto">
//       {restaurant.map((item,index) => (
//       <div className="pb-5">
//         <div className="py-5 flex justify-center items-center gap-5">
//           <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
//             {item.name}
//           </h1>
//           <div>
//             <Button
//                 color={item.open ? "error" : "success"}
//                 variant="contained"
//                 className="py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base"
//               >
//                 {item.open ? "Closed" : "Opened"}
//               </Button>
//           </div>
//           <div>
//             <IconButton onClick={() => handleDeleteRestaurant(item.id)}>
//             <Button variant="contained" className="py-[1rem] px-[2rem]" size="medium">
//                 Delete Restaurant
//             </Button>
//             </IconButton>
//           </div>
//         </div>

//         <Grid container spacing={2} className="px-5">
//           {/* First full-width */}
//           <Grid item xs={12}>
//             <Card className="w-full ">
//               <CardHeader
//                 title={<span className="text-gray-300">Resturant</span>}
//               />
//               <CardContent>
//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Owner</p>
//                     <p className="text-gray-400">
//                       <span className="pr-5">-</span>
//                       <span className="px-5 py-2 rounded-full">
//                         {item.ownerName}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Restaurant Name </p>
//                     <p className="text-gray-400">
//                       <span className="pr-5"> - </span>
//                       <span className="px-5 py-2 rounded-full">
//                         {item.name}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Cuisine Type</p>
//                     <p className="text-gray-400">
//                       <span className="pr-2 text-gray-400">-</span>
//                       <span className="px-5 py-2 rounded-full">
//                         {item.cuisineType}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">opening hours</p>
//                     <p className="text-gray-400">
//                       <span className="pr-2 text-gray-400">-</span>
//                       <span className="px-5 py-2 rounded-full">
//                         {item.openingHours}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Status</p>
//                     <span className="pr-2 text-gray-400">-</span>
//                     {item.open ? (
//                       <span className="px-5 py-2 rounded-full bg-green-400 text-green-400">
//                         Open
//                       </span>
//                     ) : (
//                       <span className="px-5 py-2 rounded-full bg-red-400 text-white">
//                         Closed
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12}>
//             <Card className="w-full">
//               <CardHeader
//                 title={<span className="text-gray-300">Address</span>}
//               />
//               <CardContent>
//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Country</p>
//                     <p className="text-gray-400">
//                       <span className="pr-5">-</span>
//                       <span className="px-5 py-2 rounded-full">India</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">City</p>
//                     <p className="text-gray-400">
//                       <span className="pr-5"> - </span>
//                       <span className="px-5 py-2 rounded-full">Banglore</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Postal Code</p>
//                     <p className="text-gray-400">
//                       <span className="pr-2 text-gray-400">-</span>
//                       <span className="px-5 py-2 rounded-full">822010</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Street Address</p>
//                     <p className="text-gray-400">
//                       <span className="pr-2 text-gray-400">-</span>
//                       <span className="px-5 py-2 rounded-full">
//                         Boring Road
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={6}>
//             <Card className="w-full">
//               <CardHeader
//                 title={<span className="text-gray-300">Contact</span>}
//               />
//               <CardContent>
//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Email</p>
//                     <p className="text-gray-400">
//                       <span className="pr-5">-</span>
//                       <span className="px-5 py-2 rounded-full">
//                         {item.contactInformation.email}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Mobile</p>
//                     <p className="text-gray-400">
//                       <span className="pr-5"> - </span>
//                       <span className="px-5 py-2 rounded-full">
//                          {item.contactInformation.mobile}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pb-3 text-gray-200">
//                   <div className="flex items-center gap-2">
//                     <p className="w-48">Social</p>
//                     <div className="flex items-center text-gray-400 pb-3 gap-2">
//                       <span className="pr-5 pl-5">-</span>
//                       <a href="/">
//                         <InstagramIcon sx={{ fontSize: "3rem" }} />
//                       </a>

//                       <a href="/">
//                         <FacebookIcon sx={{ fontSize: "3rem" }} />
//                       </a>

//                       <a href="/">
//                         <TwitterIcon sx={{ fontSize: "3rem" }} />
//                       </a>

//                       <a href="/">
//                         <LinkedInIcon sx={{ fontSize: "3rem" }} />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </div>
//        ))} 
//     </div>
//     </>
//   );
// };

// export default ResturantDetails;










import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  deleteResturantById,
  getResturantByUserId,
} from "../../src/component/service/ResturantService";

const ResturantDetails = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [notification, setNotification] = useState(null);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      getResturantByUserId(jwt)
        .then((data) => setRestaurant(data))
        .catch((err) => console.error(err));
    }
  }, [jwt]);

  const handleDeleteRestaurant = async (id) => {
    try {
      await deleteResturantById(id, jwt);
      setNotification({
        severity: "success",
        message: "Restaurant deleted successfully!",
      });
      setRestaurant((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setNotification({
        severity: "error",
        message: err.message || "Failed to delete restaurant.",
      });
      console.error(err);
    }
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <Snackbar
          open={!!notification}
          autoHideDuration={3000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setNotification(null)}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}

      {/* Main container: always scrollable */}
      <div className="flex flex-col min-h-screen w-full px-5 lg:px-20 py-5 bg-gray-900 text-white">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {restaurant.map((item) => (
            <div key={item.id} className="pb-5 flex flex-col gap-5">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
                <h1 className="text-2xl lg:text-5xl text-center md:text-left font-bold">
                  {item.name}
                </h1>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    color={item.open ? "error" : "success"}
                    variant="contained"
                    className="py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base"
                  >
                    {item.open ? "Closed" : "Opened"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base"
                    onClick={() => handleDeleteRestaurant(item.id)}
                  >
                    Delete Restaurant
                  </Button>
                </div>
              </div>

              {/* Grid for cards */}
              <Grid container spacing={2}>
                {/* Restaurant Info */}
                <Grid item xs={12}>
                  <Card className="w-full bg-gray-800">
                    <CardHeader
                      title={<span className="text-gray-300">Restaurant</span>}
                    />
                    <CardContent className="space-y-4 text-gray-200">
                      <div className="flex items-center gap-2">
                        <p className="w-48">Owner</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          {item.ownerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Restaurant Name</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Cuisine Type</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          {item.cuisineType}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Opening Hours</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          {item.openingHours}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Status</p>
                        <span
                          className={`px-5 py-2 rounded-full ${
                            item.open
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {item.open ? "Open" : "Closed"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Address */}
                <Grid item xs={12} md={6}>
                  <Card className="w-full bg-gray-800">
                    <CardHeader
                      title={<span className="text-gray-300">Address</span>}
                    />
                    <CardContent className="space-y-4 text-gray-200">
                      <div className="flex items-center gap-2">
                        <p className="w-48">Country</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          India
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">City</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          Banglore
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Postal Code</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          822010
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Street Address</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          Boring Road
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Contact */}
                <Grid item xs={12} md={6}>
                  <Card className="w-full bg-gray-800">
                    <CardHeader
                      title={<span className="text-gray-300">Contact</span>}
                    />
                    <CardContent className="space-y-4 text-gray-200">
                      <div className="flex items-center gap-2">
                        <p className="w-48">Email</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          {item.contactInformation.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Mobile</p>
                        <p className="px-5 py-2 rounded-full bg-gray-700">
                          {item.contactInformation.mobile}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="w-48">Social</p>
                        <div className="flex gap-2 text-gray-400">
                          <InstagramIcon sx={{ fontSize: "2rem" }} />
                          <FacebookIcon sx={{ fontSize: "2rem" }} />
                          <TwitterIcon sx={{ fontSize: "2rem" }} />
                          <LinkedInIcon sx={{ fontSize: "2rem" }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResturantDetails;
