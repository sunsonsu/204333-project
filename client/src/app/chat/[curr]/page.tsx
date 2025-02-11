'use client';
import { useEffect, useState } from 'react';
// import Navbar from '@/app/_components/nav/navbar';
import { useParams } from 'next/navigation';

interface CoinData {
  coin: string;
  rate: number;
  updatedAt: string;
}

const ChatPage = () => {
  const [data, setData] = useState<CoinData | null>(null);
  const { curr } = useParams();  // 'curr' comes from the dynamic route parameter
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurr = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/chat/${curr}`);
        
        if (!response.ok) {
          throw new Error('Response was not ok');
        }

        const result: CoinData = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurr();
  }, [curr]); //do this when curr change

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {/* <Navbar /> */}
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-white">Chat</h1>
        <p className="text-white mt-4">
          {loading ? 'Loading chat ...' : `Welcome to the chat room with ID: ${curr}`}
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <p className="text-gray-600">Coin: {data?.coin}</p>
          <p className="text-gray-600">Rate: {data?.rate}</p>
          <p className="text-gray-600">
            Updated At: {data ? new Date(data.updatedAt).toLocaleString() : ""}</p>
        </div>
      </div>
    </>
  );
};

export default ChatPage;

