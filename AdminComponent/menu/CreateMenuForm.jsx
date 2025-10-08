import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import { uploadImageToCloudinary } from "../utill/UploadToCloudinary";
import { getResturantByUserId } from "../../src/component/service/ResturantService";
import {
  createFood,
  getAllCategories,
} from "../../src/component/service/FoodService";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: null,
  resturantId: "",
  vegeterian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

const CreateMenuForm = () => {
  const [uploading, setUploading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const [notification, setNotification] = useState(null);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          price: Number(values.price),
          images: values.images,
          ingredients: values.ingredients.map((ing) => ({ name: ing })),
        };

        console.log("Payload being sent:", payload);
        const response = await createFood(payload, jwt);
        console.log("Food created successfully:", response);

        setNotification({
          severity: "success",
          message: "Food created successfully!",
        });
        formik.resetForm();
      } catch (err) {
        console.error("Error creating food:", err);
        setNotification({
          severity: "error",
          message:
            err.message || "Failed to create food. Check console for details.",
        });
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!jwt) return;
      try {
        const [resList, catList] = await Promise.all([
          getResturantByUserId(jwt),
          getAllCategories(1, jwt),
        ]);
        setRestaurants(resList);
        setCategories(catList);
      } catch (error) {
        console.error("Error fetching restaurants/categories:", error);
      }
    };
    fetchData();
  }, [jwt]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, uploadedUrl]);
    setUploading(false);
  };

  useEffect(()=>{console.log("restaurant is: ",restaurants)},[restaurants])
  return (
    <>
      {/* 🔔 Notification Snackbar */}
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

      <div className="py-10 px-5 md:px-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl">
          <h1 className="font-bold text-2xl text-center py-4">
            Add New Menu
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {/* Image Upload Section */}
              <Grid item size={12}>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="fileInput">
                    <span className="w-24 h-24 cursor-pointer flex items-center justify-center border rounded-md border-gray-600">
                      <AddPhotoAlternateIcon
                        className="text-gray-500"
                        style={{ fontSize: "3rem" }}
                      />
                    </span>
                  </label>

                  {uploading && <CircularProgress size={24} />}

                  {formik.values.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        className="block rounded"
                        src={img}
                        alt={`preview-${index}`}
                      />
                      <IconButton
                        onClick={() =>
                          formik.setFieldValue(
                            "images",
                            formik.values.images.filter((_, i) => i !== index)
                          )
                        }
                        size="small"
                        sx={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "0.75rem" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </Grid>

              {/* Name */}
              <Grid item size={6} lg={6} className="md-mx:size={12}">
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Description */}
              <Grid item size={6} lg={6}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Price */}
              <Grid item size={6} lg={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Category */}
              <Grid item size={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={formik.values.category || ""}
                    onChange={(e) =>
                      formik.setFieldValue("category", e.target.value)
                    }
                    renderValue={(selected) =>
                      selected?.name ? selected.name : ""
                    }
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Ingredients */}
              <Grid item size={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="ingredients">Ingredients</InputLabel>
                  <Select
                    multiple
                    value={formik.values.ingredients}
                    onChange={(e) =>
                      formik.setFieldValue("ingredients", e.target.value)
                    }
                    input={<OutlinedInput label="Ingredients" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {["bread", "sauce", "cheese"].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Seasonal */}
              <Grid item size={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="seasonal-label">Seasonal</InputLabel>
                  <Select
                    labelId="seasonal-label"
                    value={formik.values.seasonal ? "true" : "false"}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "seasonal",
                        e.target.value === "true"
                      )
                    }
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Vegetarian */}
              <Grid item size={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="vegeterian-label">Vegetarian</InputLabel>
                  <Select
                    labelId="vegeterian-label"
                    value={formik.values.vegeterian ? "true" : "false"}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "vegeterian",
                        e.target.value === "true"
                      )
                    }
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Restaurant */}
              <Grid item size={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="restaurant-label">Select Restaurant</InputLabel>
                  <Select
                    labelId="restaurant-label"
                    name="resturantId"
                    value={formik.values.resturantId}
                    onChange={formik.handleChange}
                  >
                    {restaurants.map((rest) => (
                      <MenuItem key={rest.id} value={rest.id}>
                        {rest.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <div className="mt-10 flex justify-center">
              <Button color="primary" variant="contained" type="submit" >
                Create Food
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMenuForm;



