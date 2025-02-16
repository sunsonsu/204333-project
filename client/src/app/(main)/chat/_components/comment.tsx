'use client';
import { axiosChat } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentInfo {
    cid: number;
    uid: number;
    c: string;
    msg: string;
    createdAt: string;
    deletedAt: string | null;
    username: string;
}
interface ResponseApi {
   chat: CommentInfo[]
}

const CommentBox = () => {

    const [data, setData] = useState<CommentInfo[]>([]);
    const { curr } = useParams();  // 'curr' comes from the dynamic route parameter
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

    const fetchComment = async () => {
        try {
        const response = await axiosChat.get<ResponseApi>(`/api/chat/${curr}`);
        
        if (response.status == 200){
            const result = response.data;
            setData(result.chat);
        }

        } catch (error: any) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    fetchComment();
    }, [curr]); //do this when curr change
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
          {data.map(comment => (
            <div key={comment.cid} className="flex justify-between items-center p-4 bg-gray-300">
              <span className="text-gray-700 font-medium">{comment.username}</span>
              <span className="text-gray-800">{comment.msg}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default CommentBox;