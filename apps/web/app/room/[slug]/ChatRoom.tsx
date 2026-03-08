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
        `${BACKENDURL}/chat/room/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessages(res.data.messages);
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

  return <div>
    <div>
    <CanvasBoard></CanvasBoard>
{messages.map(msg => (
  <div key={msg.id}>
    {msg.message}
  </div>
))}
</div>
   <Input value={message} placeholder="message"  onChange={(e)=>{ setmessage(e.target.value)
   }} />
   <Butoom label="Send" onClick={sendmessage}/>
   
  </div>
}