// EditCampusContainer.js

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import EditCampusView  from '../views/EditCampusView';

class EditCampusContainer extends Component {
  componentDidMount() {
    const campusId = this.props.match.params.id;
    if (campusId) {
        this.props.fetchCampus(campusId); // Fetch campus data using the id
      } else {
        console.error("Campus ID is missing or undefined");
      }
  }

  handleSubmit = (updatedCampus) => {
   // this.props.editCampus(updatedCampus);
    const campusId = this.props.match.params.id;
    if (campusId) {
        updatedCampus.id = campusId; // Ensure the campus ID is attached to the updated campus data
        this.props.editCampus(updatedCampus); // Dispatch edit campus action
      } else {
        console.error("Campus ID is missing or undefined");
      }
  };

  render() {
    return (
      <EditCampusView
        campus={this.props.campus}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapState = (state) => ({
  campus: state.campus,
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  editCampus: (campus) => dispatch(editCampusThunk(campus)),
});

export default connect(mapState, mapDispatch)(EditCampusContainer);
//export default EditCampusContainer;
