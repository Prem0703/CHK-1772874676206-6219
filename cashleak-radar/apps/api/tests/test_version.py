from app.services.version import service_version


def test_service_version():
    assert service_version() == '0.1.0'
