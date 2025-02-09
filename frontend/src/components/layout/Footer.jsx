import { useRatesContext } from '../../context/RatesContext';
import {
  calculateStats,
  filterRatesByCurrency,
} from '../../utils/calculations';

function Footer() {
  const { allRates, selectedCurrency } = useRatesContext();

  const filteredRates = filterRatesByCurrency(allRates, selectedCurrency);
  const stats = calculateStats(filteredRates);

  return (
    <footer className="exchange-stats">
      <p>
        Minimum: {stats.min} {selectedCurrency}, Maximum: {stats.max}{' '}
        {selectedCurrency}
      </p>
      <p>
        Average: {stats.avg} {selectedCurrency}
      </p>
    </footer>
  );
}

export default Footer;
