import React from "react";

const AttendanceTable = ({ students, selectedSubject, selectedDate, markAttendance }) => {
  return (
    <table className="attendance-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>USN</th>
          <th>Mark Present</th>
          <th>Mark Absent</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {
          const isPresent = student.attendance[selectedSubject]?.includes(selectedDate);
          return (
            <tr key={student.usn}>
              <td>{student.name}</td>
              <td>{student.usn}</td>
              <td>
                <button
                  className={`btn present ${isPresent ? "active" : ""}`}
                  onClick={() => markAttendance(student.usn, "Present")}
                >
                  Present
                </button>
              </td>
              <td>
                <button
                  className={`btn absent ${!isPresent ? "active" : ""}`}
                  onClick={() => markAttendance(student.usn, "Absent")}
                >
                  Absent
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
