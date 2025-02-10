import { formatDate } from '../../utils/dateFormatters';

function RateRow({ rate }) {
  return (
    <tr>
      <td>{formatDate(rate.updated_at)}</td>
      <td>{rate.exchange_rate}</td>
    </tr>
  );
}

export default RateRow;
