from flask import Blueprint, render_template, request, jsonify, current_app
import os
from werkzeug.utils import secure_filename
import pandas as pd
import json

# Create blueprint
main_bp = Blueprint('main', __name__)

# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@main_bp.route('/models')
def models():
    return render_template('models.html')

@main_bp.route('/prediction')
def prediction():
    return render_template('prediction.html')

@main_bp.route('/visualization')
def visualization():
    return render_template('visualization.html')

@main_bp.route('/about')
def about():
    return render_template('about.html')

# API Routes
@main_bp.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        file.save(filepath)
        return jsonify({
            'message': 'File uploaded successfully',
            'filename': filename
        })
    
    return jsonify({'error': 'File type not allowed'}), 400

@main_bp.route('/api/data', methods=['GET'])
def get_data():
    # This is a placeholder. In a real app, you would load data from your database or files
    try:
        # Example: Load data from a CSV file
        data_file = os.path.join(current_app.config['RAW_DATA_FOLDER'], 'AAPL_stock_data.csv')
        df = pd.read_csv(data_file)
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500
