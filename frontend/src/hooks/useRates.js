import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { isOlderThan24Hours } from '../utils/dateFormatters';

export function useRates() {
  const [allRates, setAllRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchRates = async () => {
    try {
      setError(null);
      // Fetch existing rates from the backend
      const response = await axios.get('http://localhost:3000/api/rates');

      if (!response.data || response.data.length === 0) {
        setError('No rates available');
        return;
      }

      setAllRates(response.data); // Always display existing rates

      const latestRate = response.data[0];
      const timeGap = 1800000; // 30 minutes
      const isOld = new Date() - new Date(latestRate.updated_at) > timeGap;

      if (isOld) {
        setUpdating(true);
        try {
          const updateResponse = await axios.post(
            'http://localhost:3000/api/update-rates'
          );

          if (updateResponse.data.success) {
            const updatedResponse = await axios.get(
              'http://localhost:3000/api/rates'
            );
            setAllRates(updatedResponse.data);
          }
        } catch (updateError) {
          if (updateError.response?.status === 429) {
            setError('Rate limit reached. Please try again in a minute.');
          } else {
            setError('Failed to update rates. Using latest available data.');
          }
        } finally {
          setUpdating(false);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch rates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Retry logic with exponential backoff
  const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
  };

  const fetchWithRetry = async (url, options = {}, retries = 3) => {
    try {
      return await axios(url, options);
    } catch (error) {
      if (retries > 0 && error.code === 'ERR_CONNECTION_REFUSED') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { allRates, loading, error, updating };
}
