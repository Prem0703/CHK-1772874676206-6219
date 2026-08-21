from dataclasses import dataclass

@dataclass(frozen=True)
class PersistenceStatus:
    provider: str
    configured: bool


def persistence_status(database_url: str | None) -> PersistenceStatus:
    return PersistenceStatus(provider='postgresql', configured=bool(database_url))
