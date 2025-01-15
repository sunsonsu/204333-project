'use client'
import React, { useState, useEffect } from "react";
import FeedCard from "./feed";
import axios from "axios";
import { FeedCardProp } from "@/interface/feedcard/prop";

interface ResponseInterface {
  api_data: { [key: string]: number }
}

const Carousel: React.FC = () => {
  const [data, setData] = useState<FeedCardProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ResponseInterface>("/api/currency");
        if (response.status === 200) {
          const rates = response.data.api_data;
          const feedCards = Object.keys(rates).map((key) => {
            return {
              name: key,
              exchange_rate: rates[key].rate,
              timestamp: new Date(rates[key].updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            };
          });
          setData(feedCards);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-screen overflow-x-scroll ">
      {data.map(card=>{
        return <FeedCard key={card.name} {...card} />
      })}
    </div>
  );
};

export default Carousel;
