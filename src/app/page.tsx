'use client';

import FeedCard from './_components/feed';
import { useEffect, useRef } from 'react';

const FeedComponent = () => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const feedElement = feedRef.current;

    if (!feedElement) return;

    const interval = setInterval(() => {
      if (feedElement.scrollWidth - feedElement.scrollLeft <= feedElement.clientWidth) {
        // Reset to the start when reaching the end
        feedElement.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right
        feedElement.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={feedRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none', // For IE
      }}
      className="feed-container"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '300px',
            marginRight: '16px', // Add spacing between cards
          }}
        >

          <FeedCard exchange_rate={`Card ${index + 1}`} />
        </div>
      ))}
      <style jsx>{`
        .feed-container::-webkit-scrollbar {
          display: none; /* Hide scrollbars for Webkit browsers */
        }
      `}</style>
    </div>
  );
};


const SearchBar = () => {
  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: '10px',
          width: '80%',
          maxWidth: '500px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <FeedComponent />
      <SearchBar />
    </div>
  );
};



export default FeedComponent;
