import type { BaseGitProvider } from "./BaseProvider";
import type { Release } from "~/schema";

export class GogsProvider implements BaseGitProvider {
  getReleases(owner: string, repo: string): Promise<Release[]> {
    // See https://github.com/gogs/docs-api/blob/master/Repositories/Releases.md
    throw new Error("Method not implemented.");
  }

}