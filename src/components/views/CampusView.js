/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, addStudentToCampus, removeStudentFromCampus } = props;

  const handleAddStudent = () => {
    if (addStudentToCampus) {
      console.log("Add student to campus with ID:", campus.id);
    }
  };

  const handleRemoveStudent = (studentId) => {
    if (removeStudentFromCampus) {
      removeStudentFromCampus(campus.id, studentId);
    }
  };

  const handleDeleteCampus = () => {
    if (deleteCampus) {
      deleteCampus(campus.id);
    }
  };
  
  // Render a single Campus view with list of its students
  return (
    <div>
      {/* see details about a single campus, with all data fields, including enrolled students (if any)*/}
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {/*see an informative message if no students are enrolled at that campus */}
      <h2>Enrolled Students:</h2>
      {campus.students.length === 0 ? (
        <p>No students are enrolled at this campus.</p>
        ) : (
        /*navigate to the Single Student View and see any student's information */
      campus.students.map((student)=> {
        const name = `${student.firstname} ${student.lastname}`;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h3>{name}</h3>
            </Link>  
            {/* Remove student button */}
            <button onClick={() => handleRemoveStudent(student.id)}>Remove Student</button>
                      
          </div>
          /*
          add new/existing students to the campus (e.g., via link/button)
          delete students from the campus (e.g., via link/button)
          navigate to the Edit Campus View and edit the campus information
          delete the campus (e.g., via link/button and optionally, this can be part of the All Campuses
          */
        );
      })
    )}
    {/* Add New/Existing Student */}
    <button onClick={handleAddStudent} style={{ marginTop: "20px" }}>Add Student</button>

    {/* Edit Campus Button */}
    <div style={{ marginTop: "20px" }}>
      <Link to={`/editcampus/${campus.id}`} style={{ marginRight: "10px" }}>
        <button>Edit Campus</button>
      </Link>
      {/* Delete campus button */}
      <button onClick={handleDeleteCampus}>Delete Campus</button>
    </div>
    </div>
  );
};

export default CampusView;