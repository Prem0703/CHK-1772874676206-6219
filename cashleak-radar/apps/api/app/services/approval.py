from dataclasses import dataclass

@dataclass(frozen=True)
class ApprovalDecision:
    action_id: str
    approved: bool
    actor_id: str
    note: str = ''


def approve(action_id: str, actor_id: str, note: str = '') -> ApprovalDecision:
    if not action_id or not actor_id:
        raise ValueError('action_id and actor_id are required')
    return ApprovalDecision(action_id, True, actor_id, note)
