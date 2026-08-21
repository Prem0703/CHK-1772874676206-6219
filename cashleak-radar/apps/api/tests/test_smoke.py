from app.services.smoke import smoke


def test_smoke():
    assert smoke()['status'] == 'ok'
