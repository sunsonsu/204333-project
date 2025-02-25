'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { axiosChat } from '@/lib/axios';

interface CoinInfo {
  coin: string;
  rate: number;
  updatedAt: string;
}

interface ResponseApi {
    rate: CoinInfo

}

const CoinData = () => {
  const [data, setData] = useState<CoinInfo | null>(null);
  const { curr } = useParams();  // 'curr' comes from the dynamic route parameter
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchCurr = async () => {
      try {
        const response = await axiosChat.get<ResponseApi>(`/api/chat/${curr}`);
        
        if (response.status == 200){
            const result = response.data;
            setData(result.rate);
        }

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurr();
  }, [curr]); //do this when curr change

  if (! data) return <p>Loading...</p>;

  return (
    <>
      <div className='ml-4 mt-2 mb-2'>
      </div>

      <div className="w-full max-w-md mx-auto bg-gradient-to-r from-[#f7f8fd] to-[#ffffff] p-2 rounded-lg shadow-lg">
      <p className="text-black text-center text-3xl font-bold">{data.coin}</p>
        <p className="text-center text-black text-3xl font-bold">Rate: {data.rate}</p>
        <p className="text-center text-gray-600 text-sm font-bold">(compare with 1 USD)</p>
          <p className="text-gray-500 text-end text-xs font-semibold">
            {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'data is up to date'}</p>
      </div>
      </>
  );
};

export default CoinData;
