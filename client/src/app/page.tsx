import Convertor from "./_components/convert";
import Navbar from "./_components/nav/navbar";
import DataProvider from "@/context/data";

export default function page() {
    return (
        <DataProvider>
            <Navbar />
            <Convertor />
        </DataProvider>
    );
}
