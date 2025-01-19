// Description: This file is about each FeedCard that will display in FeedGroup
import { useContext, useEffect, useState } from "react";
import { FeedCardProp } from "@/interface/feedcard/prop";
import { useRouter, useSearchParams } from "next/navigation";
import { DataContext } from "@/context/data";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axiosCustom from "@/lib/axios";
import { useConfirm } from "@/hook/confirm";

const FeedCard: React.FC<FeedCardProp> = ({
  name,
  exchange_rate,
  timestamp,
  fav,
}) => {
  const [data, setData] = useContext(DataContext);
  const [base, setBase] = useState<FeedCardProp | null>(null);
  const sp = useSearchParams();
  const confirm = useConfirm();
  const { replace } = useRouter();

  useEffect(() => {
    const b = sp.get("base") || "usd";
    const base_late = data.find(
      (d) => d.name.toLowerCase() === b.toLowerCase()
    );
    if (!base_late) return () => {};
    setBase(base_late);
  }, [sp]);

  async function onFavorite() {
    const res = await axiosCustom.post(
      "/api/favorite",
      { c: name },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      setData((p) => {
        return p.map((d) => {
          if (d.name === name) {
            return { ...d, fav: true };
          }
          return d;
        });
      });
    } else if (res.status === 401) {
      confirm({
        text: "You haven't signed in. Please sign in before using favorite.",
        fn: () => {
          replace("/auth");
        },
      });
    }
  }

  async function onUnfavorite() {
    const res = await axiosCustom.delete(`/api/favorite?c=${name}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      setData((p) => {
        return p.map((d) => {
          if (d.name === name) {
            return {
              name: d.name,
              exchange_rate: d.exchange_rate,
              timestamp: d.timestamp,
            };
          }
          return d;
        });
      });
    }
  }

  return (
    <div className="bg-white cursor-pointer hover:scale-[1.03] transition-all border hover:shadow-lg rounded-lg duration-300 min-w-64 h-72 py-8 px-4 m-2">
      <h2 className="w-full text-center text-4xl font-semibold text-gray-800 mb-2">
        {name}
      </h2>
      <p className="w-full text-center text-[0.7rem] text-gray-500">
        compare with {base ? base.name.toUpperCase() : "USD"}
      </p>

      <h1 className="text-gray-600 my-8 justify-center font-semibold text-center text-3xl">
        {base && base.name !== "USD"
          ? `${(base.exchange_rate / exchange_rate).toFixed(
              2
            )} ${base.name.toUpperCase()}`
          : `${exchange_rate.toFixed(2)} USD`}
      </h1>
      <p className="text-gray-600 text-center w-full text-[0.7rem]">
        {timestamp}
      </p>
      <div className="w-full mt-4 flex justify-center">
        {fav ? (
          <FaHeart
            onClick={() => {
              onUnfavorite();
            }}
            className="text-2xl"
          />
        ) : (
          <FaRegHeart
            onClick={() => {
              onFavorite();
            }}
            className="text-2xl"
          />
        )}
      </div>
    </div>
  );
};

export default FeedCard;
