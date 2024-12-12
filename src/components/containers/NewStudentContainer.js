/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null, 
      redirect: false, 
      redirectId: null,
      //new add
      email:'',
      gpa:'',
      imageUrl: '',
      errors:{},
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Validate form before submission
  validateForm = () => 
  {
    const { firstname, lastname, email, gpa, imageUrl, campusId } = this.state;
    const errors = {};

    // Simple validation for required fields and email format
    if (!firstname) errors.firstname = 'First name is required';
    if (!lastname) errors.lastname = 'Last name is required';
    if (!email) {
      errors.email = 'Email is required';
    } 
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4) {
      errors.gpa = 'GPA must be a number between 0 and 4';
    }
    if (imageUrl && !/^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i.test(imageUrl)) {
      errors.imageUrl = 'Invalid image URL format';
    }
    if (!campusId) errors.campusId = 'Campus ID is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };


  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if (!this.validateForm()) return;

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,

        email: this.state.email,
        gpa:this.state.gpa,
        imageUrl: this.state.imageUrl,
        errors:this.state.errors,

    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      redirect: true, 
      redirectId: newStudent.id,

      email: '',
      gpa:'',
      imageUrl: '',
      errors:{},
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}  
          formData={this.state}
          errors={this.state.errors}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);