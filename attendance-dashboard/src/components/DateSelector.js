import React from "react";

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  // handleChange ensures we have a function to call
  const handleChange = (e) => setSelectedDate(e.target.value);

  return (
    <div style={{ margin: "20px 0" }}>
      <label>
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate || ""}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default DateSelector;
