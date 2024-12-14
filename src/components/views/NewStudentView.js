/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
}));

const NewStudentView = ({ handleChange, handleSubmit, formData, errors }) => {
  const classes = useStyles();

  return (
    <div>
      <h1>New Student</h1>
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{ fontWeight: 'bold', fontSize: '20px', color: '#11153e' }}>
            Add a Student
          </Typography>
        </div>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <label>First Name: </label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
          {errors.firstname && <div>{errors.firstname}</div>}
          <br />
          <br />

          <label>Last Name: </label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
          {errors.lastname && <div>{errors.lastname}</div>}
          <br />
          <br />

          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div>{errors.email}</div>}
          <br />
          <br />

          <label>Image URL: </label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          {errors.imageUrl && <div>{errors.imageUrl}</div>}
          <br />
          <br />

          <label>GPA: </label>
          <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} />
          {errors.gpa && <div>{errors.gpa}</div>}
          <br />
          <br />

          <label>Campus ID: </label>
          <input type="text" name="campusId" value={formData.campusId} onChange={handleChange} />
          {errors.campusId && <div>{errors.campusId}</div>}
          <br />
          <br />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewStudentView;
