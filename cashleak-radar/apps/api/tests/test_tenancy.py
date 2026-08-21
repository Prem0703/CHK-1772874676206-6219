import pytest

from app.services.tenancy import assert_tenant_access


def test_tenant_access_allows_same_org():
    assert_tenant_access('org-1', 'org-1') is None


def test_tenant_access_blocks_cross_org():
    with pytest.raises(PermissionError):
        assert_tenant_access('org-1', 'org-2')
