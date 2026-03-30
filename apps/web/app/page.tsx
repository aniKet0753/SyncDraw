"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@repo/ui/navbar";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/input";  
import { Butoom } from "@repo/ui/button";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ roomId, setRoomId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);
  function community () {
    router.push("https://chat.whatsapp.com/EWgILNn87cnFIRCRxLC7BF")
  }

  function demovideo () {
    router.push("https://youtube.com/shorts/P9qTXsMcaM0?si=8jFMgEz8S0K5kUBV");
  }

 function startdrwing () {
  if(isLoggedIn){
    router.push("/room");
  }else{
    router.push("/signup")
  }
 }
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",}}>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <main style={{ backgroundColor:"#667eea",  minHeight: "100vh",  flexDirection: "column",display: "flex",}}>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onSignupClick={() => router.push("/signup")} onSigninClick={() => router.push("/signin")} onLogoutClick={handleLogout}/>
      </div>
      {/*main header section*/ }
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ padding: "20px", borderRadius: "10px",}}>
          <h1 style={{ fontFamily: "'Inter', system-ui, sans-serif",fontSize: "clamp(48px, 6vw, 70px)",fontWeight: 800,lineHeight: 1.1, marginTop: "120px",color: "white", maxWidth: "800px",}}>
            Your{" "}<span style={{color:"#f2ff00",marginLeft:"8px",textShadow: `0 0 4px rgba(255, 242, 0, 0.9), 0 0 12px rgba(255, 251, 0, 0.7), 0 0 28px rgba(255, 251, 0, 0.4), 0 0 50px rgba(255,0,0,0.2)`, borderColor:"black"}}>Ideas</span>
            {" "}Sketched to <br /> <span style={{}}>Life</span>
            
          </h1>
          
            <p style={{fontFamily:"Roboto", fontSize:"28px", marginTop:"20px"}}>A virtual whiteboard for sketching hand-drawn like diagrams.<br />
             Collaborate in real-time, export your work, and bring your ideas to<br /> life.</p>
          
          <div style={{gap:"19px", display:"flex",padding:"20px"}}>
          <Butoom  label="Start Drawing" onClick={startdrwing} />
          <Butoom label="Watch Demo" onClick={demovideo} />
          </div>


        </div>
       <div style={{ marginTop: "69px",marginRight:"75px" }}>
  <div className="canvas-preview">
    <div className="canvas-content">
      <div className="sketch-box"></div>
      <div className="sketch-arrow"></div>
      <div className="sketch-circle"></div>
      <div className="sketch-text">Ideas!</div>
    </div>
  </div>
</div>  
      </div>
      {/*mid body section*/ }
       <section style={{ marginTop:"130px", width: "100%" , backgroundColor: "#ffffff", padding: "100px 40px",}} >
         <h2 style={{ textAlign: "center", fontSize: "42px", fontWeight: "700",marginBottom: "70px", color: "#2b2b2b",fontFamily: "Inter, system-ui, sans-serif",}}>
           Why Choose SyncDraw?
         </h2>
         <div style={{display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "45px", maxWidth: "1400px", margin: "0 auto", }}>
    {[
      {
        icon: "✏️",
        title: "Hand-Drawn Style",
        desc: "Create beautiful diagrams with a hand-drawn aesthetic that brings warmth and personality to your sketches.",
      },
      {
        icon: "🔒",
        title: "Privacy First",
        desc: "Your drawings stay private. End-to-end encryption ensures your creative work remains secure.",
      },
      {
        icon: "🤝",
        title: "Real-Time Collaboration",
        desc: "Work together with your team in real-time. See changes instantly and brainstorm together.",
      },
      {
        icon: "📱",
        title: "Works Everywhere",
        desc: "Access your whiteboard from any device — desktop, tablet, or mobile.",
      },
      {
        icon: "⚡",
        title: "Lightning Fast",
        desc: "No lag, no delays — just smooth, responsive drawing performance.",
      },
      {
        icon: "🎨",
        title: "Rich Library",
        desc: "A huge collection of shapes, icons, and templates to jumpstart creativity.",
      },
    ].map((item, index) => (
      <div key={index}style={{ backgroundColor: "#fff", borderRadius: "22px", padding: "42px", minHeight: "300px", boxShadow: "0 25px 60px rgba(0,0,0,0.08)", transition: "all 0.3s ease", }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 40px 90px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 25px 60px rgba(0,0,0,0.08)";
        }} >
        <div
          style={{ width: "56px", height: "56px", borderRadius: "14px", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",marginBottom: "20px",}}>
          {item.icon}
        </div>
        <h3
          style={{ fontSize: "25px", fontFamily:"'Inter', system-ui, sans-serif", fontWeight: "600", marginBottom: "10px",color: "#1f1f1f",}}>
          {item.title}
        </h3>
        <p
          style={{ fontSize: "20px", lineHeight: "1.6", fontFamily:"Roboto", color: "#666", }} >
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>
{/*footer section*/ }
<section style={{ width: "100%", padding: "120px 20px 80px", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",}}>
  <h2 style={{ fontFamily:"'Inter', system-ui, sans-serif", fontSize: "44px", fontWeight: "700", color: "#ffffff", marginBottom: "18px",}} >
    Ready to Start Drawing?
  </h2>
  <p style={{ fontFamily:"Roboto",fontSize: "20px", color: "rgba(255,255,255,0.9)", maxWidth: "720px",marginBottom: "40px", lineHeight: "1.6",}}>
    “Join a growing community of creators, designers, and teams.”
  </p>
  <button  onClick={community} style={{backgroundColor: "#ffffff", color: "#667eea",padding: "16px 36px", fontSize: "18px",fontWeight: "600", borderRadius: "12px", border: "none",cursor: "pointer",transition: "all 0.3s ease",boxShadow: "0 12px 30px rgba(0,0,0,0.25)", }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
    }}>
    Get Started Now
  </button>
  <div style={{ marginTop: "60px", fontSize: "20px", color: "rgba(255,255,255,0.85)",fontFamily:"'Inter', system-ui, sans-serif" }} >
   © 2026 SyncDraw. Made with ❤️ By Aniket Kumar.
  </div>
</section>
    </main>
  );
}