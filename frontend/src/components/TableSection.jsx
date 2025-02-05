import { useState, useEffect } from 'react';
import axios from 'axios';

function TableSection() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/rates')
      .then((response) => {
        console.log(response.data)
        setRates(response.data)})
      
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="p-4">
      <div className="text-center mt-4">
        <button className="px-2">{'<'}</button>
        <span className="mx-2">1 2 ... 5 6</span>
        <button className="px-2">{'>'}</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">EUR to USD</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{rate.date}</td>
                <td className="border px-4 py-2">{rate.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="px-2">{'<'}</button>
        <span className="mx-2">1 2 ... 5 6</span>
        <button className="px-2">{'>'}</button>
      </div>
    </section>
  );
}

export default TableSection;
