// import {
//   Box,
//   Button,
//   Card,
//   Divider,
//   Grid,
//   Modal,
//   TextField,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import CartItem from "./CartItem";
// import AddressCart from "./AddressCart";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useSelector } from "react-redux";
// import { createOrderService } from "../service/OrderService";

// const arr = [1, 1];

// export const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   outline: "none",
//   boxShadow: 24,
//   p: 4,
// };

// const initialValues = {
//   streetAddress: "",
//   state: "",
//   pincode: "",
//   city: "",
//   items: "",
// };

// const validationSchema = Yup.object().shape({
//   streetAddress: Yup.string().required("Street Address is required"),
//   state: Yup.string().required("State is required"),
//   pincode: Yup.string().required("Pincode is required"),
//   city: Yup.string().required("City is required"),
// });

// const Cart = () => {

//   const [open, setOpen] = React.useState(false);
//   const handleClose = () => setOpen(false);
//   const cart = useSelector((state)=>state.cart)
//   const jwt = useSelector((state)=>state.jwt);

//    const total = cart.reduce((sum, item) => {
//     // prefer a stored totalPrice if available
//     const itemTotal = item.totalPrice != null 
//       ? item.totalPrice 
//       : item.food.price * (item.quantity || 1);
//     return sum + itemTotal;
//   }, 0);

//    useEffect(()=>{console.log("cart data from cart is: ",cart)},[cart])

// // const handleSubmit = async (values) => {
// //   try {
// //     if (cart.length === 0) {
// //       console.error("Cart is empty");
// //       return;
// //     }

// //     // resturantId from first item
// //     const resturantId = cart[0].resturantId;

// //     const payload = {
// //   resturantId,
// //   deliveryAddress: {
// //     street: values.streetAddress,   // ✅ backend expects 'street'
// //     state: values.state,
// //     city: values.city,
// //     pinCode: parseInt(values.pincode, 10), // ✅ backend expects 'pinCode'
// //   }
// // };


// //     const response = await createOrderService(payload, jwt);
// //     console.log("Order created:", response);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// // const handleSubmit = async (values) => {
// //   try {
// //     if (cart.length === 0) {
// //       console.error("Cart is empty");
// //       return;
// //     }

// //     // ✅ get resturantId from first item in cart
// //     // const resturantId = cart[0].resturantId;
// //     const resturantId = 12;

// //     // ✅ match backend fields exactly
// //     const payload = {
// //       resturantId,
// //       deliveryAddress: {
// //         street: values.streetAddress,              // backend expects "street"
// //         state: values.state,
// //         city: values.city,
// //         pinCode: parseInt(values.pincode, 10),     // backend expects "pinCode" (int)
// //       },
      
// //     };

// //     console.log("Final Payload:", payload); // debug

// //     const response = await createOrderService(payload, jwt);
// //     console.log("Order created:", response);
// //   } catch (err) {
// //     console.error("Order creation failed:", err);
// //   }
// // };

// const handleSubmit = async (values) => {
//   try {
//     if (cart.length === 0) {
//       console.error("Cart is empty");
//       return;
//     }

//     const resturantId = cart[0].resturantId || 12; // fallback for now

//     // build items array
//     const items = cart.map((item) => ({
//       foodId: item.food.id,                            // reference to food
//       foodName: item.food.name,                        // save name
//       quantity: item.quantity,
//       totalPrice: item.totalPrice || item.food.price * item.quantity,
//       ingredients: item.ingredients || [],             // already chosen in cart
//       image: item.food.images?.[0] || null,            // ✅ save first image
//     }));

//     const payload = {
//       resturantId,
//       deliveryAddress: {
//         street: values.streetAddress,
//         state: values.state,
//         city: values.city,
//         pinCode: parseInt(values.pincode, 10),
//       },
//       items,                                           // ✅ send items here
//     };

//     console.log("Final Payload:", payload);

//     const response = await createOrderService(payload, jwt);
//     console.log("Order created:", response);
//   } catch (err) {
//     console.error("Order creation failed:", err);
//   }
// };


//   const createOrderUsingSelectAddress = () => {};

//   const handleOpenAddressModal = () => setOpen(true);
//    const [value,setValue] = useState(0);

//   return (

//     <div>
//       <main className="flex justify-between">
//         {/* Left side */}
//         <section className="w-[30%] md-mx:w-[40%] space-y-6 min-h-screen pt-10">
//           {arr.map((item, index) => (
//             <CartItem key={index} />
//           ))}
//           <Divider />

//           <div className="billDetails px-5 text-sm pb-5">
//             <p className="font-extralight py-5">Bill Details</p>
//             <div className="space-y-3">
//               <div className="flex justify-between text-gray-400">
//                 <p>Item Total</p>
//                 <p>{total}</p>
//               </div>
//               <div className="flex justify-between text-gray-400">
//                 <p>Delivery Fee</p>
//                 <p>$21</p>
//               </div>
//               <div className="flex justify-between text-gray-400">
//                 <p>GST and Restaurant charges</p>
//                 <p>$10</p>
//               </div>
//               <Divider />
//             </div>
//             <div className="flex justify-between text-gray-400 pt-5">
//               <p>Total pay</p>
//               <p>{total + 21 + 10}</p>
//             </div>
//           </div>
//         </section>

//         <Divider orientation="vertical" variant="middle" flexItem />

