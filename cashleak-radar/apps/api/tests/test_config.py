from app.services.config import settings


def test_config_has_local_defaults():
    assert settings.database_url
    assert settings.redis_url
