import type { BaseGitProvider } from "./BaseProvider";
import type { Release } from "~/schema";

export class ForgejoProvider implements BaseGitProvider {
  getReleases(owner: string, repo: string): Promise<Release[]> {
    // See https://codeberg.org/api/swagger#/repository/repoListReleases
    // Also see https://forgejo.org/docs/latest/user/api-usage/#authentication
    throw new Error("Method not implemented.");
  }
}