import FeedCard from "./_components/feed";

export default function feed(){
    return (
        <div className="min-h-screen flex items-start justify-end bg-gray-100 p-4">
        <div className="min-h-screen bg-gray-100 py-8 ">
          <div className="border-r-4 border-gray-300 pr-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <FeedCard
              title="Explore Next.js"
              description="Learn how to build amazing web applications with Next.js."

              link="https://nextjs.org/"
            />
            <FeedCard
              title="Tailwind CSS"
              description="Rapidly build modern websites without leaving your HTML."

              link="https://tailwindcss.com/"
            />
            <FeedCard
              title="TypeScript"
              description="Strongly typed programming for JavaScript developers."

              link="https://www.typescriptlang.org/"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <FeedCard
              title="Explore Next.js"
              description="Learn how to build amazing web applications with Next.js."

              link="https://nextjs.org/"
            />
            <FeedCard
              title="Tailwind CSS"
              description="Rapidly build modern websites without leaving your HTML."

              link="https://tailwindcss.com/"
            />
            <FeedCard
              title="TypeScript"
              description="Strongly typed programming for JavaScript developers."

              link="https://www.typescriptlang.org/"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <FeedCard
              title="Explore Next.js"
              description="Learn how to build amazing web applications with Next.js."

              link="https://nextjs.org/"
            />
            <FeedCard
              title="Tailwind CSS"
              description="Rapidly build modern websites without leaving your HTML."

              link="https://tailwindcss.com/"
            />
            <FeedCard
              title="TypeScript"
              description="Strongly typed programming for JavaScript developers."

              link="https://www.typescriptlang.org/"
            />
          </div>
        </div>
        </div>
      );
    };