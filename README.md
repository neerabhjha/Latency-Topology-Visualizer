# 🌍 Latency Topology Visualizer

A real-time interactive dashboard that visualizes network latency between the user, global cloud regions, and exchange servers — built as part of the **GoQuant Front-End Application** assignment.

🔗 **Live Demo:** [latency-topology-visualizer-beige.vercel.app](https://latency-topology-visualizer-beige.vercel.app)

---

## 🚀 Overview

The application displays live and historical latency data across cloud providers (GCP, AWS, Azure) on a 3D globe.

- Real-time latency measurements (client → region)
- Animated exchange ↔ cloud connections
- Interactive 3D globe with color-coded latency arcs
- Filtering by provider, exchange, search, or latency range
- Realtime & historical trend panels
- System status & performance metrics

---

## 🧩 Tech Stack & Libraries Used

| Category | Library / Tool | Purpose |
|-----------|----------------|----------|
| Framework | **Next.js 14 (App Router)** | React-based full-stack framework |
| UI Styling | **Tailwind CSS** | Responsive styling & dark mode |
| State Management | **Redux Toolkit** | Manage latency + UI state |
| 3D Globe | **react-globe.gl** (Three.js) | Render globe & animated arcs |
| Charts | **Recharts** | Historical latency graphs |
| Theming | **next-themes** | System/light/dark theme support |
| Deployment | **Vercel** | Hosting & CI/CD |
| Data fetching | Native **fetch API** | Calls `/api/gcping` proxy route |

---

## ⚙️ How It Works

1. The frontend fetches a list of region endpoints from `/api/gcping` (proxied through Next.js to avoid CORS).
2. Each endpoint is pinged using `<img>` requests to measure **round-trip latency**.
3. Results are stored in **Redux**, updating:
   - The globe arcs (color-coded latency)
   - The realtime table
   - The historical chart
4. Filters (provider, range, search, layers) dynamically change the visualization.
5. The app re-measures latency every few seconds for continuous updates.

---

## 💡 Assumptions

- The region list is sourced from Google Cloud's public latency endpoints (`.a.run.app` instances).  
  These lightweight endpoints respond fast and don’t require credentials.
- Latency values are measured **from the user’s browser**, not the server — ensuring real RTT representation.
- Exchange → cloud region latencies are **estimated** using geodesic distance (Haversine formula).
- Cloudflare Radar API may optionally be used to enrich global average latency context.
- Project is optimized for desktop viewports (≥ 1280px); mobile support is minimal.

---

## 🧠 Features Summary

- 🌐 Interactive 3D globe with real-time animated latency arcs  
- 🧭 Control panel for filtering providers, exchanges, and latency range  
- 🔍 Search function for quick lookup  
- ⚡ Realtime and historical latency panels  
- 📊 System metrics: average latency, FPS, node count, last update  
- 💫 Smooth UI animations and responsive layout  

---

## 🛠️ Setup & Run Locally

```bash
# Clone repo
git clone https://github.com/neerabhjha/Latency-Topology-Visualizer.git
cd latency-topology-visualizer

# Install dependencies
npm install

# Run locally
npm run dev
