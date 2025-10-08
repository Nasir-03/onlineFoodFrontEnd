// import { Alert, Box, Card, CardHeader, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
// import React, { captureOwnerStack, useEffect } from 'react'
// import CreateIcon from '@mui/icons-material/Create';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
// import { deleteFood } from '../../src/component/service/FoodService';
// import { getResturantByUserId } from '../../src/component/service/ResturantService';
// import { getResturantFood } from '../../src/component/service/FoodService';

// const MenuTable = () => {

//   const navigate = useNavigate();

//   const [restaurants, setRestaurants] = React.useState([{}]);
//     const [resturantFood,setResturantFood] = React.useState([{}]);
//     const[notification,setNotification] = React.useState(null);
//     const jwt = localStorage.getItem("jwt");

//      // Fetch restaurants 
//         useEffect(() => {
//           const fetchData = async () => {
//             if (!jwt) return;
//             try {
//               const response = await getResturantByUserId(jwt);
//               console.log("Fetched restaurants:", response);
//               setRestaurants(response);
//             } catch (error) {
//               console.error("Error fetching restaurants:", error);
//             }
//           };
//           fetchData();
//         }, [jwt]);


//         useEffect(() => {
//           const fetchAllFood = async () => {
//             if (!restaurants.length) return;
        
//             try {
//               // Fetch food for each restaurant
//               const allFood = await Promise.all(
//                 restaurants.map(async (restaurant) => {
//                   const foods = await getResturantFood(
//                     true, // vegeterian
//                     true, // seasonal
//                     false, // nonVeg
//                     "", // food_category
//                     restaurant.id,
//                     jwt
//                   );
        
//                   // Attach restaurant info to each food item
//                   return foods.map((food) => ({
//                     ...food,
//                     restaurantName: restaurant.name,
//                     restaurantId: restaurant.id
//                   }));
//                 })
//               );
        
//               // Flatten the array of arrays
//               const mergedFood = allFood.flat();
//               setResturantFood(mergedFood);
//             } catch (err) {
//               console.error("Error fetching food for restaurants:", err);
//             }
//           };
        
//           fetchAllFood();
//         }, [restaurants, jwt]);

//   const handleDeleteFood = async(foodId) => {
//        try{
//         const response = await deleteFood(foodId, localStorage.getItem("jwt"));
//          setNotification({
//           severity: "success",
//           message: "Food item deleted successfully!",
//         });
//         console.log("Delete response:", foodId);
//          // Update UI immediately
//     const updatedFoods = resturantFood.filter(food => food.id !== foodId);
//     setResturantFood(updatedFoods); // <-- update the state
//        }catch(err){
//         setNotification({
//           severity: "error",
//           message: err.message || "Failed to delete food item.",
//         });
//         console.error("Error deleting food item:", err);
//        }
//   }

  

//   // Group foods by restaurant
//   const groupedFoods = resturantFood.reduce((acc, food) => {
//     const restName = food.restaurantName || "Unknown Restaurant";
//     if (!acc[restName]) acc[restName] = [];
//     acc[restName].push(food);
//     return acc;
//   }, {});

//   return (
//     <>
//     {/* 🔔 Notification on TOP of screen */}
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
//     <Box className='w-full'>
//       <Card className='mt-1'>
//         <CardHeader
//           action={
//             <IconButton onClick={() => navigate("/admin/resturant/add-menu")} aria-label='settings'>
//               <CreateIcon />
//             </IconButton>
//           }
//           title={"All Menu Items"}
//           sx={{ pt: 2, alignItems: "center" }}
//         />
//       </Card>

//       {/* Render a separate table per restaurant */}
//       {Object.keys(groupedFoods).map((restaurantName) => (
//         <Box key={restaurantName} sx={{   textAlign: "center",mb:5, fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
//           {/* Restaurant Name */}
//           <Typography variant="h6" sx={{ mb: 1, color: "red",fontSize: "30px" }}>{restaurantName}</Typography>

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label={`${restaurantName} menu table`}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="left">Images</TableCell>
//                   <TableCell align="right">Title</TableCell>
//                   <TableCell align="right">Ingredients</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">Availability</TableCell>
//                   <TableCell align="right">Delete</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {groupedFoods[restaurantName].map((food) => (
//                   <TableRow key={food.id}>
//                     <TableCell align="left">
//                       {food.images?.length > 0 && (
//                         <img src={food.images[0]} alt={food.name} width={50} height={50} />
//                       )}
//                     </TableCell>
//                     <TableCell align="right">{food.name}</TableCell>
//                     <TableCell align="right">{food.ingredients?.map(i => i.name).join(", ")}</TableCell>
//                     <TableCell align="right">{food.price}</TableCell>
//                     <TableCell align="right">{food.available?"In Stock":"Out Of Stock"}</TableCell>
//                     <TableCell align="right">
//                       <IconButton onClick={() => handleDeleteFood(food.id)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       ))}
//     </Box>
//     </>
//   )
// }

