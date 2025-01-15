'use client';

import { useState } from 'react';

const CurrencyConverterForm = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [error, setError] = useState('');
  const [convertedValue, setConvertedValue] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      setConvertedValue(null);
      return;
    }

    setError('');

    // Simulated conversion logic (replace with API or actual calculation)
    const conversionRates: { [key: string]: number } = {
      'USD-EUR': 0.85,
      'EUR-USD': 1.18,
      'USD-GBP': 0.75,
      'GBP-USD': 1.33,
      'USD-THB': 34.21,
      'THB-USD': 0.029,
    };
    
    const conversionKey = `${fromCurrency}-${toCurrency}`;
    const rate = conversionRates[conversionKey];

    if (rate) {
      const result = (Number(amount) * rate).toFixed(2);
      setConvertedValue(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
    } else {
      setConvertedValue('Conversion rate not available');
    }
  };

  return (
    <div className="bg-white rounded-lg mt-10 p-4 shadow-md w-96 mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Currency Selectors */}
        <div className="flex gap-4 mb-6">
          {/* From Currency */}
          <div className="flex-1">
            <label
              htmlFor="fromCurrency"
              className="block text-gray-700 font-medium mb-2"
            >
              From
            </label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="THB">THB - Thai Baht</option>
            </select>
          </div>

          {/* Switch Icon */}
          <div className="flex items-center justify-center">
            <span className="text-2xl text-gray-500">⇄</span>
          </div>

          {/* To Currency */}
          <div className="flex-1">
            <label
              htmlFor="toCurrency"
              className="block text-gray-700 font-medium mb-2"
            >
              To
            </label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="THB">THB - Thai Baht</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Convert
        </button>
      </form>

      {/* Display Conversion Result */}
      {convertedValue && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md shadow">
          <p className="text-lg font-semibold text-gray-800">{convertedValue}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverterForm;
