import { useState, useEffect } from 'react';
import axios from 'axios';

export function useRates() {
  const [allRates, setAllRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setError(null);
        const response = await axios.get('http://localhost:3000/api/rates');

        if (!response.data || response.data.length === 0) {
          setError('No rates available');
          return;
        }

        setAllRates(response.data);
      } catch (error) {
        console.error('Failed to fetch rates:', error);
        setError('Failed to fetch rates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // No interval needed since rates update only once per day
  }, []);

  return { allRates, loading, error };
}
