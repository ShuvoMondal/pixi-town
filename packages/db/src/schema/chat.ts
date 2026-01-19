import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { spaces } from "./space";
import { user } from "./auth";

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  spaceId: uuid("space_id").references(() => spaces.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id),
  message: text("message").notNull(),
  messageType: varchar("message_type", { length: 50 }).default("text").notNull(), // 'text', 'system', 'emote'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = typeof chatMessages.$inferInsert;