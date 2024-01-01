import React, { useState } from "react";
import app from "../firebase";
import { useForm, Controller } from "react-hook-form";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  TextField,
  Button,
  FormControlLabel,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useAuthToken } from "../context/AuthTokenContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const CreateAd = () => {
  const [imageURL, setImageURL] = useState("");
  const Navigate = useNavigate();
  const { accessToken } = useAuthToken();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const storage = getStorage(app);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setImageURL(downloadURL);
  };

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        images: imageURL,
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error("Error creating ad.");
      }
      toast.success("Ad successfully created!");
      setTimeout(() => Navigate("/"), 4000);
    } catch (err) {
      toast.error("Failed to create the Ad.");
    }
  };

  return (
    <>
      <Box sx={{ padding: 3, width: "100%", maxWidth: "800px", mx: "auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{ backgroundColor: "#eeeeee", padding: 2, borderRadius: "4px" }}
          >
            <Typography variant="h6" gutterBottom>
              Details
              <Typography
                variant="caption"
                color="primary"
                sx={{ marginLeft: 1 }}
              >
                *MANDATORY
              </Typography>
            </Typography>
          </Box>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    {...field}
                    labelId="category-label"
                    id="category-select"
                    label="Category"
                  >
                    <MenuItem value="Appliances">Appliances</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                    <MenuItem value="Fashion">Fashion</MenuItem>
                    <MenuItem value="Electronics">
                      Computer & Electronics
                    </MenuItem>
                    <MenuItem value="Furniture">Furniture</MenuItem>
                    <MenuItem value="SportingGoods">Sporting Goods</MenuItem>
                    <MenuItem value="Games">Toys & Games</MenuItem>
                    <MenuItem value="PetSupplies">Pet Supplies</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />

            <Controller
              name="condition"
              control={control}
              defaultValue=""
              rules={{ required: "Condition is required" }}
              render={({ field }) => (
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">Condition</FormLabel>
                  <RadioGroup {...field} row aria-label="condition">
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="New"
                    />
                    <FormControlLabel
                      value="likeNew"
                      control={<Radio />}
                      label="Like New"
                    />
                    <FormControlLabel
                      value="veryGood"
                      control={<Radio />}
                      label="Very Good"
                    />
                    <FormControlLabel
                      value="good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel
                      value="acceptable"
                      control={<Radio />}
                      label="Acceptable"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    {...field}
                    labelId="location-label"
                    id="location-select"
                    label="Location"
                  >
                    <MenuItem value="Vancouver">Vancouver</MenuItem>
                    <MenuItem value="Burnaby">Burnaby</MenuItem>
                    <MenuItem value="Coquitlam">Coquitlam</MenuItem>
                    <MenuItem value="North Vancouver">North Vancouver</MenuItem>
                    <MenuItem value="Richmond">Richmond</MenuItem>
                    <MenuItem value="West Vancouver">West Vancouver</MenuItem>
                    <MenuItem value="Surrey">Surrey</MenuItem>
                    <MenuItem value="White Rock">White Rock</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Paper>

          <Box
            sx={{
              backgroundColor: "#eeeeee",
              padding: 2,
              borderRadius: "4px",
              marginTop: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Photos
              <Typography variant="caption" sx={{ marginLeft: 1 }}>
                OPTIONAL
              </Typography>
            </Typography>
          </Box>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Box
              sx={{
                border: "1px dashed grey",
                padding: 2,
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "150px",
                backgroundColor: "#fafafa",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="icon-button-file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
          </Paper>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default CreateAd;
