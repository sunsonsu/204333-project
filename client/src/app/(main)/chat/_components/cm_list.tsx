'use client';
import { axiosChat } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';
interface ChatData {
    [key: string]: number;
}

const CurrencyChatList = () => {
      const [data, setData] = useState<ChatData | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      useEffect(() => {
      
          const fetchData = async () => {
            try {
              const response = await axiosChat.get<ChatData>(`/api/chat/`);
              
              if (response.status == 200){
                  const result = response.data;
                  setData(result);
              }
      
            } catch (error: any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []); 

    return (
      <>
      <h1 className='text-3xl text-white text-center font-bold '>Discussion Board</h1>
      <div className="w-full max-w-md mx-auto mt-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#000957] to-[#1B3A7C] text-white font-bold text-lg p-4 rounded-t-lg">
        Topics
        </div>
        {/* Search Bar */}
        <div className="p-4 bg-white border-black ">
          <input
            type="text"
            placeholder="Search currency..."
            className="w-full p-2 border  border-gray-300 rounded-lg"
          />
      
        </div>
        {/* Currency List */}
        <div className="bg-[#F7F7F7] space-y-2">
            {data && Object.keys(data).map((currency) => (
            <div className="p-4 text-gray-800 font-semibold text-lg flex justify-between items-center border-b" key={currency}>  
              <a href={`chat/${currency}`} target='_blank' className='flex-grow'>
                {currency}
              </a>
              <a href={`chat/${currency}`} target='_blank'>
                <p className='text-right'>
                <FontAwesomeIcon icon={faComment} /> {data[currency]}
                </p>
              </a>
            </div>
            ))}
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
        </div>
  
        {/* Placeholder for additional content */}
        <div className="bg-[#F7F7F7] h-32 rounded-b-lg"></div>
      </div>
      </>

    );
  };
  
  export default CurrencyChatList;
  