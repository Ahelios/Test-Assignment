import { useState, useEffect } from 'react';
import { useRatesContext } from '../../context/RatesContext';
import { filterRatesByCurrency, paginateData } from '../../utils/calculations';
import CurrencySelector from '../currency/CurrencySelector';
import Pagination from './Pagination';
import RateRow from './RateRow';

function TableSection() {
  const { allRates, selectedCurrency, loading, updating, error, requestInfo } =
    useRatesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Move all hooks to the top level, before any conditional logic
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
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    : [];

  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  const currentRates = filteredRates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="p-4">Loading exchange rates...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <section className="p-4">
      <div className="mb-4">
        <CurrencySelector />
        {updating && <div className="text-blue-600">Updating rates...</div>}
        {requestInfo && (
          <div className="text-sm text-gray-600 mt-2">
            <p>API Requests Made: {requestInfo.requestCount}</p>
            <p>Remaining Requests: {requestInfo.remainingRequests}</p>
          </div>
        )}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">EUR to {selectedCurrency}</th>
            </tr>
          </thead>
          <tbody>
            {currentRates.map((rate) => (
              <RateRow
                key={rate.id}
                rate={rate}
                updateNumber={
                  filteredRates.length -
                  ((currentPage - 1) * itemsPerPage +
                    filteredRates.indexOf(rate))
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}

export default TableSection;
