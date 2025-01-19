import Navbar from "./_components/nav/navbar";
import Carousel from "./_components/feedGroup";
import CurrencyConverterForm from "./_components/convertbar";
import DataProvider from "@/context/data";

export default function page() {
  return (
    <>
      <DataProvider>
        <Navbar />
        <Carousel />

        <section className="mt-2">
          <CurrencyConverterForm />
        </section>
        <section></section>
      </DataProvider>
    </>
  );
}
