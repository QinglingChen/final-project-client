/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addStudentThunk } from '../../store/thunks'; // Import the addStudentThunk
import NewStudentView from '../views/NewStudentView'; // Import NewStudentView

class NewStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      gpa: '',
      imageUrl: '',
      campusId: '',
      errors: {},
      redirect: false,
      redirectId: null,
    };
  }

  // Handle form input changes
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Form validation
  validateForm = () => {
    const { firstname, lastname, email, gpa, imageUrl, campusId } = this.state;
    const errors = {};

    // Basic validation
    if (!firstname) errors.firstname = 'First name is required';
    if (!lastname) errors.lastname = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
    if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4) errors.gpa = 'GPA must be a number between 0 and 4';
    if (imageUrl && !/^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i.test(imageUrl)) errors.imageUrl = 'Invalid image URL';
    if (!campusId) errors.campusId = 'Campus ID is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;

    const { firstname, lastname, email, gpa, imageUrl, campusId } = this.state;
    const student = { firstname, lastname, email, gpa, imageUrl, campusId };

    const newStudent = await this.props.addStudent(student); // Dispatch the addStudent action

    // Redirect to the new student's page
    this.setState({ redirect: true, redirectId: newStudent.id });
  };

  render() {
    // Redirect to the new student's page after successful submission
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <NewStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          formData={this.state}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student)), // Dispatch the addStudentThunk
});

export default connect(null, mapDispatch)(NewStudentContainer);