//         {/* Right side */}
//         <section className="w-[70%] md-mx:w-[60%] flex justify-center px-5 pb-10">
//           <div>
//             <h1 className="text-center font-semibold text-2xl md-mx:text-xl py-10">
//               Choose Delivery Address
//             </h1>
//             <div className="flex gap-5 flex-wrap justify-center pb-5">
//               {[1, 1, 1, 1, 1, 1].map((item, index) => (
//                 <AddressCart
//                   key={index}
//                   item={item}
//                   showButton={true}
//                   handleSelectAddress={createOrderUsingSelectAddress}
//                 />
//               ))}
//             </div>

//             <Card className="flex gap-5 w-64 p-5">
//               <LocationOnIcon />
//               <div className="space-y-3 text-gray-400">
//                 <h1 className="font-semibold text-lg text-white">
//                   Add new Address
//                 </h1>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={handleOpenAddressModal}
//                 >
//                   Add
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         </section>
//       </main>

//       {/* Modal */}
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ errors, touched }) => (
//               <Form>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Field
//                       as={TextField}
//                       name="streetAddress"
//                       label="Street Address"
//                       fullWidth
//                       error={touched.streetAddress && Boolean(errors.streetAddress)}
//                       helperText={<ErrorMessage name="streetAddress" />}
//                     />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Field
//                       as={TextField}
//                       name="state"
//                       label="State"
//                       fullWidth
//                       error={touched.state && Boolean(errors.state)}
//                       helperText={<ErrorMessage name="state" />}
//                     />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Field
//                       as={TextField}
//                       name="city"
//                       label="City"
//                       fullWidth
//                       error={touched.city && Boolean(errors.city)}
//                       helperText={<ErrorMessage name="city" />}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Field
//                       as={TextField}
//                       name="pincode"
//                       label="Pincode"
//                       fullWidth
//                       error={touched.pincode && Boolean(errors.pincode)}
//                       helperText={<ErrorMessage name="pincode" />}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button type="submit" variant="contained" fullWidth>
//                         Deliver Address
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Form>
//             )}
//           </Formik>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default Cart;




import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import AddressCart from "./AddressCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createOrderService } from "../service/OrderService";

const arr = [1, 1];

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",              // responsive modal
  maxWidth: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required"),
});

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const cart = useSelector((state) => state.cart);
  const jwt = useSelector((state) => state.jwt);

  const total = cart.reduce((sum, item) => {
    const itemTotal =
      item.totalPrice != null
        ? item.totalPrice
        : item.food.price * (item.quantity || 1);
    return sum + itemTotal;
  }, 0);

  useEffect(() => {
    console.log("cart data from cart is: ", cart);
  }, [cart]);

  const handleSubmit = async (values) => {
    try {
      if (cart.length === 0) {
        console.error("Cart is empty");
        return;
      }

      const resturantId = cart[0].resturant.id;

      const items = cart.map((item) => ({
        foodId: item.food.id,
        foodName: item.food.name,
        quantity: item.quantity,
        totalPrice:
          item.totalPrice || item.food.price * item.quantity,
        ingredients: item.ingredients || [],
        image: item.food.images?.[0] || null,
      }));

      const payload = {
        resturantId,
        deliveryAddress: {
          street: values.streetAddress,
          state: values.state,
          city: values.city,
          pinCode: parseInt(values.pincode, 10),
        },
        items,
      };

      console.log("Final Payload:", payload);

      const response = await createOrderService(payload, jwt);
      console.log("Order created:", response);
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  const createOrderUsingSelectAddress = () => {};
  const handleOpenAddressModal = () => setOpen(true);

  return (
    <div className="w-full min-h-screen">
      <main className="flex flex-col lg:flex-row justify-between">
        {/* Left side - Cart Items */}
        <section className="w-full lg:w-[35%] space-y-6 pt-10 border-r border-gray-700">
          {arr.map((item, index) => (
            <CartItem key={index} />
          ))}
          <Divider />

          {/* Bill Details */}
          <div className="billDetails px-5 text-sm pb-5">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>{total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>$21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant charges</p>
                <p>$10</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400 pt-5 font-semibold">
              <p>Total Pay</p>
              <p>{total + 21 + 10}</p>
            </div>
          </div>
        </section>

        {/* Right side - Address */}
        <section className="w-full lg:w-[65%] flex justify-center px-3 md:px-5 pb-10">
          <div className="w-full">
            <h1 className="text-center font-semibold text-2xl md:text-xl py-6">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center pb-5">
              {[1, 1, 1, 1, 1, 1].map((item, index) => (
                <AddressCart
                  key={index}
                  item={item}
                  showButton={true}
                  handleSelectAddress={createOrderUsingSelectAddress}
                />
              ))}
            </div>

            {/* Add new Address */}
            <Card className="flex gap-5 w-full sm:w-72 p-5 mx-auto">
              <LocationOnIcon />
              <div className="space-y-3 text-gray-400">
                <h1 className="font-semibold text-lg text-white">
                  Add new Address
                </h1>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleOpenAddressModal}
                >
                  Add
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      error={
                        touched.streetAddress &&
                        Boolean(errors.streetAddress)
                      }
                      helperText={<ErrorMessage name="streetAddress" />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      error={
                        touched.state && Boolean(errors.state)
                      }
                      helperText={<ErrorMessage name="state" />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      error={
                        touched.city && Boolean(errors.city)
                      }
                      helperText={<ErrorMessage name="city" />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      error={
                        touched.pincode && Boolean(errors.pincode)
                      }
                      helperText={<ErrorMessage name="pincode" />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Deliver Address
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
