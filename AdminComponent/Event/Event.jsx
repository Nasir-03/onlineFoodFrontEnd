import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Event = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    // format only when submitting
    // const formattedData = {
    //   ...formValues,
    //   startedAt: formValues.startedAt
    //     ? dayjs(formValues.startedAt).format("MMMM DD, YYYY hh:mm A")
    //     : null,
    //   endsAt: formValues.endsAt
    //     ? dayjs(formValues.endsAt).format("MMMM DD, YYYY hh:mm A")
    //     : null,
    // };

    console.log("Submitted Event:", formValues);
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  return (
    <div className="p-5">
      <Button onClick={handleOpen} variant="contained" size="large">
        Create Event
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="image url"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DateTimePicker
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "startedAt")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiInputBase-input": {
                            color: "white", // text color
                          },
                          "& .MuiInputLabel-root": {
                            color: "white", // label color
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white", // border color
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                        },
                      },
                    }}
                  /> */}

                  <DateTimePicker
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "startedAt")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiInputBase-input": {
                            color: "white", // input text
                          },
                          "& .MuiInputLabel-root": {
                            color: "white", // label
                          },
                          "& .MuiSvgIcon-root": {
                            color: "white", // calendar/clock icons
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white", // border
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date and Time"
                    value={formValues.endsAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "endsAt")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            "& input": {
                              color: "white", // selected value text
                            },
                          },
                        },
                        sx: {
                          // Label
                          "& .MuiInputLabel-root": { color: "white" },
                          // Calendar & clock icons
                          "& .MuiSvgIcon-root": { color: "white" },
                          // Border
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            "&:hover fieldset": { borderColor: "white" },
                            "&.Mui-focused fieldset": { borderColor: "white" },
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button variant='contained' type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Event;
