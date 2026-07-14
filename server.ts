import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API routes
  app.get("/api/admin-status", (req, res) => {
    res.json({
      isPasscodeDefault: !process.env.ADMIN_PASSCODE
    });
  });

  app.post("/api/verify-passcode", (req, res) => {
    const { passcode } = req.body;
    const correctPasscode = process.env.ADMIN_PASSCODE || "admin123";
    
    if (!process.env.ADMIN_PASSCODE) {
      console.warn("⚠️ Warning: ADMIN_PASSCODE environment variable is not defined. Defaulting to 'admin123'.");
    }

    if (passcode === correctPasscode) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Incorrect passcode" });
    }
  });

  // Check if server is running in production or development
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static file serving for production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT} [${isProd ? "PRODUCTION" : "DEVELOPMENT"}]`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