// export default MenuTable;






import {
  Alert,
  Box,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteFood, getResturantFood } from "../../src/component/service/FoodService";
import { getResturantByUserId } from "../../src/component/service/ResturantService";

const MenuTable = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = React.useState([{}]);
  const [resturantFood, setResturantFood] = React.useState([{}]);
  const [notification, setNotification] = React.useState(null);
  const jwt = localStorage.getItem("jwt");

  // Fetch restaurants
  useEffect(() => {
    const fetchData = async () => {
      if (!jwt) return;
      try {
        const response = await getResturantByUserId(jwt);
        console.log("Fetched restaurants:", response);
        setRestaurants(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchData();
  }, [jwt]);

  useEffect(() => {
    const fetchAllFood = async () => {
      if (!restaurants.length) return;

      try {
        const allFood = await Promise.all(
          restaurants.map(async (restaurant) => {
            const foods = await getResturantFood(
              true, // vegeterian
              true, // seasonal
              false, // nonVeg
              "", // food_category
              restaurant.id,
              jwt
            );

            return foods.map((food) => ({
              ...food,
              restaurantName: restaurant.name,
              restaurantId: restaurant.id,
            }));
          })
        );

        const mergedFood = allFood.flat();
        setResturantFood(mergedFood);
      } catch (err) {
        console.error("Error fetching food for restaurants:", err);
      }
    };

    fetchAllFood();
  }, [restaurants, jwt]);

  const handleDeleteFood = async (foodId) => {
    try {
      await deleteFood(foodId, localStorage.getItem("jwt"));
      setNotification({
        severity: "success",
        message: "Food item deleted successfully!",
      });
      const updatedFoods = resturantFood.filter((food) => food.id !== foodId);
      setResturantFood(updatedFoods);
    } catch (err) {
      setNotification({
        severity: "error",
        message: err.message || "Failed to delete food item.",
      });
      console.error("Error deleting food item:", err);
    }
  };

  const groupedFoods = resturantFood.reduce((acc, food) => {
    const restName = food.restaurantName || "Unknown Restaurant";
    if (!acc[restName]) acc[restName] = [];
    acc[restName].push(food);
    return acc;
  }, {});

  return (
    <>
      {/* 🔔 Notification */}
      {notification && (
        <Snackbar
          open={!!notification}
          autoHideDuration={3000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {notification && (
            <Alert
              onClose={() => setNotification(null)}
              severity={notification.severity}
              sx={{ width: "100%" }}
            >
              {notification.message}
            </Alert>
          )}
        </Snackbar>
      )}

      <Box sx={{ width: "100%", px: { xs: 1, sm: 2, md: 3 } }}>
        <Card sx={{ mt: 1 }}>
          <CardHeader
            action={
              <IconButton onClick={() => navigate("/admin/resturant/add-menu")} aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"All Menu Items"}
            sx={{ pt: 2, alignItems: "center" }}
          />
        </Card>

        {Object.keys(groupedFoods).map((restaurantName) => (
          <Box
            key={restaurantName}
            sx={{
              textAlign: "center",
              mb: 5,
              fontWeight: "bold",
              mt: 3,
            }}
          >
            {/* Restaurant Name */}
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                color: "red",
                fontSize: { xs: "20px", sm: "24px", md: "30px" },
              }}
            >
              {restaurantName}
            </Typography>

            {/* Responsive Table */}
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
              <Table
                sx={{
                  minWidth: 650,
                  "& th, & td": {
                    whiteSpace: "nowrap",
                  },
                }}
                aria-label={`${restaurantName} menu table`}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Images</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Ingredients</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Availability</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedFoods[restaurantName].map((food) => (
                    <TableRow key={food.id}>
                      <TableCell align="left">
                        {food.images?.length > 0 && (
                          <img
                            src={food.images[0]}
                            alt={food.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">{food.name}</TableCell>
                      <TableCell align="right">
                        {food.ingredients?.map((i) => i.name).join(", ")}
                      </TableCell>
                      <TableCell align="right">₹{food.price}</TableCell>
                      <TableCell align="right">
                        {food.available ? "In Stock" : "Out Of Stock"}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleDeleteFood(food.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MenuTable;
