'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


interface CoinData {
  coin: string;
  rate: number;
  updatedAt: string;
}

const coinData = () => {
  const [data, setData] = useState<CoinData | null>(null);
  const { curr } = useParams();  // 'curr' comes from the dynamic route parameter
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurr = async () => {
      try {
        const response = await fetch(`http://localhost:3004/api/chat/${curr}`);
        
        if (!response.ok) {
          throw new Error('Response was not ok');
        }

        const result = await response.json();
        setData(result.rate);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurr();
  }, [curr]); //do this when curr change

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div className='ml-4 mt-2 mb-2'>
        <h1 className="text-2xl font-semibold text-white">Discussion</h1>
        <p className="text-white mt-4">
          {loading ? 'Loading chat ...' : `Welcome to the discussion area for: ${curr}`}
        </p>
      </div>
      <div className="w-full max-w-md mx-auto bg-white text-black text-center p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 text-3xl font-bold">{data?.coin}</p>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="mt-4">
          <p className="text-gray-600">Rate: {data?.rate}</p>
          <p className="text-gray-600">
            Last updated: {data ? new Date(data.updatedAt).toLocaleString() : ""}</p>
        </div>
      </div>
      </>
  );
};

export default coinData;
