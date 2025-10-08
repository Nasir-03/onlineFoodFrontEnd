// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Menu,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   fetchResturantOrders,
//   updateOrderStatusService,
// } from "../../src/component/service/OrderService";

// const orderStatus = [
//   { label: "Pending", value: "PENDING" },
//   { label: "Completed", value: "COMPLETED" },
//   { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
//   { label: "Delivered", value: "DELIVERED" },
// ];

// const OrderTable = () => {
//   const jwt = useSelector((state) => state.jwt);
//   const [orderList, setOrderList] = useState([]);

//   // for menu control
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const open = Boolean(anchorEl);

//   const handleClick = (event, orderId) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedOrderId(orderId);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedOrderId(null);
//   };

//   const handleUpdateStatus = async (status) => {
//     try {
//       if (!selectedOrderId) return;

//       await updateOrderStatusService(selectedOrderId, status, jwt);

//       // Update UI immediately
//       setOrderList((prev) =>
//         prev.map((order) =>
//           order.id === selectedOrderId ? { ...order, orderStatus: status } : order
//         )
//       );
//     } catch (err) {
//       console.log("Error in updating order status", err);
//     }
//     handleClose();
//   };

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const response = await fetchResturantOrders(12, jwt); // replace 12 with dynamic restaurantId
//         setOrderList(response);
//         console.log("Orders fetched: ", response);
//       } catch (err) {
//         console.log("Error in fetching orders", err);
//       }
//     };
//     getOrders();
//   }, [jwt]);

//   return (
//     <Box sx={{ width: "100%",  }}>
//       <Card className="mt-1">
//         <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
//       </Card>

//       {orderList.length === 0 && (
//         <Typography variant="h6" align="center" sx={{ mt: 2 }}>
//           No orders found.
//         </Typography>
//       )}

//       {orderList.length > 0 && (
//         <>
//           <Typography variant="h4" align="center" sx={{ mt: 2,pb:2 }}>
//             Total Orders: {orderList.length}
//           </Typography>

//           {/* <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="order table"> */}


//               <TableContainer component={Paper} sx={{ width: "100%" }}>
//   <Table sx={{ width: "100%" }} aria-label="order table">

//               <TableHead>
//                 <TableRow>
//                   <TableCell>Order Id</TableCell>
//                   <TableCell align="right">Image</TableCell>
//                   <TableCell align="right">Customer</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">Food Name</TableCell>
//                   <TableCell align="right">Ingredients</TableCell>
//                   <TableCell align="right">Status</TableCell>
//                   <TableCell align="right">Update</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {orderList.map((order) =>
//                   order.orderItems.map((row, index) => (
//                     <TableRow key={`${order.id}-${index}`}>
//                       <TableCell component="th" scope="row">
//                         {order.id}
//                       </TableCell>
//                       <TableCell align="right">
//                         <img
//                           src={row.imageUrl || "https://via.placeholder.com/50"}
//                           alt="food"
//                           style={{ width: 50, height: 50 }}
//                         />
//                       </TableCell>
//                       <TableCell align="right">
//                         {order.customer?.fullName || "N/A"}
//                       </TableCell>
//                       <TableCell align="right">
//                         {row.totalPrice || 0}
//                       </TableCell>
//                       <TableCell align="right">
//                         {row.foodName || "N/A"}
//                       </TableCell>
//                       <TableCell align="left">
//                         {row.ingredients?.join(", ") || "None"}
//                       </TableCell>
//                       <TableCell align="right">{order.orderStatus}</TableCell>
//                       <TableCell align="right">
//                         <Button
//                           aria-controls={open ? "basic-menu" : undefined}
//                           aria-haspopup="true"
//                           aria-expanded={open ? "true" : undefined}
//                           onClick={(e) => handleClick(e, order.id)}
//                         >
//                           Update
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Single menu reused for all rows */}
//           <Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             slotProps={{
//               list: { "aria-labelledby": "basic-button" },
//             }}
//           >
//             {orderStatus.map((status) => (
//               <MenuItem
//                 key={status.value}
//                 onClick={() => handleUpdateStatus(status.value)}
//                 selected={
//                   orderList.find((o) => o.id === selectedOrderId)?.orderStatus ===
//                   status.value
//                 }
//               >
//                 {status.label}
//               </MenuItem>
//             ))}
//           </Menu>
//         </>
//       )}
//     </Box>
//   );
// };

