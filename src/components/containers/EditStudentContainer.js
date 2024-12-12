import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks"; // Adjust based on your project structure
import EditStudentView from "../views/EditStudentView"; // Import the EditStudentView component
//import { editStudent } from "../../store/actions/actionCreators";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null, // Current student data
      redirect: false, // Control for whether to redirect
      redirectId: null, // ID of the student to redirect to after updating
    };
  }

  // Fetch the student data when the component mounts
  componentDidMount() {
    const { studentId } = this.props.match.params; // Get studentId from URL
    this.props.fetchStudent(studentId); // Dispatch Redux thunk to fetch student data
  }

  // Update the state when student data is received from Redux
  componentDidUpdate(prevProps) {
    if (this.props.student !== prevProps.student) {
      this.setState({
        student: this.props.student,
      });
    }
  }

  // Handle form submission
  handleSubmit = async (updatedStudent) => {
    const { studentId } = this.props.match.params; // Get student ID from URL
    await this.props.editStudent(studentId, updatedStudent); // Dispatch Redux thunk to update student data

    // After successful update, redirect to the student details page
    this.setState({
      redirect: true,
      redirectId: studentId,
    });
  };

  render() {
    if (this.state.redirect) {
      // Redirect to the student details page after successful update
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Display loading message if student data is not yet loaded
    if (!this.state.student) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <EditStudentView
          student={this.state.student}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

// Map the Redux store's student state to component props
const mapStateToProps = (state) => ({
  student: state.student, // Assuming the Redux store contains a student object
});

// Map Redux dispatch actions to component props
const mapDispatchToProps = (dispatch) => ({
  fetchStudent: (studentId) => dispatch(fetchStudentThunk(studentId)),
  editStudent: (studentId, studentData) =>
    dispatch(editStudentThunk(studentId, studentData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentContainer);
