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
    <div className="w-full max-w-md mx-auto bg-blue-950/30 p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-white text-center text-3xl font-bold">{data?.coin}</h2>
        <p className="text-center text-gray-300 text-2xl font-semibold mt-2">Rate: <span className="text-blue-500">{data?.rate}</span></p>
        <p className="text-center text-gray-200 text-sm">(Compared with 1 USD)</p>
        <p className="text-gray-400 text-end text-xs font-medium mt-4">
            {data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'Data is up to date'}
        </p>
    </div>
  );
};

export default CoinData;
