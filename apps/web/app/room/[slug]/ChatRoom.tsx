"use client"
import { useState ,useEffect} from "react"
import { Input } from "@repo/ui/input"
import { Butoom } from "@repo/ui/button"
import axios from "axios";
import { BACKENDURL } from "../config";
import { usesocket } from "../../../hook/usesocket"
import CanvasBoard from "./canvasboard";

interface ChatMessage {
  id: number;
  message: string;
  userId?: string;
  roomId?: number;
}

export default function ChatRoom ({roomId}:{roomId:string}){
  const { socket, loading } = usesocket(roomId)
  const [message, setmessage]= useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([])
  

  useEffect(() => {
    if (!socket) return;

    const handler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "new_message") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: data.message,
            userId: data.userId,
          },
        ]);
      }
    };
      socket.addEventListener("message", handler);
    return () => socket.removeEventListener("message", handler);
  }, [socket]);

  useEffect(() => {
    async function loadMessages() {
      const res = await axios.get<{ messages: ChatMessage[] }>(
        `${BACKENDURL}/api/chat/room/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessages(res.data.messages);//res.data contains object{" "}
      console.log(res.data.messages);//array
    }

    loadMessages();
  }, [roomId]);
  async function sendmessage() {
    if (!socket || socket.readyState !== WebSocket.OPEN) return
setMessages(prev => [
  ...prev,
  {
    id: Date.now(),
    message,
    userId: "me",
  },
]); 
   socket.send(JSON.stringify({
      type:"send_message",
      roomId,
      message
    }))
    setmessage("")
  }
    if (loading) return <div>Connecting...</div>

  return <div style={{ display: "flex", backgroundColor: "black", height: "110vh" }}>

      <div style={{marginLeft:"14px"}}>
    <CanvasBoard roomId={roomId} socket={socket}></CanvasBoard>
    </div>
    <div style={{ width: "300px", color: "white", display: "flex", flexDirection: "column", borderLeft: "1px solid #333", padding: "10px" , borderRadius:"10px"}}>
    <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px", paddingRight:"8px",wordBreak:"break-word"}}>
      {messages.map(msg => (
      <div key={msg.id} style={{ marginBottom: "6px",  wordBreak:"break-word",overflowWrap:"anywhere",maxWidth:"100%"}}>
        {msg.message}
      </div>
    ))}
    </div>
 <div style={{ display: "flex", gap: "1px",flexDirection:"column"  }}>
   <input style={{padding:"15px", borderRadius:"10px"}} value={message} placeholder="message" onChange={(e)=>{ setmessage(e.target.value)
   }} />
   <Butoom label="Send" onClick={sendmessage}/>
   </div>
  </div>
  </div>
}