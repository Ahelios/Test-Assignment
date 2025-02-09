import { useRatesContext } from '../../context/RatesContext';

function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency } = useRatesContext();
  const currencies = ['USD', 'GBP', 'AUD'];

  return (
    <div className="currency-selector">
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
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
