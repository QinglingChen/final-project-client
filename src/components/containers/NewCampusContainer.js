import React, { Component } from "react";
import { connect } from "react-redux";
import { addCampusThunk, fetchCampusThunk } from "../../store/thunks";
import Header from "./Header";
import NewCampusView from "../views/NewCampusView";

class NewCampusContainer extends Component {
  // handler for submitting a form
  handleSubmit = (campus) => {
    this.props.addCampus(campus); // invoking Redux Thunk to add campus
    this.props.refreshCampuses();  // Refresh the campuses list after adding
  };

  render() {
    return (
      <div>
        <Header />
        <NewCampusView handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

// Redux mapDispatch
const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
    refreshCampuses: () => dispatch(fetchCampusThunk())  // Adding the refresh functionality
  };
};

// Exported by default
export default connect(null, mapDispatch)(NewCampusContainer);
