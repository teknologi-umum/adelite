export enum GitProvider {
  Unspecified,
  GitHub,
  GitLab,
  Gitea,
  Forgejo,
  Gogs
}

export type Asset = {
  size?: number,
  url: string
}


export type Release = {
  tag: string,
  title: string,
  description: string,
  targetBranch: string,
  createdAt: Date,
  releasedAt: Date,
  author: {
    id: number,
    fullName: string,
    username: string,
    avatarUrl: string,
    htmlUrl: string,
  },
  url: string,
  tarballUrl?: string,
  assets?: Asset[]
}

export type Repository = {
  url: string,
  owner: string,
  repo: string,
  provider: GitProvider
}