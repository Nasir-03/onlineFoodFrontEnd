import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../service/AuthService";

const initailValue = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

// Yup validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
      "Password must be 8–15 chars with uppercase, lowercase, digit & special char"
    )
    .required("Password is required"),
});

const RegisterForm = () => {

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      setLoading(true);
      const response = await registerService(values);
      console.log("Registered successfully:", response.data);
      // if (response.data.role === "ROLE_RESTURANT_OWNER"){
      //    navigate("/admin/resturant");
      // }else{
        navigate("/account/login")
      // }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ email: err.response.data.errorMessage });
      } else {
        console.error("Error in register", err);
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initailValue}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="fullName"
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="role-simple-select-label">Role</InputLabel>
              <Field
                as={Select}
                labelId="role-simple-select-label"
                id="role-simple-select"
                name="role"
              >
                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                <MenuItem value={"ROLE_RESTURANT_OWNER"}>
                  Restaurant owner
                </MenuItem>
              </Field>
            </FormControl>

            <Button
              sx={{ mt: 2, padding: ".5rem" }}
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 5 }}>
        Already have an account?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
