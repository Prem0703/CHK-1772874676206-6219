from app.services.persistence import persistence_status


def test_persistence_status():
    assert persistence_status('postgres://local').configured is True
    assert persistence_status(None).configured is False
