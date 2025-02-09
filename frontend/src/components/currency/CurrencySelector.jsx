import { useRatesContext } from '../../context/RatesContext';

function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency } = useRatesContext();
  const currencies = ['USD', 'GBP', 'AUD']; // These match your TARGET_CURRENCIES in the backend

  return (
    <div className="mb-4">
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        className="p-2 border rounded"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            EUR to {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;
