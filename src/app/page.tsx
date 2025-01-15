import Navbar from "./_components/navbar";
import Carousel from "./_components/feedGroup";
import CurrencyConverterForm from "./_components/convertbar";
export default function page() {
  return (
    <>
      <Navbar />
      <Carousel />

      <div className="mt-2">
        <CurrencyConverterForm />
      </div>
    </>

    
  );
}



