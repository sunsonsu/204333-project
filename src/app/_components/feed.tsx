// Description: This file is about each FeedCard that will display in FeedGroup
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FeedCardProp } from '@/interface/feedcard/prop';
import { useSearchParams } from 'next/navigation';


const FeedCard: React.FC<FeedCardProp> = ({ name, exchange_rate, link, timestamp }) => {
  useSearchParams();

  return (
    <div className="bg-white border hover:shadow-lg transition-shadow rounded-lg duration-300 min-w-64 h-48 p-4 m-2">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Currency:{name}
      </h2>
      <p className="text-gray-600 text-sm"> 
        {timestamp}
      </p>

      <h1 className="text-gray-600 mt-16 justify-center font-semibold text-center">
      {exchange_rate} 
      </h1>

    </div>
  );
};

export default FeedCard;