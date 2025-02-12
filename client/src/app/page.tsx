import Carousal from "./_components/carousal";
import Convertor from "./_components/convert";
import Navbar from "./_components/nav/navbar";
import DataProvider from "@/context/data";

export default function page() {
    return (
        <DataProvider>
            <Navbar />
            <main className="w-full">
                <Convertor />
                <Carousal />
            </main>
        </DataProvider>
    );
}
