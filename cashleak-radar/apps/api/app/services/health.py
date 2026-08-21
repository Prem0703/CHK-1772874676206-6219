from datetime import datetime, timezone


def service_status() -> dict:
    return {
        'status': 'ok',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'components': {
            'api': 'ok',
            'reconciliation': 'ok',
            'ai': 'provider-not-configured',
        },
    }
