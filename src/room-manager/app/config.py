import os

class Config:
    DEBUG = True
    TESTING = False
    SECRET_KEY = "azerty123"
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AUTH_TOKEN_EXPIRATION_DAYS = 30
    AUTH_TOKEN_EXPIRATION_SECONDS = 0


class DevelopmentConfig(Config):
    TESTING = True

class TestingConfig(Config):
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False

app_config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
}
