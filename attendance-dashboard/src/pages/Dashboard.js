import React from "react";
import SubjectDropdown from "../components/SubjectDropdown";
import DateDropdown from "../components/DateSelector";
import AttendanceTable from "../components/AttendanceTable";

const Dashboard = ({
  subjects,
  dates,
  selectedSubject,
  setSelectedSubject,
  selectedDate,
  setSelectedDate,
  students,
  markAttendance,
}) => {
  return (
    <div>
      <h1 className="main-title">Attendance Analytics Dashboard</h1>
      <div className="dropdowns-container">
        <SubjectDropdown
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <DateDropdown dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="card-white">
        <AttendanceTable
          students={students}
          selectedSubject={selectedSubject}
          selectedDate={selectedDate}
          markAttendance={markAttendance}
        />
      </div>
    </div>
  );
};

export default Dashboard;


