import { setTimeout } from "timers";
import type { BaseGitProvider } from "./git/BaseProvider";
import type { BaseNotificationProvider } from "./notification/BaseProvider";
import { GitProvider, type Release, type Repository } from "./schema";

export type GitProviderOptions = {
  githubProvider: BaseGitProvider,
  gitlabProvider: BaseGitProvider,
  giteaProvider: BaseGitProvider,
  gogsProvider: BaseGitProvider,
  forgejoProvider: BaseGitProvider
}

const SECOND = 1000; // in milliseconds
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export class App {
  constructor(
    private readonly sources: Repository[], 
    private readonly notification: BaseNotificationProvider,
    private readonly gitProvider: GitProviderOptions
  ) {
    if (sources.length === 0) throw new Error("No repository to monitor");
  }

  public async run(): Promise<void> {
    for (;;) {
      /**
       * The idea was taken from https://stackoverflow.com/a/61358589/3153224
       * to hold the Node's V8 event loop to not continue to the next line.
       *
       * The crawler function must run with await to make the while loop executes,
       * so the async crawler function will be running as a microtask. Try to remove
       * the "await" keyword, and the following `.then()`, `.catch()`, and `.finally()`
       * will never be executed.
       *
       * The `while (!done)` block waits until `done` value is true, hence blocking
       * the event loop for current task infinitely. That's what we want right now.
       *
       * On the sleep function at the end of the task, it should be run with an await,
       * because the setTimeout will block due to there are no longer anything that
       * depends on the task (on current event loop thread).
       *
       * Further readings:
       * - https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick
       * - https://www.freecodecamp.org/news/nodejs-eventloop-tutorial/
       * - https://nodejs.org/en/docs/guides/dont-block-the-event-loop
       * - https://nodejs.org/en/docs/guides/blocking-vs-non-blocking
       * - https://stackoverflow.com/a/67810384/3153224
       */
      let done = false;

      // eslint-disable-next-line no-await-in-loop
      await this.doTask()
        .finally(() => {
          done = true;
        });

      while (!done) {
        // wait
      }

      // eslint-disable-next-line no-await-in-loop
      await this.sleep(24 * HOUR);
    }
  }

  public stop(): Promise<void> {
    // TODO: Do something
    return Promise.resolve();
  }

  private sleep(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }

  private async doTask(): Promise<void> {
    // Create new AbortController instance
    const abortController = new AbortController();
    // Set a timeout of 6 hours. This is long enough to wait until everything is failing.
    // It shouldn't exceeds 6 hours though.
    setTimeout(() => abortController.abort(), 6 * HOUR);

    const releaseTasks: Promise<Release[]>[] = [];
    for (const source of this.sources) {
      switch (source.provider) {
        case GitProvider.GitHub: {
          releaseTasks.push(this.gitProvider.githubProvider.getReleases(source.owner, source.repo));
          break;
        }
        case GitProvider.GitLab: {
          releaseTasks.push(this.gitProvider.gitlabProvider.getReleases(source.owner, source.repo));
          break;
        }
        case GitProvider.Gitea: {
          releaseTasks.push(this.gitProvider.giteaProvider.getReleases(source.owner, source.repo));
          break;
        }
        case GitProvider.Gogs: {
          releaseTasks.push(this.gitProvider.gogsProvider.getReleases(source.owner, source.repo));
          break;
        }
        case GitProvider.Forgejo: {
          releaseTasks.push(this.gitProvider.forgejoProvider.getReleases(source.owner, source.repo));
          break;
        }
        default:
          continue;
      }
    }

    const allReleases: Release[][] = await Promise.all(releaseTasks);

    // Only grab the latest release from each repository
    const release: Release[] = [];
    for (const repositoryRelease of allReleases) {
      // Do not continue processing if the length of each repository release is empty.
      if (repositoryRelease.length === 0) {
        continue;
      }

      let presumedLatestRelease: Release = repositoryRelease[0] ?? {} as Release;
      let presumedLatestReleaseDate: Date = new Date(0); // Set to 1970-ish
      for (const release of repositoryRelease) {
        if (release.releasedAt > presumedLatestReleaseDate) {
          presumedLatestReleaseDate = release.releasedAt;
          presumedLatestRelease = release;
        }
      }

      release.push(presumedLatestRelease);
    }

    // Send notification
    await this.notification.notify(release, abortController.signal);
  }
}