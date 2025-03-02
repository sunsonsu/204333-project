import Carousal from "../_components/carousal";
import Convertor from "../_components/convert";
import DataProvider from "@/context/data";
import SearchCoin from "../_components/search";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Home | Currency Xchange",
};

export default function page() {
    return (
        <DataProvider>
            <main className="w-full">
                <Suspense>
                    <Convertor />
                    <Carousal />
                </Suspense>
                <SearchCoin />
            </main>
        </DataProvider>
    );
}