// export default OrderTable;







// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Menu,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   fetchResturantOrders,
//   updateOrderStatusService,
// } from "../../src/component/service/OrderService";
// import { getResturantByUserId } from "../../src/component/service/ResturantService";

// const orderStatus = [
//   { label: "Pending", value: "PENDING" },
//   { label: "Completed", value: "COMPLETED" },
//   { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
//   { label: "Delivered", value: "DELIVERED" },
// ];

// const OrderTable = () => {

//   const jwt = useSelector((state) => state.jwt);
//   const [orderList, setOrderList] = useState([]);

//   // for menu control
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const open = Boolean(anchorEl);

//   const handleClick = (event, orderId) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedOrderId(orderId);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedOrderId(null);
//   };

//   const handleUpdateStatus = async (status) => {
//     try {
//       if (!selectedOrderId) return;

//       await updateOrderStatusService(selectedOrderId, status, jwt);

//       // Update UI immediately
//       setOrderList((prev) =>
//         prev.map((order) =>
//           order.id === selectedOrderId ? { ...order, orderStatus: status } : order
//         )
//       );
//     } catch (err) {
//       console.log("Error in updating order status", err);
//     }
//     handleClose();
//   };

//   // useEffect(() => {
//   //   const getOrders = async () => {
//   //     try {
//   //       const response = await fetchResturantOrders(3, jwt); // replace with dynamic restaurantId
//   //       setOrderList(response);
//   //     } catch (err) {
//   //       console.log("Error in fetching orders", err);
//   //     }
//   //   };
//   //   getOrders();
//   // }, [jwt]);

//     useEffect(() => {
//   const getOrdersForAllRestaurants = async () => {
//     try {
//       // 1️⃣ Fetch all restaurants of the logged-in user
//       const responseRestaurants = await getResturantByUserId(jwt);
//       // replace fetchUserRestaurants with your service to get restaurants
//       const restaurants = responseRestaurants || [];

//       // 2️⃣ For each restaurant, fetch orders
//       const ordersPromises = restaurants.map((rest) =>
//         fetchResturantOrders(rest.id, jwt)
//       );

//       const allOrders = await Promise.all(ordersPromises);

//       // 3️⃣ Flatten orders into a single array
//       const flattenedOrders = allOrders.flat();
//       setOrderList(flattenedOrders);
//     } catch (err) {
//       console.log("Error fetching orders for all restaurants", err);
//     }
//   };

//   getOrdersForAllRestaurants();
// }, [jwt]);



//   return (
//     <Box sx={{ width: "100%" }}>
//       <Card className="mt-1">
//         <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
//       </Card>

//       {orderList.length === 0 && (
//         <Typography variant="h6" align="center" sx={{ mt: 2 }}>
//           No orders found.
//         </Typography>
//       )}

//       {orderList.length > 0 && (
//         <>
//           <Typography variant="h4" align="center" sx={{ mt: 2, pb: 2 }}>
//             Total Orders: {orderList.length}
//           </Typography>

