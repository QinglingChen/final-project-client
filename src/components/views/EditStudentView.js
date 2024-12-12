import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

const EditStudentView = ({ student, handleSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    imageUrl: "",
    gpa: "",
    campusId: "",
  });
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  // Pre-fill form data with existing student information
  useEffect(() => {
    if (student) {
      setFormData({
        firstname: student.firstname || "",
        lastname: student.lastname || "",
        email: student.email || "",
        imageUrl: student.imageUrl || "",
        gpa: student.gpa || "",
        campusId: student.campusId || "",
      });
    }
  }, [student]);

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.gpa && (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4)) {
      newErrors.gpa = "GPA must be a number between 0 and 4.";
    }
    if (
      formData.imageUrl &&
      !/^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i.test(formData.imageUrl)
    ) {
      newErrors.imageUrl = "Invalid image URL. Must be a valid image link (e.g., .jpg, .png).";
    }
    if (!formData.campusId.trim()) newErrors.campusId = "Campus ID is required.";

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

    handleSubmit(formData); // Call parent function to update student information
  };

  return (
    <div>
      <h1>Edit Student</h1>

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
              Edit Student Information
            </Typography>
          </div>
          <form style={{ textAlign: "center" }} onSubmit={handleFormSubmit}>
            <label style={{ color: "#11153e", fontWeight: "bold" }}>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            {errors.firstname && <p style={{ color: "red" }}>{errors.firstname}</p>}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            {errors.lastname && <p style={{ color: "red" }}>{errors.lastname}</p>}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl}</p>}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>GPA:</label>
            <input
              type="text"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
            />
            {errors.gpa && <p style={{ color: "red" }}>{errors.gpa}</p>}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>Campus ID:</label>
            <input
              type="text"
              name="campusId"
              value={formData.campusId}
              onChange={handleChange}
              required
            />
            {errors.campusId && <p style={{ color: "red" }}>{errors.campusId}</p>}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentView;
