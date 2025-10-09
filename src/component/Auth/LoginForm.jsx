import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../service/AuthService'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { addJwt } from '../state/JwtSlice'
import { addUser } from '../state/UserSlice'
import useFindUser from '../service/UserService'
import Notifications from '../../../AdminComponent/Notification/Notifications'

const initailValue = {
  email:"",
  password:""
}

const LoginForm = () => {

  const [loading, setLoading] = useState(false);
  const [notification,setNotification] = useState();

  const dispatch = useDispatch();

  const jwt = useSelector((state)=>state.jwt);


const handleSubmit = async (values) => {
  setLoading(true);
  setNotification("")

  try {
    const response = await loginService(values);
    const jwt = response.data.jwt;
    setNotification({
      severity:"success",
      message:"Login Successfully"
    })

    dispatch(addJwt(jwt));
    const decoded = jwtDecode(jwt);

    const user = {
      id: decoded.id,
      fullName: decoded.fullName,
      role: decoded.role,
      email: decoded.email,
    };
    dispatch(addUser(user));
    navigate("/");
  } catch (err) {
  console.error("Login error:", err);

  let errorMessage = "Login failed. Please try again.";

  if (err.response && err.response.data) {
    // Backend sends { message: "Invalid email" } or { message: "Invalid password" }
    if (err.response.data.message) {
      errorMessage = err.response.data.message;
    } 
    // Or if backend sends validation errors
    else if (typeof err.response.data === "object") {
      errorMessage = Object.values(err.response.data).join(", ");
    }
  }

  setNotification({
    severity: "error",
    message: errorMessage,
  });
} finally {
    setLoading(false);
    console.log("notification data is ",notification.severity, notification.message)
  }
};


//   const handleSubmit = async (values) => {
//     setLoading(true);
//   try {
//     const response = await loginService(values);
//     const jwt = response.data.jwt;

//      dispatch(addJwt(jwt))
//     const decoded = jwtDecode(jwt)
//     console.log(decoded)
  
//       const user = {
//       id: decoded.id,
//       fullName: decoded.fullName,
//       role: decoded.role,
//       email: decoded.email,
//     };

//     // save to localStorage
//     dispatch(addUser(user));

//     navigate("/"); 
//   } catch (err) {
//     console.error("Login error:", err);
//   }
//   finally {
//     setLoading(false);
//   }
// };

  const navigate = useNavigate();

  const findUser = useFindUser();

  useEffect(() => {
  findUser().then(user => console.log("user is: ",user));
}, [jwt]);

  return (
    
    <div>

      {notification && (
  <div style={{ marginTop: "1rem" }}>
    <Notifications severity={notification.severity} message={notification.message} />
  </div>
)}

       <Typography variant='h5' className='text-center'>
        Login
       </Typography>

       <Formik onSubmit={handleSubmit} initialValues={initailValue}>
           <Form>
             <Field 
             as={TextField}
             name="email"
             label="email"
             fullWidth
             variant="outlined"
             margin="normal"
             />

              <Field 
             as={TextField}
             name="password"
             label="password"
             fullWidth
             variant="outlined"
             />
             <Button sx={{mt:2,padding:".5rem"}} fullWidth variant='contained' type='submit'
             disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
           </Button>
           </Form>
       </Formik>

       <Typography variant='body2' align='center' sx={{mt:5}}>
        Don't have an account?
        <Button size='small' onClick={()=>navigate("/account/register")}>
           register
        </Button>
       </Typography>
    </div>
  )
}

export default LoginForm
