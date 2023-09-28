import type { Release } from "~/schema";

export interface BaseNotificationProvider {
  notify(releases: Release[], abortSignal?: AbortSignal): Promise<void>
}