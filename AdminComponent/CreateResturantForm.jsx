import { useFormik } from "formik";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import { uploadImageToCloudinary } from "./utill/UploadToCloudinary";
import { useDispatch } from "react-redux";
// import { createResturant } from "../src/component/state/ResturantSlice";
import { createResturant } from "../src/component/service/ResturantService";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  street: "",
  city: "",
  state: "",
  pinCode: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "mon-sun: 9:00 AM - 12:00 PM",
  images: [],
};

const CreateResturantForm = () => {

  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      // Prepare the data to be sent to the backend
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          pinCode: values.pinCode,
          // country:values.country
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      try {
        const response = await createResturant(data, jwt);
        console.log("Successfully added restaurant", response);
        // Optionally reset form or show a success message
        formik.resetForm();
        setNotification({
          severity: "success",
          message: "Restaurant created successfully!",
        });
      } catch (err) {
        console.error("Error occurred in create restaurant", err);
        setNotification({
          severity: "error",
          message: "Failed to create restaurant",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleRemoveImage = (index) => {
    const updateImage = [...formik.values.images];
    updateImage.splice(index, 1);
    formik.setFieldValue("images", updateImage);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const images = await uploadImageToCloudinary(file);
    console.log("images--- ", images);
    formik.setFieldValue("images", [...formik.values.images, images]);
    setUploadImage(false);
  };

  return (
    // <div className="py-10 px-20 flex items-center justify-center min-h-screen">
    <>
      {/* 🔔 Notification on TOP of screen */}
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

      <div className="w-full">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <label className="relative" htmlFor="fileInput">
                  <span
                    className="w-24 h-24 cursor-pointer flex items-center 
                   justify-center border rounded-md border-gray-600"
                  >
                    <AddPhotoAlternateIcon
                      className="text-white"
                      style={{ fontSize: "5rem" }}
                    />
                  </span>

                  {uploadImage && (
                    <div className="absolute -top-10 flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                {/* Uploaded previews */}
                <div className="flex gap-2">
                  {formik.values.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        style={{
                          width: "60px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                        className="block rounded"
                        src={image}
                        alt="preview"
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          outline: "none",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "0.75rem" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="street"
                name="street"
                label="Street "
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.street}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="state"
                name="state"
                label="State "
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="pinCode"
                name="pinCode"
                label="Pin Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.pinCode}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
          </Grid>
          <div className="mt-5">
            <Button color="primary" variant="contained" type="submit">
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Restaurant"}
            </Button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

export default CreateResturantForm;
