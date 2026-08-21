from app.services.pagination import paginate


def test_pagination():
    result = paginate([1,2,3,4,5], page=2, page_size=2)
    assert result['items'] == [3,4]
    assert result['total'] == 5
