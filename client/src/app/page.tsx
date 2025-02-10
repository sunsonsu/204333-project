import Navbar from "./_components/nav/navbar";
import Carousel from "./_components/feedGroup";
import CurrencyConverterForm from "./_components/convertbar";
import DataProvider from "@/context/data";
import Favorite from "./_components/favorite";

export default function page() {
    return (
        <>
            <DataProvider>
                <Navbar />
                <Carousel />

                <section className="mt-2">
                    <CurrencyConverterForm />
                </section>
                <Favorite />
            </DataProvider>
        </>
    );
}
