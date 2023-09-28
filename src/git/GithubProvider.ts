import {type BaseGitProvider} from "~/git/BaseProvider";
import type { Release } from "~/schema";

export class GithubAdapter implements BaseGitProvider {
  public getReleases(owner: string, repo: string): Promise<Release[]> {
    // See https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases
    throw new Error("unimplemented");
  }
}