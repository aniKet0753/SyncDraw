"use client";
import { Card } from "@repo/ui/card";
import { Butoom } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import axios from "axios";
import { useState } from "react";
import {useRouter} from "next/navigation";
import { BACKENDURL } from "../room/config";

export default  function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [success, setsucess] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();
  
  async function handleSignup() {
    // setsucess("");
    // seterror("");
    if(!email || !password){
      seterror("please fill all fields");
      return;
    }
    setLoading(true);
    try {
       await axios.post(`${BACKENDURL}/api/signup`, {
        email,
        password,
        name,
      });
       console.log("signnup first")
      setsucess("Signup successful! You can now Signin.");
      setTimeout(() => {
        router.push('/signin');
      },2000);
      // setEmail("");// clear input fields
      // setPassword("");// clear input fields
    } catch (error: any) {
      console.log(error);
      seterror("Signup failed. plase Check your details and try again.");
    }finally{
      setLoading(false);
    }
  }
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#4797ff",}}>
      <div>
        <main style={{  height: "700px", borderColor:"gray", borderRadius:"10px",width:"900px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6",}}>
          <div style={{ background: "#f3f4f6", fontFamily:"Roboto" }}>
            <Card title="Signup page" /> 
            <div style={{ margin:"0px", textAlign: "center" }}>
              <Input placeholder="User Name" value={name} onChange={(e)=> setname(e.target.value)}/>
              <Input  placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
              <br />
              <Input placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <br />
               <p style={{color:"black", fontSize:"20px",marginTop:"5px",fontFamily:"Roboto"}}>You Already Have an Account ?<u onClick={()=> router.push("/signin")} style={{color:"red",cursor:"pointer",}}> Sign In</u></p>
              {success && (
                <p style={{ color: "green", marginBottom: "8px" }}>{success}</p>)}
              {error && (
                <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>)}
              <Butoom onClick={handleSignup} loading={loading} label="SignUP" />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
