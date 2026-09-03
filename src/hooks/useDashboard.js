import { useState, useEffect } from 'react';
import { dashboardData } from '../data/dashboardData';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setData(dashboardData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};
