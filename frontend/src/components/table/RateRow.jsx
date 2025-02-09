import { formatDate } from '../../utils/dateFormatters';

function RateRow({ rate, updateNumber }) {
  return (
    <tr>
      <td className="border px-4 py-2">{formatDate(rate.updated_at)}</td>
      <td className="border px-4 py-2">{rate.exchange_rate}</td>
    </tr>
  );
}

export default RateRow;
