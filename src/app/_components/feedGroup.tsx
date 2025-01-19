"use client";
import React, {
  useEffect,
  useContext,
  useRef,
  WheelEventHandler,
  useState,
} from "react";
import FeedCard from "./feed";
import { DataContext } from "@/context/data";

const Carousel: React.FC = () => {
  const [data, setData] = useContext(DataContext);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const grpRef = useRef<HTMLDivElement | null>(null);
  const [beforeScroll, setBeforeScroll] = useState(-1);

  useEffect(() => {
    intervalRef.current = setInterval(scrolling, 5000);
    if (grpRef.current) grpRef.current.scroll({ left: 0, behavior: "smooth" });
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function scrolling() {
    setBeforeScroll((pre) => {
      if (!grpRef.current) return -1;
      if (pre === grpRef.current.scrollLeft) {
        grpRef.current.scroll({
          left: 0,
          behavior: "smooth",
        });
        return -1;
      } else {
        grpRef.current.scroll({
          left: grpRef.current.scrollLeft + 265,
          behavior: "smooth",
        });
        return grpRef.current.scrollLeft;
      }
    });
  }

  const onScrolling: WheelEventHandler<HTMLDivElement> = (e) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(scrolling, 10000);

    // scroll
    if (grpRef.current)
      grpRef.current.scroll({
        left: grpRef.current.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div
      onWheel={onScrolling}
      ref={grpRef}
      className="flex w-screen mt-4 overflow-x-scroll pb-2"
    >
      {data.map((card) => {
        return <FeedCard key={card.name} {...card} />;
      })}
    </div>
  );
};

export default Carousel;
