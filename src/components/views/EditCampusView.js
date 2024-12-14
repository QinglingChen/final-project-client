/*==================================================
EditCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to edit campus information.
================================================== */
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"; // Import Link to navigate to homepage


// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: "500px",
    backgroundColor: "#f0f0f5",
    borderRadius: "5px",
    margin: "auto",
  },
  formTitle: {
    backgroundColor: "#c5c8d6",
    marginBottom: "15px",
    textAlign: "center",
    borderRadius: "5px 5px 0px 0px",
    padding: "3px",
  },
}));

const EditCampusView = ({ campus, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  // Pre-fill form data with existing campus information
  useEffect(() => {
    if (campus) {
      setFormData({
        name: campus.name || "",
        address: campus.address || "",
        description: campus.description || "",
        imageUrl: campus.imageUrl || "",
      });
    }
  }, [campus]);

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (
      formData.imageUrl &&
      !/^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i.test(formData.imageUrl)
    ) {
      newErrors.imageUrl =
        "Invalid URL. Must be a valid image link (e.g., .jpg, .png).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    handleSubmit(formData); // Call parent function to update campus
  };

  return (
    <div>
      <h1>Edit Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Courier, sans-serif",
                fontSize: "20px",
                color: "#11153e",
              }}
            >
              Edit Campus Information
            </Typography>
          </div>
          <form style={{ textAlign: "center" }} onSubmit={handleFormSubmit}>
            <label style={{ color: "#11153e", fontWeight: "bold" }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && (
              <p style={{ color: "red" }}>{errors.address}</p>
            )}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Image URL:
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && (
              <p style={{ color: "red" }}>{errors.imageUrl}</p>
            )}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
            <br />
            <br />
          </form>
            {/* Back to Home Button */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Back to Home
              </Button>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditCampusView;
