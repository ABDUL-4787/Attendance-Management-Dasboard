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

const SUBJECT_COLORS = [
  "rgba(75,192,192,0.6)",
  "rgba(255,159,64,0.6)",
  "rgba(153,102,255,0.6)",
  "rgba(255,99,132,0.6)",
  "rgba(54,162,235,0.6)",
];

const StudentChart = ({ student, subjects }) => {
  const { attendance = {} } = student || {};

  // Collect only dates that were marked for any subject
  const labels = useMemo(() => {
    const dateSet = new Set();
    subjects.forEach((subj) => {
      (attendance[subj] || []).forEach((d) => dateSet.add(d));
    });
    return Array.from(dateSet).sort();
  }, [attendance, subjects]);

  const datasets = useMemo(() => {
    return subjects.map((subj, idx) => {
      const subjDates = new Set(attendance[subj] || []);
      return {
        label: subj,
        data: labels.map((d) => (subjDates.has(d) ? 1 : 0)),
        backgroundColor: SUBJECT_COLORS[idx % SUBJECT_COLORS.length],
      };
    });
  }, [attendance, subjects, labels]);

  const data = useMemo(() => ({ labels, datasets }), [labels, datasets]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: `${student?.name || "Student"} attendance across subjects`,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y ? "Present" : "Absent"}`,
        },
      },
    },
    scales: {
      y: { min: 0, max: 1, ticks: { stepSize: 1, callback: (v) => (v ? "Present" : "Absent") } },
    },
  }), [student]);

  return (
    <div style={{ height: 360 }}>
      <Bar key={`${student?.usn}-${labels.join("|")}`} data={data} options={options} />
    </div>
  );
};

export default StudentChart;


