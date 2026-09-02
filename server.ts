import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API handler for quote/contact form (/sendmail.php)
  app.post("/sendmail.php", (req, res) => {
    const { name, phone } = req.body || {};
    if (!name || !phone) {
      return res.status(200).json({
        ok: false,
        error: "กรุณากรอกชื่อและเบอร์โทรศัพท์ (Name and Phone number are required)"
      });
    }
    console.log("[THERMO Server] Received quote request:", req.body);
    return res.json({ ok: true });
  });

  // API handler for job application (/sendresume.php)
  app.post("/sendresume.php", (req, res) => {
    console.log("[THERMO Server] Received application submission");
    return res.json({ ok: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: "0.0.0.0",
        port: PORT,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
