'use client';
import { useContext, useDebugValue, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { DataContext } from "@/context/data";

import { useRouter } from 'next/navigation';


const CurrencyConverterForm = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('THB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [error, setError] = useState('');
  const [convertedValue, setConvertedValue] = useState<string | null>(null);
  const {replace} = useRouter();
  useEffect(() => {replace(`?base=${fromCurrency}`)}, [fromCurrency]);
  const [data, setData] = useContext(DataContext);
  const rate_data = useMemo(()  => {
    let result:{[key:string]:number} = {}
    data.forEach((d) => {
      result[d.name] = d.exchange_rate
    })
    return result
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      setConvertedValue(null);
      return;
    }

    setError('');


    const calculatedRate = (fromCurrency: string, toCurrency: string, amount:number) => {
      const fromcurr = rate_data[fromCurrency]
      const tocurr = rate_data[toCurrency]

      return (tocurr/fromcurr) * amount

    }
    
    const rate = calculatedRate(fromCurrency, toCurrency, Number(amount))
    if (rate) {
      setConvertedValue(`${amount} ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`);
    } else {
      setConvertedValue('Conversion rate not available');
    }
  };

  return (
    <div className="bg-navy rounded-lg mt-10 p-4 shadow-md w-96 mx-auto">
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
            placeholder={`${fromCurrency}`}
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
              {Object.keys(rate_data).map((key)=>{return <option key={key} value={key}>{key}</option>})}

            </select>
          </div>

            {/* Switch Icon */}
            <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-2xl text-gray-500"
              onClick={() => {
              const temp = fromCurrency;
              setFromCurrency(toCurrency);
              setToCurrency(temp);
              }}
            >
              ⇄
            </button>
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
              {Object.keys(rate_data).map((key)=>{return <option key={key} value={key}>{key}</option>})}
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
