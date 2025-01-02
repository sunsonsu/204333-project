import React from "react";

type FeedCardProps = {
  name: string;
  exchange_rate: string;
  link: string;
  update: string;
};

const FeedCard: React.FC<FeedCardProps> = ({ name, exchange_rate, link, update }) => {
  return (
    <div className="mt-4 w-64 h-80 max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Content Section */}
      <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {name} Country Name
      </h2>
      <p className="text-gray-600 text-sm">
        Last Update: {update} </p>
      <br></br>
      <br></br>
      <h3 className="text-gray-600 text-sm mb-4 font-semibold text-center">{exchange_rate} Exchange Rate</h3>
      <br></br>
      <br></br>
      <div className="flex justify-center">
        <img src="https://flagsapi.com/TH/flat/64.png" alt="Country Flag" />
      </div>
      </div>
    </div>
  );
};

export default FeedCard;
