'use client';
import { axiosChat } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentInfo from "@/interface/chat/comment";
import PostData from "@/interface/chat/post";

interface ResponseApi {
   chat: CommentInfo[]
}

const CommentBox = () => {

    const [data, setData] = useState<CommentInfo[]>([]);
    const { curr } = useParams();  // 'curr' comes from the dynamic route parameter
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [msgInput, setMsgInput] = useState<string>(""); // for input message
    const router = useRouter();

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
    
    const handlePost = async () => {
      try {
        const response = await axiosChat.post<PostData>(`/api/chat/${curr}`, {
          msg: msgInput
        }, {withCredentials: true});
        if (response.status == 200){
          console.log("OK")
        }
      } catch (error) {
        
      }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="w-full max-w-2xl mx-auto mt-6 bg-gray-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gray-400 text-black font-bold text-lg p-4 rounded-t-lg">
          Discussion
        </div>
  
        {/* Add Comment Input */}
        <div className="bg-gray-100 p-4 border-b flex">
          <input  
            type="text"
            placeholder="add your comment"
            className="w-full p-2 border rounded-md flex-grow"
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
          />
          <button onClick={handlePost} className="ml-2 p-2 bg-blue-500 text-white rounded-md">Post</button>
        </div>
  
        {/* Comments List */}
        <div className="divide-y divide-gray-300">
          {data.map(comment => (

            <div key={comment.cid} className="flex justify-between items-center p-4 bg-gray-300">
              {}
              <span className="text-gray-700 font-medium">{comment.username}</span>
              <span className="text-gray-800">{comment.msg}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default CommentBox;