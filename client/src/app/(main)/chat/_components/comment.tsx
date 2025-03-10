'use client';
import { axiosChat } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentInfo from "@/interface/chat/comment";
import PostData from "@/interface/chat/post";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
interface uchatID {
  cid: number
    
}

interface ResponseApi {
   chat: CommentInfo[]
   uchatID: uchatID[]
   user_id: number | string
}


const CommentBox = () => {
    
    const [data, setData] = useState<CommentInfo[]>([]);
    const [ucid,setUcid] = useState<uchatID[]>([]);
    const [user_id, setUser_id] = useState<number | string>();
    const { curr } = useParams();  // 'curr' comes from the dynamic route parameter
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [msgInput, setMsgInput] = useState<string>(""); // for input message
    

    const fetchComment = async () => {
        try {
        const response = await axiosChat.get<ResponseApi>(`/api/chat/${curr}`, {withCredentials: true});
        
        if (response.status == 200){
            const result = response.data;
            // console.log(result.uchatID)
            setUcid(result.uchatID)
            let cidArray = ucid.map(item => item.cid);
            setData(result.chat);
            console.log(cidArray);
            setUser_id(result.user_id);
        }
        } catch (error: any) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
    
      fetchComment();
      }, [curr]); //do this when curr change

    
      const handlePost = async () => {
        try {
          const response = await axiosChat.post<PostData>(
            `/api/chat/${curr}`,
            { msg: msgInput },
            { withCredentials: true }
          );
      
          if (response.status === 200) {
            // console.log("Comment posted successfully!");
      
            setMsgInput(""); // Clear input field
            fetchComment(); // Refetch latest comments
          }
        } catch (error) {
          console.error("Error posting comment:", error);
        }
      };
      


    const handleDel = async (cid: number) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
  
      if (!confirmDelete) return; // If user cancels, do nothing
    
      try {
        const response = await axiosChat.delete(`/api/chat/${curr}/${cid}`, { withCredentials: true });
    
        if (response.status === 200) {
          // Update state to remove the deleted comment
          setData((prev) => prev.filter((comment) => comment.cid !== cid));
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="w-full max-w-2xl mx-auto mt-6  rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#000957] to-[#1B3A7C] text-white font-bold text-lg p-4 rounded-t-lg">
          Discussion
        </div>
  
        {/* Add Comment Input */}
        {user_id !== "not authen" && (
          <div className="bg-gray-100 p-4 border-b flex">
            <input  
              type="text"
              placeholder="add your comment"
              className="w-full p-2 border rounded-md flex-grow"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              required
            />
            <button onClick={handlePost} className="ml-2 p-2  bg-blue-500 text-white rounded-md">Post</button>
          </div>
        )}
        
        {/* Comments List */}
        <div className="divide-y divide-gray-300">
          {data.length === 0 ? (
            <div className="p-4 text-center bg-white text-gray-500">No comments yet</div>
          ) : (
            data.map(comment => (
              <div key={comment.cid} className="flex justify-between items-center p-4 bg-[#FBFBFB]">
            <span className={`font-medium ${comment.uid === user_id ? 'text-green-600' : 'text-blue-600'}`}>{comment.username}</span>
          <span className="text-gray-800 text-center flex-grow">{comment.msg}</span>
          <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>

          {comment.uid === user_id && (
            <a href="#" 
              onClick={(e) => { e.preventDefault(); handleDel(comment.cid); }} 
              className="ml-2 p-1 text-black rounded-md text-sm">
              <FontAwesomeIcon icon={faTrash} />
            </a>
          )}

              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  export default CommentBox;