//           {/* ✅ Desktop / Tablet Table */}
//           <Box sx={{ display: { xs: "none", md: "block" } }}>
//             <TableContainer
//               component={Paper}
//               sx={{ width: "100%", overflowX: "auto",maxHeight: "75vh",  }}
//             >
//               <Table sx={{ minWidth: 900 }} aria-label="order table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Order Id</TableCell>
//                     <TableCell align="right">Image</TableCell>
//                     <TableCell align="right">Customer</TableCell>
//                     <TableCell align="right">Price</TableCell>
//                     <TableCell align="right">Food Name</TableCell>
//                     <TableCell align="right">Ingredients</TableCell>
//                     <TableCell align="right">Status</TableCell>
//                     <TableCell align="right">Update</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {orderList.map((order) =>
//                     order.orderItems.map((row, index) => (
//                       <TableRow key={`${order.id}-${index}`}>
//                         <TableCell>{order.id}</TableCell>
//                         <TableCell align="right">
//                           <img
//                             src={row.imageUrl || `pizza.jpg`}
//                             alt="food"
//                             style={{ width: 50, height: 50 }}
//                           />
//                         </TableCell>
//                         <TableCell align="right">
//                           {order.customer?.fullName || "N/A"}
//                         </TableCell>
//                         <TableCell align="right">
//                           {row.totalPrice || 0}
//                         </TableCell>
//                         <TableCell align="right">
//                           {row.foodName || "N/A"}
//                         </TableCell>
//                         <TableCell align="left">
//                           {row.ingredients?.join(", ") || "None"}
//                         </TableCell>
//                         <TableCell align="right">{order.orderStatus}</TableCell>
//                         <TableCell align="right">
//                           <Button
//                             aria-controls={open ? "basic-menu" : undefined}
//                             aria-haspopup="true"
//                             aria-expanded={open ? "true" : undefined}
//                             onClick={(e) => handleClick(e, order.id)}
//                           >
//                             Update
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>

//           {/* ✅ Mobile Card Layout */}
//           <Box sx={{ display: { xs: "block", md: "none" }, maxHeight: "75vh", overflowY: "auto" }}>
//             {orderList.map((order) =>
//               order.orderItems.map((row, index) => (
//                 <Card
//                   key={`${order.id}-${index}`}
//                   sx={{
//                     p: 2,
//                     mb: 2,
//                     border: "1px solid #444",
//                     borderRadius: 2,
//                     backgroundColor: "#111",
//                     color: "white",
//                   }}
//                 >
//                   <Typography variant="subtitle2">Order #{order.id}</Typography>
//                   <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
//                     <img
//                       src={row.imageUrl || "https://via.placeholder.com/50"}
//                       alt="food"
//                       style={{ width: 60, height: 60, borderRadius: 8 }}
//                     />
//                     <Box>
//                       <Typography>Customer: {order.customer?.fullName}</Typography>
//                       <Typography>Food: {row.foodName}</Typography>
//                       <Typography>Price: ₹{row.totalPrice}</Typography>
//                       <Typography sx={{ textAlign: "right" }}>
//                         Ingredients: {row.ingredients?.join(", ") || "None"}
//                       </Typography>
//                       <Typography>Status: {order.orderStatus}</Typography>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         sx={{ mt: 1 }}
//                         onClick={(e) => handleClick(e, order.id)}
//                       >
//                         Update
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Card>
//               ))
//             )}
//           </Box>

//           {/* Single menu reused for all rows */}
//           <Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             slotProps={{
//               list: { "aria-labelledby": "basic-button" },
//             }}
//           >
//             {orderStatus.map((status) => (
//               <MenuItem
//                 key={status.value}
//                 onClick={() => handleUpdateStatus(status.value)}
//                 selected={
//                   orderList.find((o) => o.id === selectedOrderId)?.orderStatus ===
//                   status.value
//                 }
//               >
//                 {status.label}
//               </MenuItem>
//             ))}
//           </Menu>
//         </>
//       )}
//     </Box>
//   );
// };

// export default OrderTable;












