import Carousal from "../_components/carousal";
import Convertor from "../_components/convert";
import Navbar from "../_components/nav/navbar";
import DataProvider from "@/context/data";
import SearchCoin from "../_components/search";

export default function page() {
    return (
        <DataProvider>
            <main className="w-full">
                <Convertor />
                <Carousal />
                <SearchCoin />
            </main>
        </DataProvider>
    );
}
