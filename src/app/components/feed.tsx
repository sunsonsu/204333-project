import React from "react";

type FeedCardProps = {
  title: string;
  description: string;
  link: string;
};

const FeedCard: React.FC<FeedCardProps> = ({ title, description, link }) => {
  return (
    <div className="mt-2 w-64 h-80 max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <a href={link} target="_blank" rel="noopener noreferrer">
      </a>
      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};

export default FeedCard;
