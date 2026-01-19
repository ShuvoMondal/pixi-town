import { z } from "zod";

export const createSpaceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  maxCapacity: z.number().int().min(1).max(500).default(50),
  isPublic: z.boolean().default(true),
  backgroundMusicUrl: z.string().url().optional(),
  mapData: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    tilesetUrl: z.string().url(),
    layers: z.array(z.any()),
  }).optional(),
});

export const updateSpaceSchema = createSpaceSchema.partial();

export const joinSpaceSchema = z.object({
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export const createSpaceObjectSchema = z.object({
  type: z.enum(["portal", "whiteboard", "embed", "private_area"]),
  positionX: z.number().int(),
  positionY: z.number().int(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  properties: z.record(z.string(), z.any()).optional(),
});

export const updateSpaceObjectSchema = createSpaceObjectSchema.partial();

export type CreateSpaceObjectInput = z.infer<typeof createSpaceObjectSchema>;
export type UpdateSpaceObjectInput = z.infer<typeof updateSpaceObjectSchema>;

export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;
export type UpdateSpaceInput = z.infer<typeof updateSpaceSchema>;
export type JoinSpaceInput = z.infer<typeof joinSpaceSchema>;