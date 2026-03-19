"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKENDURL } from "./config";

export default function Room() {
  const [roomId, setroomId] = useState("")
  const [joinroomId,setjoinroomoId] = useState("")
  const router = useRouter();

  async function createroom (){
    try{
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BACKENDURL}/api/room`,{},{headers:{
      Authorization:`Bearer ${token}`
    }})
      const newroom = res.data.roomId
      console.log("your room id is :",newroom)
      setjoinroomoId(roomId)
     setTimeout(()=>{
      router.push(`/room/${newroom}`)
    },2000)
    }catch(error){
      return alert("room creation error");
    }
  }

  return (
    <main
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#667eea"}}>
      <div style={{ width: "320px"  }}>
        <h2 style={{fontFamily:"Roboto", fontSize: "22px", fontWeight: 600, marginBottom: "20px", textAlign: "center", }}>
          Join or Create a Room
        </h2>
        <input value={roomId} onChange={(e) =>{
          setroomId(e.target.value)
        }} type="text"  placeholder="Room ID"style={{ width: "100%",  height: "42px",  padding: "0 12px",  borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", fontSize: "14px",  }} />
        <button onClick={()=>{
          router.push(`/room/${roomId}`)
        }}  style={{ fontFamily:"Roboto", width: "100%", height: "42px", background: "#1f6fff", color: "#fff", border: "none", borderRadius: "8px" ,fontSize: "14px", fontWeight: 500, cursor: "pointer", marginBottom: "10px", }} >
          Join Room
        </button>
        <button onClick={createroom} style={{ fontFamily:"Roboto", width: "100%", height: "42px", background: "transparent", color: "#ffffff", border: "1px solid #ffffff", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer",}}>
          Create New Room
        </button>   
      </div>
    </main>
  );
}
