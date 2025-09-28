import os
from dotenv import load_dotenv

# Load environment variables from .env file
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-please-change-in-production'
    
    # Database settings
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # File upload settings
    UPLOAD_FOLDER = os.path.join(basedir, 'data/uploaded_files')
    ALLOWED_EXTENSIONS = {'csv', 'xlsx'}
    
    # Model paths
    MODEL_FOLDER = os.path.join(basedir, 'models')
    
    # Data paths
    DATA_FOLDER = os.path.join(basedir, 'data')
    RAW_DATA_FOLDER = os.path.join(DATA_FOLDER, 'raw')
    PROCESSED_DATA_FOLDER = os.path.join(DATA_FOLDER, 'processed')

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

class ProductionConfig(Config):
    pass

# Default configuration
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
