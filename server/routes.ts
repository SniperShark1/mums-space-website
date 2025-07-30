import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter signup endpoint
  app.post("/api/newsletter/signup", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignups = await storage.getNewsletterSignups();
      const emailExists = existingSignups.some(signup => signup.email === validatedData.email);
      
      if (emailExists) {
        return res.status(400).json({ error: "Email already subscribed" });
      }

      const newsletterSignup = await storage.addNewsletterSignup(validatedData);
      res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(400).json({ error: "Invalid email address" });
    }
  });

  // Get all newsletter signups (for admin purposes)
  app.get("/api/newsletter/signups", async (req, res) => {
    try {
      const signups = await storage.getNewsletterSignups();
      res.json(signups);
    } catch (error) {
      console.error("Get newsletter signups error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
