import { useState, useEffect } from 'react';
import { useRatesContext } from '../../context/RatesContext';
import CurrencySelector from '../currency/CurrencySelector';
import { has24HoursPassed } from '../../utils/dateFormatters';
import Pagination from './Pagination';
import RateRow from './RateRow';

function TableSection() {
  const {
    allRates,
    selectedCurrency,
    loading,
    error,
    updateRates
  } = useRatesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAscending, setSortAscending] = useState(false); // false = newest first (default)
  const itemsPerPage = 10;

  //All hooks must be at the top
  useEffect(() => {
    if (currentPage > Math.ceil((allRates?.length || 0) / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [allRates, currentPage, itemsPerPage]);

  // Filter and sort rates
  const filteredRates = allRates
    ? allRates
        .filter(
          (rate) =>
            rate.base_currency === 'EUR' &&
            rate.target_currency === selectedCurrency
        )
        .sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);
          return sortAscending ? dateA - dateB : dateB - dateA;
        })
    : [];

  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  const currentRates = filteredRates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  useEffect(() => {
    let isMounted = true; // Prevent state updates if unmounted
  
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/api/rates`);

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (isMounted && data.length > 0) {
          const lastUpdated = data[0].updated_at;
          if (!lastUpdated || has24HoursPassed(lastUpdated)) {
            updateRates(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch rates:', error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes interval check to fetch
  
    return () => {
      isMounted = false; // Prevent state update on unmount
      clearInterval(interval); // Cleanup
    };
  }, [updateRates]);

  if (loading) {
    return <div>Loading exchange rates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      {/* Currency Selector */}
      <CurrencySelector />

      {/* Top Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Table */}
      <table className="exchange-table">
        <thead>
          <tr>
            <th>
              Date{' '}
              <button className="sort-button" onClick={handleSortToggle}>
                {sortAscending ? '⬇' : '⬆'}
              </button>
            </th>
            <th>EUR to {selectedCurrency}</th>
          </tr>
        </thead>
        <tbody>
          {currentRates.map((rate) => (
            <RateRow
              key={rate.id}
              rate={rate}
              updateNumber={
                filteredRates.length -
                ((currentPage - 1) * itemsPerPage + filteredRates.indexOf(rate))
              }
            />
          ))}
        </tbody>
      </table>

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}

export default TableSection;
