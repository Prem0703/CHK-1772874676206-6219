from app.services.approval import approve


def test_approval_requires_actor():
    decision = approve('action-1', 'owner-1', 'Reviewed evidence')
    assert decision.approved is True
    assert decision.actor_id == 'owner-1'
