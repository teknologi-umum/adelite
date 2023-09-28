import type { BaseGitProvider } from "./BaseProvider";
import type { Release } from "~/schema";

export class GitlabProvider implements BaseGitProvider {
  getReleases(owner: string, repo: string): Promise<Release[]> {
    // See https://docs.gitlab.com/ee/api/releases/#list-releases
    throw new Error("Method not implemented.");
  }

}