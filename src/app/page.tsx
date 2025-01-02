import Navbar from "./_components/navbar";
import FeedGroup from "./_components/feedGroup";
import CurrencyConverterForm from "./_components/convertbar";
export default function page() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="">
        <FeedGroup />
      </div>
    
      <div className="mt-2">
        <CurrencyConverterForm />
      </div>
    </div>

    
  );
}



