/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */

import React from 'react';
import { Link } from 'react-router-dom';

const StudentView = ({ student, deleteStudent }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{`${student.firstname || "Unknown"} ${student.lastname || "Unknown"}`}</h1>

      <img 
        src={student.imageUrl || 'default-student-image.jpg'} 
        alt={`${student.firstname} ${student.lastname}`}
        style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
      />
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GPA:</strong> {student.gpa ? student.gpa : "GPA not available"}</p>

      <h3><strong>Campus:</strong> 
        {student.campus ? (
          <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
        ) : (
          "No campus assigned"
        )}
      </h3>

      {/* Edit button */}
      <Link to={`/editstudent/${student.id}`}>
        <button>Edit Student</button>
      </Link>

      {/* Delete button */}
      <button onClick={() => deleteStudent(student.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
        Delete Student
      </button>

      <br /><br />
      <Link to="/">
        <button style={{ backgroundColor: 'lightblue', padding: '10px 20px' }}>
          Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default StudentView;
