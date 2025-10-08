import {
  Box,
  Card,
  CardHeader,
  Fade,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateFoodCategory from "./CreateFoodCategory";
import { deleteCategory, fetchFoodCategory } from "../../src/component/service/FoodService";

const FoodCategoryTable = ({ resturant }) => {
  const [open, setOpen] = useState(false);
  const [foodCategories, setFoodCategories] = useState({});
  const [notification, setNotification] = useState(null);
  const jwt = localStorage.getItem("jwt");

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSm ? "90%" : isMd ? 400 : 500,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAllCategories = async () => {
    if (!resturant || resturant.length === 0) return;
    try {
      const results = {};
      for (const res of resturant) {
        const categories = await fetchFoodCategory(res.id, jwt);
        results[res.id] = { name: res.name, categories };
      }
      setFoodCategories(results);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, [resturant, jwt]);

  const handleDelete = async (categoryId, resturantId) => {
    try {
      await deleteCategory(categoryId, resturantId);
      setFoodCategories((prev) => {
        const updated = { ...prev };
        updated[resturantId].categories = updated[resturantId].categories.filter(
          (c) => c.id !== categoryId
        );
        return updated;
      });
      setNotification({ severity: "success", message: "Category deleted successfully!" });
    } catch (error) {
      console.error("Error deleting category:", error);
      setNotification({ severity: "error", message: "Failed to delete category" });
    }
  };

  return (
    <Box className="m-2 px-10 w-full">
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="add">
              <CreateIcon />
            </IconButton>
          }
          title={"Food Categories"}
        />
      </Card>

      {/* Responsive Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 600, overflowX: "auto" }}>
        <Table stickyHeader aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>Restaurant</TableCell>
              <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>Category Id</TableCell>
              <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>Category Name</TableCell>
              <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(foodCategories).map(([resId, data]) => (
              <React.Fragment key={resId}>
                <TableRow>
                  <TableCell
                    align="left"
                    colSpan={4}
                    sx={{
                      fontWeight: "bold",
                      color: "red",
                      fontSize: { xs: 14, sm: 16, md: 18 },
                    }}
                  >
                    {data.name}
                  </TableCell>
                </TableRow>

                {(data.categories || []).map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell></TableCell>
                    <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>{cat.id}</TableCell>
                    <TableCell sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>{cat.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(cat.id, resId)}
                        size={isSm ? "small" : "medium"}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Category Modal */}
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box sx={modalStyle}>
            <CreateFoodCategory
              onCategoryCreated={() => {
                fetchAllCategories();
                setNotification({ severity: "success", message: "Category created successfully!" });
                handleClose();
              }}
            />
          </Box>
        </Fade>
      </Modal>

      {/* Global Notification */}
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
    </Box>
  );
};

export default FoodCategoryTable;
