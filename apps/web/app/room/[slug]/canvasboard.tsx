"use client"
import { Butoom } from "@repo/ui/button"
import { redirect } from "next/dist/server/api-utils"
import { useEffect, useRef, useState } from "react"
import { usesocket } from "../../../hook/usesocket"


export default function CanvasBoard({roomId,socket}:{roomId : string, socket: WebSocket | null}) {
    const [tool,settool ]= useState("rectangle")
    const canvasref = useRef<HTMLCanvasElement>(null)


 //reactangle useeffect
 //canvas useeffect
useEffect(() => {
  if (!canvasref.current) return
  
  const canvas = canvasref.current
  const ctx = canvas.getContext("2d")//drawing engine.

  let snapshot: ImageData | null = null
  let click = false
  let startx = 0
  let starty = 0

  const handleMouseDown = (e: MouseEvent) => {
    click = true

    const rect = canvas.getBoundingClientRect()
    startx = e.clientX - rect.left
    starty = e.clientY - rect.top

    if (tool !== "draw") {
      snapshot = ctx?.getImageData(0, 0, canvas.width, canvas.height) || null
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    click = false
        const rect = canvas.getBoundingClientRect()
     const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
      const width = mouseX - startx
      const height = mouseY - starty
    
        if(socket && tool === "rectangle"){
        socket.send(JSON.stringify({
          type:"rectangle",
          roomId,
          startx,
          starty,
          width,
          height
       }))
     }
        if(socket && tool === "circle"){
        socket.send(JSON.stringify({
          type:"circle",
          roomId,
          startx,
          starty,
          width,
          height
        }))
      }

        if(socket && tool === "arrow"){
        socket.send(JSON.stringify({
          type:"arrow",
          roomId,
          startx,
          starty,
          mouseX,
          mouseY
        }))
      }

  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (tool === "rectangle" && click) {
      const width = mouseX - startx
      const height = mouseY - starty

      if (snapshot) ctx.putImageData(snapshot, 0, 0)

      ctx.strokeRect(startx, starty, width, height)
    }

    if (tool === "circle" && click) {
      const width = mouseX - startx
      const height = mouseY - starty
      const radius = Math.sqrt(width * width + height * height)

      if (snapshot) ctx.putImageData(snapshot, 0, 0)

      ctx.beginPath()
      ctx.arc(startx, starty, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    if (tool === "arrow" && click) {
      if (snapshot) ctx.putImageData(snapshot, 0, 0)

      ctx.beginPath()
      ctx.moveTo(startx, starty)
      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()  
    }

    if (tool === "draw" && click) {
      ctx.lineWidth = 2
      ctx.strokeStyle = "black"
      ctx.lineCap = "round"

      ctx.beginPath()
      ctx.moveTo(startx, starty)
      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()
      //sending data through socket in the backend with type "draw"
    if(socket){
      socket.send(JSON.stringify({
       type:"draw",
       roomId,
       startx,
       starty,
       mouseX,
       mouseY
       }))
      }
       startx = mouseX
       starty = mouseY
    }
  }

  canvas.addEventListener("mousedown", handleMouseDown)
  canvas.addEventListener("mouseup", handleMouseUp)
  canvas.addEventListener("mousemove", handleMouseMove)

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown)
    canvas.removeEventListener("mouseup", handleMouseUp)
    canvas.removeEventListener("mousemove", handleMouseMove)
  }
}, [tool,roomId])
 
useEffect(() => {
  if (!socket || !canvasref.current) return

  const canvas = canvasref.current
  const ctx = canvas.getContext("2d")

  const handler = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    if (
  data.type !== "draw" &&
  data.type !== "rectangle" &&
  data.type !== "circle" &&
  data.type !== "arrow"
) return

    if (!ctx) return

    if (data.type === "draw") {
      ctx.beginPath()
      ctx.moveTo(data.startx, data.starty)
      ctx.lineTo(data.mouseX, data.mouseY)
      ctx.stroke()
    }

    if (data.type === "rectangle") {
      ctx.strokeRect(data.startx, data.starty, data.width, data.height)
    }

    if (data.type === "circle") {
      const radius = Math.sqrt(data.width * data.width + data.height * data.height)
      ctx.beginPath()
      ctx.arc(data.startx, data.starty, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    if (data.type === "arrow") {
      ctx.beginPath()
      ctx.moveTo(data.startx, data.starty)
      ctx.lineTo(data.mouseX, data.mouseY)
      ctx.stroke()
    }
  }

  socket.addEventListener("message", handler)

  return () => socket.removeEventListener("message", handler)

}, [socket])



//circle useeffect
  return (
    <div style={{backgroundColor:"black",}}>
      <p>Your room Id is {roomId}</p>
      <button onClick={()=>{ settool("rectangle") }} >rectangle</button>
      <button onClick={()=>{ settool("circle")}} >circle</button>
      <button onClick={()=>{  settool("arrow") }} >arrow</button>
      <button onClick={()=> { settool("draw")}} >Draw</button>
      <canvas style={{backgroundColor:"white", color:"white"}} ref={canvasref} height={1000} width={1800}></canvas>
    </div>
  )
}