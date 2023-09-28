import type { BaseNotificationProvider } from "./BaseProvider";
import type { Release } from "~/schema";

export class WebhookProvider implements BaseNotificationProvider {
  notify(releases: Release[], abortSignal?: AbortSignal | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }

}