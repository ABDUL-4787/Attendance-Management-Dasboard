import { useEffect, useState } from "react";

export const useAttendanceData = ({ date, subject }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Placeholder local fetch; replace with real API if available
        const response = await Promise.resolve({ json: async () => [] });
        const json = await response.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (date && subject) fetchData();
    return () => {
      cancelled = true;
    };
  }, [date, subject]);

  return { data, loading, error };
};


