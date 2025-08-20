import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema, insertReviewSchema, adminReplySchema } from "@shared/schema";

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(ip);
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (clientData.count >= maxRequests) {
    return false;
  }
  
  clientData.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter signup endpoint with rate limiting
  app.post("/api/newsletter/signup", async (req, res) => {
    // Basic rate limiting
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    if (!rateLimit(clientIp, 3, 15 * 60 * 1000)) { // 3 requests per 15 minutes
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists in local storage
      const existingSignups = await storage.getNewsletterSignups();
      const emailExists = existingSignups.some(signup => signup.email === validatedData.email);
      
      if (emailExists) {
        return res.status(400).json({ error: "Email already subscribed" });
      }

      // Add to Mailchimp
      const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
      const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

      if (!mailchimpApiKey || !mailchimpListId || !mailchimpServerPrefix) {
        console.error("Missing Mailchimp configuration");
        return res.status(500).json({ error: "Newsletter service not configured" });
      }

      // Add subscriber to Mailchimp
      const mailchimpUrl = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`;
      
      const mailchimpResponse = await fetch(mailchimpUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${mailchimpApiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: validatedData.email,
          status: 'subscribed',
          merge_fields: {}
        }),
      });

      if (!mailchimpResponse.ok) {
        const mailchimpError = await mailchimpResponse.json();
        console.error("Mailchimp error:", mailchimpError);
        
        // Check if it's a duplicate email error
        if (mailchimpError.title === "Member Exists") {
          return res.status(400).json({ error: "Email already subscribed" });
        }
        
        return res.status(500).json({ error: "Failed to subscribe to newsletter" });
      }

      // Store locally as backup
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
