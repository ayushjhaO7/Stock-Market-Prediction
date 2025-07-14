from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os
import sys

# Environment check
def check_environment():
    """Check if running in stockenv environment"""
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️ WARNING: Not running in virtual environment!")
        print("For best results, please activate stockenv:")
        print("  Windows: stockenv\\Scripts\\activate")
        print("  Unix: source stockenv/bin/activate")
    elif 'stockenv' not in sys.prefix:
        print(f"⚠️ WARNING: Running in {os.path.basename(sys.prefix)}, but stockenv is recommended")

# Check environment before importing model_manager
check_environment()

from model_manager import initialize_model_manager

app = Flask(__name__)

# Initialize the model manager
print("🚀 Initializing Model Manager...")
model_manager = initialize_model_manager()
df = model_manager.df if model_manager else pd.DataFrame()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/visualization')
def visualization():
    return render_template('visualization.html')

@app.route('/prediction')
def prediction():
    return render_template('prediction.html')

@app.route('/models')
def models():
    return render_template('models.html')

@app.route('/api/stock-data/<int:days>')
def get_stock_data(days):
    """Get stock data for specified number of days"""
    recent_data = df.tail(days)
    
    data = {
        'dates': recent_data.index.strftime('%Y-%m-%d').tolist(),
        'close': recent_data['Close'].tolist(),
        'volume': recent_data['Volume'].tolist(),
        'high': recent_data['High'].tolist(),
        'low': recent_data['Low'].tolist(),
        'open': recent_data['Open'].tolist()
    }
    
    return jsonify(data)

@app.route('/api/predictions')
def get_predictions():
    """Get model predictions using the model manager"""
    if not model_manager:
        return jsonify({'error': 'Model manager not initialized'}), 500
    
    model_type = request.args.get('model', 'lstm').lower()
    days = int(request.args.get('days', 30))  # Support custom days parameter
    
    last_date = df.index[-1] if not df.empty else datetime.now()
    future_dates = pd.date_range(start=last_date + timedelta(days=1), periods=days, freq='D')
    
    # Get predictions from model manager
    predictions_list = model_manager.get_predictions(model_type, days)
    
    if predictions_list is None:
        # Fallback to simple trend prediction
        last_price = df['Close'].iloc[-1] if not df.empty else 0
        trend = (df['Close'].iloc[-1] - df['Close'].iloc[-30]) / 30 if len(df) >= 30 else 0
        
        predictions = []
        for i, date in enumerate(future_dates):
            pred_price = last_price + (trend * (i + 1))
            pred_price = max(0.01, pred_price)
            predictions.append({
                'date': date.strftime('%Y-%m-%d'),
                'price': round(float(pred_price), 2)
            })
        
        trend = 'up' if trend > 0 else 'down'
    else:
        # Use model manager predictions
        predictions = []
        for i, date in enumerate(future_dates):
            predictions.append({
                'date': date.strftime('%Y-%m-%d'),
                'price': round(float(predictions_list[i]), 2)
            })
        
        # Calculate trend
        if len(predictions) > 1:
            trend = 'up' if predictions[1]['price'] > predictions[0]['price'] else 'down'
        else:
            trend = 'up'
    
    # Get model display name
    model_display_name = model_manager.get_model_display_name(model_type)
    current_price = model_manager.get_current_price()
    
    # Get model accuracy
    model_accuracy = model_manager.get_model_accuracy(model_type)
    return jsonify({
        'predictions': predictions,
        'current_price': round(current_price, 2),
        'trend': trend,
        'model': model_display_name,
        'accuracy': model_accuracy
    })

@app.route('/api/models')
def get_models():
    """Get information about available models"""
    if not model_manager:
        return jsonify({'error': 'Model manager not initialized'}), 500
    
    model_info = model_manager.get_model_info()
    return jsonify(model_info)

@app.route('/api/technical-indicators/<int:days>')
def technical_indicators(days):
    """Calculate and return technical indicators"""
    recent_data = df.tail(days)
    
    # Calculate moving averages
    ma_20 = recent_data['Close'].rolling(window=20).mean()
    ma_50 = recent_data['Close'].rolling(window=50).mean()
    
    data = {
        'dates': recent_data.index.strftime('%Y-%m-%d').tolist(),
        'close': recent_data['Close'].tolist(),
        'ma_20': ma_20.tolist(),
        'ma_50': ma_50.tolist()
    }
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
