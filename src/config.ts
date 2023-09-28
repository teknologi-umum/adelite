import { z } from "zod";

export const applicationConfigSchema = z.object({
  authentication_token: z.array(z.object({
    base_url: z.string(),
    token: z.string()
  })).optional(),
  sources: z.array(z.object({
    url: z.string(),
    provider: z.enum(["github", "gitlab", "gitea", "forgejo", "gogs"] as const).optional()
  })),
  notification: z.object({
    provider: z.enum(["smtp", "telegram", "webhook"]),
    smtp: z.object({
      user: z.string().optional(),
      password: z.string().optional(),
      host: z.string(),
      ssl: z.boolean().default(true),
      from_address: z.string()
    }).optional(),
    telegram: z.object({
      bot_token: z.string(),
      chat_id: z.string()
    }).optional(),
    webhook: z.object({
      url: z.string(),
      skip_tls_verify: z.boolean().default(false)
    })
  })
});