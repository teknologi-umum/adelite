from pydantic import BaseModel


class Configuration(BaseModel):
    debug: bool = False
    sentry_dsn: str | None
    poll_interval_second: int = 60 * 60 * 24  # 1 day
    github_auth_token: str | None
    github_repositories: list[str]
    notification_provider: str
