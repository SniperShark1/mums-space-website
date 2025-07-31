import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema, insertReviewSchema, adminReplySchema } from "@shared/schema";

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

  // Reviews endpoints
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Get reviews error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.addReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Add review error:", error);
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Admin reply to review endpoint
  app.post("/api/reviews/reply", async (req, res) => {
    try {
      const validatedData = adminReplySchema.parse(req.body);
      const updatedReview = await storage.addAdminReply(validatedData.reviewId, validatedData.adminReply);
      res.json(updatedReview);
    } catch (error) {
      console.error("Add admin reply error:", error);
      res.status(400).json({ error: "Invalid reply data" });
    }
  });

  // Download stats endpoints
  app.get("/api/download-stats", async (req, res) => {
    try {
      const stats = await storage.getDownloadStats();
      res.json(stats);
    } catch (error) {
      console.error("Get download stats error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/download/:platform", async (req, res) => {
    try {
      const { platform } = req.params;
      const stats = await storage.updateDownloadStats(platform);
      res.json(stats);
    } catch (error) {
      console.error("Update download stats error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
