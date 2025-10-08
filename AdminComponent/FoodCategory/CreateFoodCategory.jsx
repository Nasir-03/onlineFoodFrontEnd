import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { getResturantByUserId } from "../../src/component/service/ResturantService";

const BASE_URL = "http://localhost:8080/api";

const CreateFoodCategory = ({ onCategoryCreated }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    resturantId: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const jwt = localStorage.getItem("jwt");

  // Fetch restaurants owned by logged in user
  useEffect(() => {
    if (!jwt) return;

    const fetchRestaurants = async () => {
      try {
        const response = await getResturantByUserId(jwt);
        setRestaurants(response);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };
    fetchRestaurants();
  }, [jwt]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryName || !formData.resturantId) {
      return;
    }

    try {
      const resturantId = Number(formData.resturantId);
      const payload = { name: formData.categoryName };

      await axios.post(`${BASE_URL}/admin/category/${resturantId}`, payload, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      setFormData({ categoryName: "", resturantId: "" });

      // notify parent table
      onCategoryCreated && onCategoryCreated();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl text-center mb-5">Create Food Category</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          fullWidth
          name="categoryName"
          label="Category Name"
          value={formData.categoryName}
          onChange={handleInputChange}
        />

        <FormControl fullWidth>
          <InputLabel id="resturant-label">Select Restaurant</InputLabel>
          <Select
            labelId="resturant-label"
            name="resturantId"
            value={formData.resturantId}
            onChange={handleInputChange}
          >
            {restaurants.map((rest) => (
              <MenuItem key={rest.id} value={rest.id}>
                {rest.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Create Category
        </Button>
      </form>
    </div>
  );
};

export default CreateFoodCategory;
