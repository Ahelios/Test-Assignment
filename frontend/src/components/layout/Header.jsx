import { useRatesContext } from '../../context/RatesContext';
import { formatDate } from '../../utils/dateFormatters';

function Header() {
  const { allRates, selectedCurrency } = useRatesContext();

  // Get the most recent update time
  const lastUpdated =
    allRates.length > 0 ? formatDate(allRates[0].updated_at) : 'Never';

  return (
    <header>
      <h1>1 EUR to {selectedCurrency} Exchange Rate</h1>
      <p>Last updated: {lastUpdated}</p>
    </header>
  );
}

export default Header;
