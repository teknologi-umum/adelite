import os
import time
from datetime import datetime, timedelta
from argparse import ArgumentParser
import sentry_sdk
from github import Github, GitRelease
import toml
from config import Configuration

if __name__ == "__main__":
    parser = ArgumentParser(
        prog="adelite",
        description="Send GitHub repository release notification for the ones you watch",
        epilog="Copyright (c) 2023 Teknologi Umum. MIT Licensed"
    )

    parser.add_argument("-c", "--config")

    args = parser.parse_args()

    if not args.config:
        raise Exception("--config flag is required")

    # Parse configuration files
    raw_config_file = open(args.config, "r")
    raw_configuration = toml.load(raw_config_file.read())
    raw_config_file.close()

    configuration = Configuration(**raw_configuration)

    sentry_sdk.init(
        configuration.sentry_dsn,
        environment=os.environ.get("ENVIRONMENT"),
        sample_rate=1.0,
        traces_sample_rate=0.5,
        attach_stacktrace=True,
    )

    g = Github(auth=configuration.github_auth_token)

    while True:
        accepted_releases: GitRelease = []
        for repository_name in configuration.github_repositories:
            if repository_name == "":
                continue

            # Scrap GitHub that has release within range
            repository = g.get_repo(repository_name)

            releases = repository.get_releases()
            for release in releases:
                if release.created_at >= datetime.utcnow() - timedelta(seconds=configuration.poll_interval_second):
                    # Append to list of release
                    accepted_releases.append(release)

            # Move this to the notification providers
            print(accepted_releases)

        # Sleep for defined poll interval
        time.sleep(configuration.poll_interval_second)
