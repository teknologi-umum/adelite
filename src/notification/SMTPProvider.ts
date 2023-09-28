import { SMTPClient } from "emailjs";
import type { BaseNotificationProvider } from "./BaseProvider";
import type { Release } from "~/schema";

export type SMTPConfig = {
  host: string,
  port: number,
  user: string,
  password: string,
  fromAddress: string,
  ssl: boolean
}

export class SMTPProvider implements BaseNotificationProvider {
  private readonly client: SMTPClient;
  constructor(config: SMTPConfig) {
    this.client = new SMTPClient({
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
    });
  }

  notify(releases: Release[], abortSignal?: AbortSignal | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }

}