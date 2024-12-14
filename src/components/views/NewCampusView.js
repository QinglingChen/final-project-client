// /*==================================================
// NewCampusView.js

// The Views component is responsible for rendering web page with data provided by the corresponding Container component.
// It constructs a React component to display the new campus page.
// ================================================== */

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none',
  },
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
}));

const NewCampusView = (props) => {
  const { refreshCampuses } = props;  // Pass function to refresh campuses
  const classes = useStyles();

  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API request to create a new campus
    try {
      const response = await fetch('/api/campuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If successful, refresh campus list in the parent component
        refreshCampuses();
        setFormData({ name: '', address: '', description: '', imageUrl: '' });  // Reset form
      } else {
        console.error('Failed to create campus');
      }
    } catch (error) {
      console.error('Error creating campus:', error);
    }
  };

  // Render the New Campus form
  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontFamily: 'Courier, sans-serif',
              fontSize: '20px',
              color: '#11153e',
            }}
          >
            Add a Campus
          </Typography>
        </div>

        <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          {/* Name input */}
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          {/* Address input */}
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Address: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          {/* Description input */}
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* Image URL input */}
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* Submit button */}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default NewCampusView;
