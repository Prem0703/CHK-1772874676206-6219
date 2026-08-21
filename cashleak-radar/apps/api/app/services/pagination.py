from typing import Sequence, TypeVar

T = TypeVar('T')


def paginate(items: Sequence[T], page: int = 1, page_size: int = 25) -> dict:
    page = max(page, 1)
    page_size = min(max(page_size, 1), 100)
    start = (page - 1) * page_size
    return {'items': list(items[start:start + page_size]), 'page': page, 'page_size': page_size, 'total': len(items)}
