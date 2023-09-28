import type { BaseGitProvider } from "./BaseProvider";
import type { Release } from "~/schema";

export class GiteaProvider implements BaseGitProvider {
  getReleases(owner: string, repo: string): Promise<Release[]> {
    // See https://docs.gitea.com/api/1.20/#tag/repository/operation/repoListReleases
    throw new Error("Method not implemented.");
  }

}