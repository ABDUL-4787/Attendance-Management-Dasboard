import React from "react";

const SubjectDropdown = ({ subjects, selectedSubject, setSelectedSubject }) => {
  return (
    <select
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
      className="dropdown"
    >
      {subjects.map((subj) => (
        <option key={subj} value={subj}>{subj}</option>
      ))}
    </select>
  );
};

export default SubjectDropdown;
