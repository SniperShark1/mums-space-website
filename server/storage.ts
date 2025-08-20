import { type User, type InsertUser, type NewsletterSignup, type InsertNewsletter, type Review, type InsertReview, type DownloadStats, type InsertDownloadStats, type AdminReply } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addNewsletterSignup(newsletter: InsertNewsletter): Promise<NewsletterSignup>;
  getNewsletterSignups(): Promise<NewsletterSignup[]>;
  getReviews(): Promise<Review[]>;
  addReview(review: InsertReview): Promise<Review>;
  addAdminReply(reviewId: string, adminReply: string): Promise<Review>;
  getDownloadStats(): Promise<DownloadStats[]>;
  updateDownloadStats(platform: string): Promise<DownloadStats>;
  initializeDownloadStats(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletters: Map<string, NewsletterSignup>;
  private reviews: Map<string, Review>;
  private downloadStats: Map<string, DownloadStats>;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
    this.reviews = new Map();
    this.downloadStats = new Map();
    this.initializeDownloadStats();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async addNewsletterSignup(insertNewsletter: InsertNewsletter): Promise<NewsletterSignup> {
    const id = randomUUID();
    const newsletter: NewsletterSignup = { 
      ...insertNewsletter, 
      id, 
      subscribedAt: new Date() 
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSignups(): Promise<NewsletterSignup[]> {
    return Array.from(this.newsletters.values());
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async addReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      verified: insertReview.verified ?? false,
      id,
      createdAt: new Date(),
      adminReply: null,
      adminReplyAt: null
    };
    this.reviews.set(id, review);
    return review;
  }

  async addAdminReply(reviewId: string, adminReply: string): Promise<Review> {
    const review = this.reviews.get(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    
    const updatedReview: Review = {
      ...review,
      adminReply,
      adminReplyAt: new Date()
    };
    
    this.reviews.set(reviewId, updatedReview);
    return updatedReview;
  }

  async getDownloadStats(): Promise<DownloadStats[]> {
    return Array.from(this.downloadStats.values());
  }

  async updateDownloadStats(platform: string): Promise<DownloadStats> {
    const existing = this.downloadStats.get(platform);
    if (existing) {
      existing.downloadCount += 1;
      existing.lastUpdated = new Date();
      this.downloadStats.set(platform, existing);
      return existing;
    } else {
      const stats: DownloadStats = {
        id: randomUUID(),
        platform,
        downloadCount: 1,
        lastUpdated: new Date()
      };
      this.downloadStats.set(platform, stats);
      return stats;
    }
  }

  async initializeDownloadStats(): Promise<void> {
    const platforms = ['iPhone', 'Android', 'PC'];
    for (const platform of platforms) {
      if (!this.downloadStats.has(platform)) {
        this.downloadStats.set(platform, {
          id: randomUUID(),
          platform,
          downloadCount: 0, // Set to zero as requested
          lastUpdated: new Date()
        });
      }
    }

    // Reviews start empty - no demo data
  }
}

export const storage = new MemStorage();
