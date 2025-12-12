import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SubjectChart = ({ students, selectedSubject, selectedDate }) => {
  const labels = useMemo(() => students.map((s) => s.name), [students]);
  const dataValues = useMemo(() => (
    students.map((s) => (s.attendance[selectedSubject]?.includes(selectedDate) ? 1 : 0))
  ), [students, selectedSubject, selectedDate]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Attendance",
        data: dataValues,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  }), [labels, dataValues]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${selectedSubject} Attendance on ${selectedDate}`,
      },
    },
    scales: {
      y: { min: 0, max: 1, ticks: { stepSize: 1, callback: (v) => (v ? "Present" : "Absent") } },
    },
  }), [selectedSubject, selectedDate]);

  return (
    <div style={{ height: 320 }}>
      <Bar key={`${selectedSubject}-${selectedDate}`} data={data} options={options} />
    </div>
  );
};

export default SubjectChart;
