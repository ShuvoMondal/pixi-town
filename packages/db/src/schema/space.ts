import { pgTable, uuid, varchar, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const spaces = pgTable("spaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: text("owner_id").references(() => user.id).notNull(),
  description: text("description"),
  maxCapacity: integer("max_capacity").default(10),
  isPublic: boolean("is_public").default(true),
  mapData: jsonb("map_data"), // Stores tilemap configuration
  backgroundMusicUrl: varchar("background_music_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const spaceObjects = pgTable("space_objects", {
  id: uuid("id").defaultRandom().primaryKey(),
  spaceId: uuid("space_id").references(() => spaces.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'portal', 'whiteboard', 'embed', 'private_area'
  positionX: integer("position_x").notNull(),
  positionY: integer("position_y").notNull(),
  width: integer("width"),
  height: integer("height"),
  properties: jsonb("properties"), // Type-specific configuration
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const spaceMembers = pgTable("space_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  spaceId: uuid("space_id").references(() => spaces.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  role: varchar("role", { length: 50 }).default("member").notNull(), // 'owner', 'admin', 'member'
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});



export type SpaceMember = typeof spaceMembers.$inferSelect;
export type NewSpaceMember = typeof spaceMembers.$inferInsert;

export type SpaceObject = typeof spaceObjects.$inferSelect;
export type NewSpaceObject = typeof spaceObjects.$inferInsert;

export type Space = typeof spaces.$inferSelect;
export type NewSpace = typeof spaces.$inferInsert;
