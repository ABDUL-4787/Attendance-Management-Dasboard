import React, { useMemo, useState } from "react";
import StudentChart from "../components/StudentChart";

const Visuals = ({ subjects, students }) => {
  const [selectedUsn, setSelectedUsn] = useState(() => students?.[0]?.usn || "");
  const selectedStudent = useMemo(() => students.find((s) => s.usn === selectedUsn) || students[0], [students, selectedUsn]);

  return (
    <div>
      <h1 className="main-title">Visual Representation</h1>
      <div className="dropdowns-container">
        <select
          value={selectedUsn}
          onChange={(e) => setSelectedUsn(e.target.value)}
          className="dropdown"
        >
          {students.map((s) => (
            <option key={s.usn} value={s.usn}>{s.name} ({s.usn})</option>
          ))}
        </select>
      </div>

      <StudentChart student={selectedStudent} subjects={subjects} />
    </div>
  );
};

export default Visuals;


