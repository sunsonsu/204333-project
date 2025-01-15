import axios from "axios";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function GET(req:NextRequest) {
    // get data from api and store in database with prisma
    try {
        try {
            const response = await axios.get("https://openexchangerates.org/api/latest.json?app_id=e2a58e93cb8946ad9f6fb0f59cd08efd");
            if (response.status === 200) {
              const timestamp = response.data.timestamp;
              const rates = response.data.rates;
              const exchangeRate = Object.keys(rates).map((key) => {
                prisma.exchangeRate.create({
                    data:{
                        coin: key,
                        rate: rates[key],
                        updatedAt: timestamp
                }})
              });
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    } catch (error) {
        
    }



}