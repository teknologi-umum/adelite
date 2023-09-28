import { readFile } from "fs/promises";
import { resolve } from "path";
import { applicationConfigSchema } from "./config";
import type { BaseNotificationProvider } from "./notification/BaseProvider";
import { App } from "./App";
import type { Repository } from "./schema";

const configFile = await readFile(resolve("config", "config.ura"), { encoding: "utf-8" });
const config = applicationConfigSchema.parse(configFile);

const notificationProvider: BaseNotificationProvider = undefined; // TODO!
const sources: Repository[] = []; // TODO: Convert sources from config variable into this variable. Create a function for it!

const app = new App(sources, notificationProvider);

process.on("SIGINT", () => app.stop());
process.on("SIGTERM", () => app.stop());

app.run();