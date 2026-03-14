import { Router, type Router as ExpressRouter } from "express";
import  {supabase}   from "../supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";

const router: ExpressRouter = Router();

router.post("/signup", async (req, res) => {
  try{   
    const { email  , password,name } = req.body;
        const hash = await bcrypt.hash(password, 10);
           const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hash ,name}])
      .single();
      console.log("Supabase error:", error);
       
        if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ message: "User signed up successfully" });
    }catch(err: any) {
      return res.status(500).json({ message: "Internal Server Error" });

  }
});

router.post("/signin", async (req,res)=>{
  try {
    const {email , password} = req.body;
  const { data: user, error } = await supabase
      .from("users")
      .select("id , password")
      .eq("email", email)
      .single();    
      if (error || !user) {
  return res.status(401).json({ message: "User not found" });
}
const isMatch = await bcrypt.compare(
      password,
      user.password
    );      
      if (!isMatch) {
      return res.status(401).json({ message: "passeord is incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id, email : email },
      process.env.JWT_SECRET || "",
       { expiresIn: '7d' }
    );
    

    return res.status(200).json({
      success: true,
      token,
      userId: user.id,
      message: "Signin successful",
    });


  } catch (error) {
     console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})

function generateRoomId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/room",middleware, async (req, res) => {
const userId = req.userId;
 

  const roomId = generateRoomId();

  const { data, error } = await supabase
    .from("Room")
    .insert({
      adminId: userId,
      slug: roomId
    })
    .select()
    .single();

  if (error) {
    console.error("SUPABASE ERROR ", error);
    return res.status(500).json({
      message: "Room creation failed",
      error: error.message
    });
  }
  res.json({
    roomId: data.slug
  });
});

//fixing part is to handle roomId ,as of fnow it is taking interger id of room fro room table
router.get("/chat/room/:slug", middleware, async (req, res) => {
  const { slug } = req.params;

  // 1️⃣ Get room id from slug
  const { data: room, error: roomError } = await supabase
    .from("Room")
    .select("id")
    .eq("slug", slug)
    .single();

  if (roomError || !room) {
    console.log("rooomm id ",slug)
    return res.status(404).json({ message: "Room not found" });
  }

  const { data: messages, error } = await supabase
    .from("Chat")
    .select(`
      id,
      message,
      userId,
      roomId
    `)
    .eq("roomId", room.id)
    .order("id", { ascending: true })
    .limit(50);
    
  if (error) {
    return res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message
    });
  }

  return res.status(200).json({
    roomId: slug,
    messages });
});


export default router;
