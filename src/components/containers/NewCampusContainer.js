import React, { Component } from "react";
import { connect } from "react-redux";
import { addCampusThunk } from "../../store/thunks";
import Header from "./Header";
import NewCampusView from "../views/NewCampusView";

class NewCampusContainer extends Component {
  // handler for submitting a form
  handleSubmit = (campus) => {
    this.props.addCampus(campus); // invoking Redux Thunk to add campus
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
  };
};

// Exported by default
export default connect(null, mapDispatch)(NewCampusContainer);
