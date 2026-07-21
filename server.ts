import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API and SEO endpoints
  app.get("/google0fd9aab7e2e42477.html", (req, res) => {
    res.type("text/html").send("google-site-verification: google0fd9aab7e2e42477.html");
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml").sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/llms.txt", (req, res) => {
    res.type("text/plain").sendFile(path.join(process.cwd(), "public", "llms.txt"));
  });

  app.get("/ai.txt", (req, res) => {
    res.type("text/plain").sendFile(path.join(process.cwd(), "public", "ai.txt"));
  });

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
