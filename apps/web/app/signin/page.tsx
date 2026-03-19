"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { Butoom } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKENDURL } from "../room/config";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();


  async function handleSignin() {
    setEmail("");
    setPassword("");
    if (!email || ! password) {
      setError("please fill all fields");
      return;
    }
      try {
      const res = await axios.post(`${BACKENDURL}/api/signin`, {
        email,
        password,
      });

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        
        setSuccess("Signin successful! Redirecting...");
        
        setEmail("");
        setPassword("");
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError("Signin failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Signin failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
    }
  }

  return (
   <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#47f0ff",}}>
      <div>
        <main style={{  height: "700px", borderColor:"gray", borderRadius:"10px",width:"900px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6",}}>
          <div style={{ background: "#f3f4f6", fontFamily:"Roboto" }}>
            <Card title="SignIn Page" />
            <div style={{ marginTop: "1px", textAlign: "center" }}>
              <Input  placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
              <br />
              <Input placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <br />
               {success && (
                <p style={{ color: "green", marginBottom: "8px" }}>{success}</p>)}
              {error && (
                <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>)}
              <Butoom onClick={handleSignin}  label="SignIn" />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
