import { type User, type InsertUser, type NewsletterSignup, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addNewsletterSignup(newsletter: InsertNewsletter): Promise<NewsletterSignup>;
  getNewsletterSignups(): Promise<NewsletterSignup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletters: Map<string, NewsletterSignup>;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
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
}

export const storage = new MemStorage();
