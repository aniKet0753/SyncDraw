import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});
import { WebSocketServer,WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { supabase } from "./wsSupabase";

const ws = new WebSocketServer({ port :8080});

function checkuserexist(token : string) : string | null {
  const decode = jwt.verify(token, process.env.JWT_SECRET ||"");
  if ( typeof decode == "string") { 
    return null;
  }
  if(! decode || !decode.userId){
    return null;
  }
  return decode.userId;
}

interface UserSocket  {
  userId : string,
  room : string[],
  ws : WebSocket
} 

const users : UserSocket[] = [];


ws.on("connection",function connection(ws, request){
  try{
  const url = request.url;
  const queryParams = new URLSearchParams(url?.split('?')[1]);
  const token = queryParams.get("token") || "";
  const userId = checkuserexist(token);
  if(!userId){
    ws.close(1008, "Invalid token");
    return;
  }
  if(userId ==null){
    ws.close();
    return;
  }
  users.push({
    userId,
    room :[],
    ws
  })
  
  ws.on('message',async function message(data){
   const parsesata = JSON.parse(data.toString());
   console.log("Received data ", parsesata);

   if(parsesata.type == "join_room") {//join checked
    const user = users.find(u => u.ws == ws);
    user?.room.push(parsesata.roomSlug);
   }
   if(parsesata.type == "leave_room") {
    const user = users.find(u=> u.ws == ws);
    if(!user) {
      return null;
    }
    user.room = user?.room.filter(r => r !== parsesata.roomSlug);
   }
   if(parsesata.type == "send_message") {//send checked not fix , its getting it own message once on send message it shouild 
    //send not other not broadcast to its own 
    const roomSlug = parsesata.roomId;//you hve to pass roomId inorder to send meggase
    const message = parsesata.message;


    //chatgpt help 
    //  Find Room.id using slug
  const { data: room, error: roomError } = await supabase
    .from("Room")
    .select("id")
    .eq("slug",roomSlug)
    .maybeSingle();

  if (roomError || !room) {
    console.error("ROOM NOT FOUND", roomError);
    return;
  }

  const roomId = room.id; //  string

users.forEach(u => {//broadcast to all user in that room except sender
  if (u.ws !== ws && u.room.includes(roomSlug)) {
    u.ws.send(JSON.stringify({
      type: "new_message",
      roomSlug,
      message
    }));
  }
});
      //database connection and save message to database
    const {  error } = await supabase.from ("Chat").insert({
      roomId : roomId,
      userId : userId,
      message : message
    });
    if(error){
      console.error("SUPABASE ERROR ", error);
     return;
    }
   }

   });
   
  }catch(err){
    ws.close(1011, "Server error");
  }
})