import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from backend/.env
dotenv.config({ path: path.join(process.cwd(), 'backend', '.env') });

import * as backendIndex from "./backend/index.ts";
const expressApp = (backendIndex as any).expressApp || (backendIndex as any).default?.expressApp;
console.log("expressApp is:", !!expressApp);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mount the backend API
  app.use((req, _res, next) => {
    console.log(`[SERVER] ${req.method} ${req.url}`);
    next();
  });
  app.use(expressApp);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
