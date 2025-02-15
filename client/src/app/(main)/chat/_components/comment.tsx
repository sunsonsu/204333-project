const CommentBox = () => {
    
    return (
      <div className="w-full max-w-2xl mx-auto mt-6 bg-gray-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gray-400 text-black font-bold text-lg p-4 rounded-t-lg">
          Discussion
        </div>
  
        {/* Add Comment Input */}
        <div className="bg-gray-100 p-4 border-b">
          <input
            type="text"
            placeholder="add your comment"
            className="w-full p-2 border rounded-md"
          />
        </div>
  
        {/* Comments List */}
        <div className="divide-y divide-gray-300">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-300">
              <span className="text-gray-700 font-medium">username</span>
              <span className="text-gray-800">comment</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CommentBox;
  