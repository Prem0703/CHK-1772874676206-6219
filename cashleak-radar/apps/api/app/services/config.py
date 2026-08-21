import os

class Settings:
    database_url = os.getenv('DATABASE_URL', 'postgresql+psycopg://cashleak:cashleak_dev@localhost:5432/cashleak')
    redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    ai_provider_api_key = os.getenv('AI_PROVIDER_API_KEY')

settings = Settings()
