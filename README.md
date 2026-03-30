 SyncDraw — Real-Time Collaborative Whiteboard
<img width="1901" height="868" alt="{C6A122FE-FA6B-45A2-B496-B199921A8EB3}" src="https://github.com/user-attachments/assets/b94fe5a7-c82e-4c3d-a98d-5045759704a3" />
A modern, real-time collaborative whiteboard with live chat, built using a scalable Turborepo architecture.
Designed for seamless multi-user interaction with instant updates powered by WebSockets.

✨ Features
🧑‍🤝‍🧑 Real-time multi-user collaboration
💬 Live chat system inside rooms
🏠 Room-based session management
🎨 Interactive whiteboard (draw, shapes, arrows)
🔐 Authentication (Sign up / Sign in)
⚡ Instant updates via WebSockets
🧩 Monorepo architecture using Turborepo
🚀 Production deployment ready
🏗️ Architecture

<img width="1643" height="869" alt="{E5DEBB94-99F2-4763-B572-4CB658999E9A}" src="https://github.com/user-attachments/assets/aa4b88a0-a1a1-4cb7-96ff-dadc867d5e95" />

This project follows a modular Turborepo structure:

apps/
  web            → Frontend (React)
  http-backend   → REST API (Auth, Rooms)
  ws-backend     → WebSocket server (Real-time)

packages/
  db             → Database layer
  ui             → Shared UI components
  eslint-config  → Shared lint config
  typescript-config → Shared TS config
 How it works
Frontend (web) handles UI and user interactions
HTTP Backend manages:
Authentication
Room creation
WebSocket Backend handles:
Real-time drawing sync
Chat messages
All services are connected and run together using pnpm + turborepo
🛠️ Tech Stack
Frontend: React, TypeScript
Backend: Node.js
WebSockets: ws / socket-based communication
Monorepo: Turborepo
Package Manager: pnpm
Database: (add yours e.g. PostgreSQL / MongoDB)
Deployment: Vercel (Frontend)
⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/your-username/syncdraw.git
cd syncdraw
2️⃣ Install dependencies
pnpm install
3️⃣ Setup environment variables

Create .env files in:

apps/http-backend
apps/ws-backend
packages/db (if needed)

Example:

DATABASE_URL=
JWT_SECRET=
PORT=
4️⃣ Run the project
pnpm dev

This will start all apps concurrently via Turborepo.

🌐 Live Demo
 https://sync-draw-web.vercel.app

Whiteboard UI
Chat system
Room joining
Drawing sync
🧩 Key Highlights (for recruiters)
Built a real-time system using WebSockets (not polling)
Designed a scalable monorepo architecture
Implemented multi-service communication (frontend + 2 backends)
Focused on low-latency synchronization
Clean separation of concerns across services
🚀 Future Improvements
🎥 Voice / video collaboration
🧠 AI drawing suggestions
📁 Save & load boards
👥 User presence indicators
📱 Mobile responsiveness
🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

<img width="1916" height="877" alt="{71454471-FD41-4D4B-8CDB-AD228E8F9F25}" src="https://github.com/user-attachments/assets/b0b2a104-082b-4962-ac16-1fa9a09504b7" />



