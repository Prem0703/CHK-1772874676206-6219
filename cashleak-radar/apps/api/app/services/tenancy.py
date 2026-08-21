def assert_tenant_access(resource_org_id: str, actor_org_id: str) -> None:
    if resource_org_id != actor_org_id:
        raise PermissionError('Cross-organization resource access denied')
