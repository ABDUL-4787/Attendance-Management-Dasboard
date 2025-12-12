import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Visuals from "./pages/Visuals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./auth";
import "./App.css";

const App = () => {
  const subjects = ["RM", "FSD", "AML", "NLP"];
  const dates = ["2025-09-25", "2025-09-26", "2025-09-27"];

  const [selectedSubject, setSelectedSubject] = useState(() => {
    const saved = localStorage.getItem("attendance_selectedSubject");
    return saved ? saved : subjects[0];
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("attendance_selectedDate");
    // Fallback to first configured date or today's date if not present
    if (saved) return saved;
    if (dates && dates.length > 0) return dates[0];
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [students, setStudents] = useState([
    { name: "Sai Krishna", usn: "1DS23AI046", attendance: { RM: [], FSD: [], AML: [], NLP: [] } },
    { name: "Nikhil", usn: "1DS23AI014", attendance: { RM: [], FSD: [], AML: [], NLP: [] } },
    { name: "Usman", usn: "1DS23AI062", attendance: { RM: [], FSD: [], AML: [], NLP: [] } },
    { name: "Qalim", usn: "1DS24AI404", attendance: { RM: [], FSD: [], AML: [], NLP: [] } },
  ]);

  const markAttendance = (usn, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.usn !== usn) return student;

        const currentSubjectDates = student.attendance[selectedSubject] || [];
        const updatedSubjectDates = [...currentSubjectDates];

        const existingIndex = updatedSubjectDates.indexOf(selectedDate);
        if (status === "Present") {
          if (existingIndex === -1) {
            updatedSubjectDates.push(selectedDate);
          }
        } else if (status === "Absent") {
          if (existingIndex !== -1) {
            updatedSubjectDates.splice(existingIndex, 1);
          }
        }

        return {
          ...student,
          attendance: {
            ...student.attendance,
            [selectedSubject]: updatedSubjectDates,
          },
        };
      })
    );
  };

  // Persist core states
  useEffect(() => {
    localStorage.setItem("attendance_selectedSubject", selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    localStorage.setItem("attendance_selectedDate", selectedDate);
  }, [selectedDate]);

  const authed = isAuthenticated();
  const location = useLocation();
  const hideNavOn = ["/login", "/signup"]; 
  const hideNav = hideNavOn.includes(location.pathname);

  return (
    <>
      {!hideNav && authed ? <TopHeader /> : null}
      {!hideNav && authed ? <NavBar /> : null}
      <div className="app-container">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard
                subjects={subjects}
                dates={dates}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                students={students}
                markAttendance={markAttendance}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visuals"
          element={
            <ProtectedRoute>
              <Visuals
                subjects={subjects}
                dates={dates}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                students={students}
              />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </>
  );
};

export default App;
