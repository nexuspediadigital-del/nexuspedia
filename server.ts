import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/admission", (req, res) => {
    const { studentName, parentName, email, phone, grade } = req.body;
    console.log("New Admission Request:", { studentName, parentName, email, phone, grade });
    
    // In a real app, you'd save this to a database
    res.json({ 
      success: true, 
      message: `Admission request for ${studentName} received successfully! We will contact you at ${email}.` 
    });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("New Contact Message:", { name, email, message });
    
    // In a real app, you'd save this to a database or send an email
    res.json({ 
      success: true, 
      message: `Thank you, ${name}! Your message has been received. We'll get back to you at ${email} shortly.` 
    });
  });

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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
