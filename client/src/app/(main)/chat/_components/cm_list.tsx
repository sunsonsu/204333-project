const CurrencyChatList = () => {
    const currencies = ["currency 1", "currency 2"];
      
    return (
      <div className="w-full max-w-md mx-auto mt-6 bg-gray-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gray-400 text-black font-bold text-lg p-4 rounded-t-lg">
          Show currency that have comment
        </div>
  
        {/* Currency List */}
        <div className="bg-red-50 p-4 space-y-2">
          {currencies.map((currency, index) => (
            <div key={index} className="text-gray-800 text-lg">
              {currency}
            </div>
          ))}
        </div>
  
        {/* Placeholder for additional content */}
        <div className="bg-gray-300 h-32 rounded-b-lg"></div>
      </div>
    );
  };
  
  export default CurrencyChatList;
  