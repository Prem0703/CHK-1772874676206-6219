from app.services.rate_limit import SimpleRateLimiter


def test_rate_limit():
    limiter = SimpleRateLimiter(limit=2)
    assert limiter.allow('x') is True
    assert limiter.allow('x') is True
    assert limiter.allow('x') is False
