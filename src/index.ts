import { readFile } from "fs/promises";
import { resolve } from "path";
import { applicationConfigSchema } from "./config";
import type { BaseNotificationProvider } from "./notification/BaseProvider";
import { App, type GitProviderOptions } from "./App";
import type { Repository } from "./schema";
import { GithubAdapter } from "./git/GithubProvider";
import { GitlabProvider } from "./git/GitlabProvider";
import { GiteaProvider } from "./git/GiteaProvider";
import { GogsProvider } from "./git/GogsProvider";
import { ForgejoProvider } from "./git/ForgejoProvider";

const configFile = await readFile(resolve("config", "config.ura"), { encoding: "utf-8" });
const config = applicationConfigSchema.parse(configFile);

const notificationProvider: BaseNotificationProvider = undefined; // TODO: Change this with the proper notification provider based on what's defined on the configuration file.
const sources: Repository[] = []; // TODO: Convert sources from config variable into this variable. Create a function for it!
const gitProviderOptions: GitProviderOptions = {
  githubProvider: new GithubAdapter(), // TODO: Optionally add authentication token for these providers
  gitlabProvider: new GitlabProvider(),
  giteaProvider: new GiteaProvider(),
  gogsProvider: new GogsProvider(),
  forgejoProvider: new ForgejoProvider()
};
const app = new App(sources, notificationProvider, gitProviderOptions);

process.on("SIGINT", () => app.stop());
process.on("SIGTERM", () => app.stop());

app.run();