import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const newsletterSignups = pgTable("newsletter_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userName: text("user_name").notNull(),
  rating: integer("rating").notNull(),
  reviewText: text("review_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  verified: boolean("verified").default(false).notNull(),
  adminReply: text("admin_reply"),
  adminReplyAt: timestamp("admin_reply_at"),
});

export const downloadStats = pgTable("download_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: varchar("platform", { length: 50 }).notNull(),
  downloadCount: integer("download_count").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const appFiles = pgTable("app_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: varchar("platform", { length: 50 }).notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  version: text("version").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletterSignups).pick({
  email: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userName: true,
  rating: true,
  reviewText: true,
  verified: true,
});

export const adminReplySchema = z.object({
  reviewId: z.string(),
  adminReply: z.string().min(1, "Reply cannot be empty"),
});

export const insertDownloadStatsSchema = createInsertSchema(downloadStats).pick({
  platform: true,
  downloadCount: true,
});

export const insertAppFileSchema = createInsertSchema(appFiles).pick({
  platform: true,
  fileName: true,
  filePath: true,
  version: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSignup = typeof newsletterSignups.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type AdminReply = z.infer<typeof adminReplySchema>;
export type InsertDownloadStats = z.infer<typeof insertDownloadStatsSchema>;
export type DownloadStats = typeof downloadStats.$inferSelect;
export type InsertAppFile = z.infer<typeof insertAppFileSchema>;
export type AppFile = typeof appFiles.$inferSelect;
