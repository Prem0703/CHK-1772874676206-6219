from fastapi import APIRouter

from app.services.demo import demo_analysis

router = APIRouter(prefix='/api')

@router.get('/demo/analyze')
def demo():
    return demo_analysis()
