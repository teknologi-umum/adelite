import type { BaseNotificationProvider } from "./notification/BaseProvider";
import type { Repository } from "./schema";

export class App {
  constructor(private readonly sources: Repository[], private readonly notification: BaseNotificationProvider) {
    // TODO: validate payload
  }

  public run(): Promise<void> {
    // TODO
    throw new Error("unimplemented");
  }

  public stop(): Promise<void> {
    // TODO
    throw new Error("unimplemented");
  }
}