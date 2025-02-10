import axios from "axios";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface ResponseData {
  timestamp: number;
  rates: { [key: string]: number }
}

export async function GET() {
    // get data from api and store in database with prisma
    type RateData = {
        coin: string;
        rate: number;
        updatedAt : Date
    };
    
    try {
    const response = await axios.get<ResponseData>("https://openexchangerates.org/api/latest.json?app_id=e2a58e93cb8946ad9f6fb0f59cd08efd");
    if (response.status === 200) {
        const timestamp = response.data.timestamp;
        const rates = response.data.rates;
        const rateData: RateData[] = Object.entries(rates).map(([coin, rate]) => ({
        coin,
        rate: Number(rate), 
        updatedAt: new Date(timestamp * 1000),
        }));
 
      // console.log(rateData);       
      // Upsert data
      for (const data of rateData) {
        await prisma.exchangeRate.upsert({
          where: { coin: data.coin },
          update: {
            rate: data.rate,
            updatedAt: new Date(), 
          },
          create: {
            coin: data.coin,
            rate: data.rate,
          },
        });
      }
      
        const db_data = await prisma.exchangeRate.findMany({
          orderBy: {
            coin: 'asc',
          },
        });
        // Transform the data
        const api_data = db_data.reduce((acc, item) => {
        acc[item.coin] = {rate: item.rate,updatedAt: item.updatedAt,};
        return acc;}, 
        {} as Record<string, { rate: number; updatedAt: Date }>);
  
        
        return NextResponse.json({api_data}, { status:200 })
    }
        } catch (error) {
          console.error(error);
        const db_data = await prisma.exchangeRate.findMany();

        return NextResponse.json({rates:db_data});
    }
}