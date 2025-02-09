export const calculateStats = (rates) => {
  if (!rates || !rates.length) {
    return { min: 0, max: 0, avg: 0 };
  }

  const exchangeRates = rates
    .map((rate) => {
      const converted = Number(rate.exchange_rate);
      return converted;
    })
    .filter((rate) => !isNaN(rate));

  if (exchangeRates.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  const min = Math.min(...exchangeRates);
  const max = Math.max(...exchangeRates);
  const avg = exchangeRates.reduce((a, b) => a + b, 0) / exchangeRates.length;

  return {
    min: min.toFixed(4),
    max: max.toFixed(4),
    avg: avg.toFixed(4)
  };
};

export const filterRatesByCurrency = (rates, selectedCurrency) => {
  if (!rates) {
    return [];
  }

  const filtered = rates.filter(
    (rate) =>
      rate.base_currency === 'EUR' && rate.target_currency === selectedCurrency
  );

  return filtered;
};

export const paginateData = (data, currentPage, itemsPerPage) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return data.slice(indexOfFirstItem, indexOfLastItem);
};