import {
  Box,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchResturantOrders,
  updateOrderStatusService,
} from "../../src/component/service/OrderService";
import { getResturantByUserId } from "../../src/component/service/ResturantService";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = () => {
  const jwt = useSelector((state) => state.jwt);
  const [orderList, setOrderList] = useState([]);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateStatus = async (status) => {
    try {
      if (!selectedOrderId) return;

      await updateOrderStatusService(selectedOrderId, status, jwt);

      setOrderList((prev) =>
        prev.map((order) =>
          order.id === selectedOrderId ? { ...order, orderStatus: status } : order
        )
      );
    } catch (err) {
      console.log("Error in updating order status", err);
    }
    handleClose();
  };

  useEffect(() => {
    const getOrdersForAllRestaurants = async () => {
      try {
        // 1️⃣ Fetch all restaurants of the user
        const restaurants = await getResturantByUserId(jwt);

        // 2️⃣ Fetch orders for each restaurant in parallel and attach restaurant name
        const ordersPromises = restaurants.map((rest) =>
          fetchResturantOrders(rest.id, jwt).then((orders) =>
            orders.map((o) => ({ ...o, restaurantName: rest.name }))
          )
        );

        const allOrdersNested = await Promise.all(ordersPromises);

        // 3️⃣ Flatten all orders
        const allOrders = allOrdersNested.flat();
        setOrderList(allOrders);
      } catch (err) {
        console.log("Error fetching orders for all restaurants", err);
      }
    };

    getOrdersForAllRestaurants();
  }, [jwt]);

  return (
    <Box sx={{ width: "100%" }}>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
      </Card>

      {orderList.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          No orders found.
        </Typography>
      )}

      {orderList.length > 0 && (
        <>
          <Typography variant="h4" align="center" sx={{ mt: 2, pb: 2 }}>
            Total Orders: {orderList.length}
          </Typography>

          {/* Desktop Table */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TableContainer
              component={Paper}
              sx={{ width: "100%", overflowX: "auto", maxHeight: "75vh" }}
            >
              <Table sx={{ minWidth: 900 }} aria-label="order table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Restaurant</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Customer</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Food Name</TableCell>
                    <TableCell align="right">Ingredients</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList.map((order) =>
                    order.orderItems.map((row, index) => (
                      <TableRow key={`${order.id}-${index}`}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.restaurantName}</TableCell>
                        <TableCell align="right">
                          <img
                            src={row.imageUrl || "https://via.placeholder.com/50"}
                            alt="food"
                            style={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell align="right">{order.customer?.fullName || "N/A"}</TableCell>
                        <TableCell align="right">{row.totalPrice || 0}</TableCell>
                        <TableCell align="right">{row.foodName || "N/A"}</TableCell>
                        <TableCell align="left">{row.ingredients?.join(", ") || "None"}</TableCell>
                        <TableCell align="right">{order.orderStatus}</TableCell>
                        <TableCell align="right">
                          <Button
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(e, order.id)}
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Mobile Card Layout */}
          <Box sx={{ display: { xs: "block", md: "none" }, maxHeight: "75vh", overflowY: "auto" }}>
            {orderList.map((order) =>
              order.orderItems.map((row, index) => (
                <Card
                  key={`${order.id}-${index}`}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px solid #444",
                    borderRadius: 2,
                    backgroundColor: "#111",
                    color: "white",
                  }}
                >
                  <Typography variant="subtitle2">
                    Order #{order.id} - {order.restaurantName}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <img
                      src={row.imageUrl || "/pizza.jpg"}
                      alt="food"
                      style={{ width: 60, height: 60, borderRadius: 8 }}
                    />
                    <Box>
                      <Typography>Customer: {order.customer?.fullName}</Typography>
                      <Typography>Food: {row.foodName}</Typography>
                      <Typography>Price: ₹{row.totalPrice}</Typography>
                      <Typography>
                        Ingredients: {row.ingredients?.join(", ") || "None"}
                      </Typography>
                      <Typography>Status: {order.orderStatus}</Typography>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={(e) => handleClick(e, order.id)}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))
            )}
          </Box>

          {/* Status Menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: { "aria-labelledby": "basic-button" },
            }}
          >
            {orderStatus.map((status) => (
              <MenuItem
                key={status.value}
                onClick={() => handleUpdateStatus(status.value)}
                selected={
                  orderList.find((o) => o.id === selectedOrderId)?.orderStatus === status.value
                }
              >
                {status.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default OrderTable;
