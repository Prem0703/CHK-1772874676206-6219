from datetime import datetime, timezone
from dataclasses import dataclass
from typing import Any

@dataclass(frozen=True)
class AuditEvent:
    action: str
    entity_type: str
    entity_id: str
    actor_id: str
    metadata: dict[str, Any]
    timestamp: datetime


def make_audit_event(action: str, entity_type: str, entity_id: str, actor_id: str, metadata: dict[str, Any] | None = None) -> AuditEvent:
    return AuditEvent(action, entity_type, entity_id, actor_id, metadata or {}, datetime.now(timezone.utc))
