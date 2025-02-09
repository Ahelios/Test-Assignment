import { useRatesContext } from '../../context/RatesContext';
import { formatDate } from '../../utils/dateFormatters';

function Header() {
  const { allRates } = useRatesContext();

  // Get the most recent update time
  const lastUpdated =
    allRates.length > 0 ? formatDate(allRates[0].updated_at) : 'Never';

  return (
    <header className="bg-white p-4 shadow-md">
      <h1 className="text-2xl font-bold">1 EUR to USD Exchange Rate</h1>
      <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
    </header>
  );
}

export default Header;
