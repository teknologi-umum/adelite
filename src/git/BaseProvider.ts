import {type Release} from "~/schema";

export interface BaseGitProvider {
  getReleases(owner: string, repo: string): Promise<Release[]>
}