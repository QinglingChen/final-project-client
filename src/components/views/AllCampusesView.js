/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {

  //handle campus deletion
  const handleDelete = (id) => {
    fetch(`/api/campuses/${id}`, {  
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          props.refreshCampuses(); // refresh
        } else {
          console.error("Failed to delete campus.");
        }
      })
      .catch((error) => {
        console.error("Error deleting campus:", error);
      });
  };

  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
    <div>
      <p>There are no campuses.</p>
      {/* add action button*/}
      <Link to={`newcampus`}>
        <button>Add New Campus</button>
      </Link>
      
    </div>
    );
  }


  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>Campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          {/*Delete button */}
          <button onClick={() => handleDelete(campus.id)}>Delete Campus</button>
          {/* Edit button */}
          <Link to={`/editcampus/${campus.id}`}>
            <button>Edit Campus</button>
          </Link>
          <hr/>
        </div>
      ))}
      <br/>
      {/* Add New Campus button */}
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  refreshCampuses: PropTypes.func.isRequired, // Function to refresh campus list
};

export default AllCampusesView;