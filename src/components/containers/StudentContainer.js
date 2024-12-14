/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudentThunk, deleteStudentThunk } from "../../store/thunks";
import { fetchStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";
//import { Redirect } from 'react-router-dom';

class StudentContainer extends Component {
  componentDidMount() {
      this.props.fetchStudent(this.props.match.params); // Fetch the student details from the API
  }

  // handleDelete = (studentId) => {
  //   this.props.deleteStudent(studentId); // Dispatch the delete action
  // };

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    return (
      <div>
        <StudentView 
          student={this.props.student} // Pass student data to the StudentView
          addStudentToCampus={this.props.addStudent} // tranfer add student function
          deleteStudentFromCampus={this.props.deleteStudent}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return{
  student: state.student,  // Get the State object from Reducer "student"
}};

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  addStudent: (student) => dispatch(addStudentThunk(student)), // binding add student function
  deleteStudent: (id) => dispatch(deleteStudentThunk(id)), // Dispatch delete student thunk
});

export default connect(mapState, mapDispatch)(StudentContainer);
