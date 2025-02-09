import { useRatesContext } from '../../context/RatesContext';
import {
  calculateStats,
  filterRatesByCurrency
} from '../../utils/calculations';

function Footer() {
  const { allRates, selectedCurrency } = useRatesContext();

  const filteredRates = filterRatesByCurrency(allRates, selectedCurrency);
  const stats = calculateStats(filteredRates);

  return (
    <footer className="bg-white p-4 shadow-md mt-4">
      <p className="text-center text-sm">
        Minimum: {stats.min} {selectedCurrency}, Maximum: {stats.max}{' '}
        {selectedCurrency}
      </p>
      <p className="text-center text-sm">
        Average: {stats.avg} {selectedCurrency}
      </p>
    </footer>
  );
}

export default Footer;
