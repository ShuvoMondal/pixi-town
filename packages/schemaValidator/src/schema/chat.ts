import { z } from "zod";

export const sendMessageSchema = z.object({
  message: z.string().min(1).max(1000),
  messageType: z.enum(["text", "system", "emote"]).default("text"),
});

export const getMessagesSchema = z.object({
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type GetMessagesInput = z.infer<typeof getMessagesSchema>;