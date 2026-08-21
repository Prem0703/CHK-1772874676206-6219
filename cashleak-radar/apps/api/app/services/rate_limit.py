from time import monotonic

class SimpleRateLimiter:
    def __init__(self, limit: int = 60, window_seconds: int = 60):
        self.limit = limit
        self.window_seconds = window_seconds
        self.events: dict[str, list[float]] = {}

    def allow(self, key: str) -> bool:
        now = monotonic()
        events = [t for t in self.events.get(key, []) if now - t < self.window_seconds]
        if len(events) >= self.limit:
            self.events[key] = events
            return False
        events.append(now)
        self.events[key] = events
        return True
