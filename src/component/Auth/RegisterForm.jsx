// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { registerService } from "../service/AuthService";

// const initailValue = {
//   fullName: "",
//   email: "",
//   password: "",
//   role: "ROLE_CUSTOMER",
// };

// // Yup validation schema
// const validationSchema = Yup.object({
//   fullName: Yup.string().required("Full name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string()
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
//       "Password must be 8–15 chars with uppercase, lowercase, digit & special char"
//     )
//     .required("Password is required"),
// });

// const RegisterForm = () => {

//   const [loading, setLoading] = React.useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (values, { setErrors }) => {
//     try {
//       setLoading(true);
//       const response = await registerService(values);
//       console.log("Registered successfully:", response.data);
//       // if (response.data.role === "ROLE_RESTURANT_OWNER"){
//       //    navigate("/admin/resturant");
//       // }else{
//         navigate("/account/login")
//       // }
//     } catch (err) {
//       if (err.response && err.response.status === 409) {
//         setErrors({ email: err.response.data.errorMessage });
//       } else {
//         console.error("Error in register", err);
//       }
//     }
//     finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h5" className="text-center">
//         Register
//       </Typography>

//       <Formik
//         onSubmit={handleSubmit}
//         initialValues={initailValue}
//         validationSchema={validationSchema}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <Field
//               as={TextField}
//               name="fullName"
//               label="Full Name"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               error={touched.fullName && Boolean(errors.fullName)}
//               helperText={touched.fullName && errors.fullName}
//             />

//             <Field
//               as={TextField}
//               name="email"
//               label="Email"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               error={touched.email && Boolean(errors.email)}
//               helperText={touched.email && errors.email}
//             />

//             <Field
//               as={TextField}
//               name="password"
//               label="Password"
//               type="password"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               error={touched.password && Boolean(errors.password)}
//               helperText={touched.password && errors.password}
//             />

//             <FormControl fullWidth margin="normal">
//               <InputLabel id="role-simple-select-label">Role</InputLabel>
//               <Field
//                 as={Select}
//                 labelId="role-simple-select-label"
//                 id="role-simple-select"
//                 name="role"
//               >
//                 <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
//                 <MenuItem value={"ROLE_RESTURANT_OWNER"}>
//                   Restaurant owner
//                 </MenuItem>
//               </Field>
//             </FormControl>

//             <Button
//               sx={{ mt: 2, padding: ".5rem" }}
//               fullWidth
//               variant="contained"
//               type="submit"
//               disabled={loading}
//             >
//               Register
//             </Button>
//           </Form>
//         )}
//       </Formik>

//       <Typography variant="body2" align="center" sx={{ mt: 5 }}>
//         Already have an account?
//         <Button size="small" onClick={() => navigate("/account/login")}>
//           Login
//         </Button>
//       </Typography>
//     </div>
//   );
// };

// export default RegisterForm;










import React, { useState } from "react";
import { sendOtpService, registerWithOtpService } from "../service/AuthService";
import { TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSendOtp = async (values) => {
    try {
      await sendOtpService(values.email);
      setEmail(values.email);
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      alert("Error sending OTP");
      console.error(err);
    }
  };

  const handleRegister = async (values) => {
    try {
      await registerWithOtpService(values, otp);
      alert("Registered successfully");
      navigate("/account/login");
    } catch (err) {
      alert("Invalid OTP or error in registration");
      console.error(err);
    }
  };

  return (
    <div>
      <Typography variant="h5">Register</Typography>

      <Formik
        initialValues={{ fullName: "", email: "", password: "", role: "ROLE_CUSTOMER" }}
        validationSchema={validationSchema}
        onSubmit={otpSent ? handleRegister : handleSendOtp}
      >
        {({ errors, touched }) => (
          <Form>
            <Field as={TextField} name="fullName" label="Full Name" fullWidth margin="normal" />
            <Field as={TextField} name="email" label="Email" fullWidth margin="normal" />
            <Field as={TextField} name="password" label="Password" type="password" fullWidth margin="normal" />

            {otpSent && (
              <TextField
                fullWidth
                label="Enter OTP"
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {otpSent ? "Verify & Register" : "Send OTP"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
