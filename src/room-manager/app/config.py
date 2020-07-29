import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = True
    TESTING = False
    SECRET_KEY = "azerty123"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AUTH_TOKEN_EXPIRATION_DAYS = 30
    AUTH_TOKEN_EXPIRATION_SECONDS = 0

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    TESTING = True

class TestingConfig(Config):
    TESTING = True

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    DEBUG = False

app_config = {
    "development": DevelopmentConfig,
    "test": TestingConfig,
    "production": ProductionConfig,
}
