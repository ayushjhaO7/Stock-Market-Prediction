"""
Model Manager for Stock Market Prediction Website
Integrates all project models: LSTM, ARIMA, SARIMA, Prophet
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os
import pickle
import warnings
warnings.filterwarnings('ignore')

class ModelManager:
    def __init__(self, data_path='apple_data.csv'):
        """Initialize the model manager with all project models"""
        self.data_path = data_path
        self.df = None
        self.models = {}
        self.scalers = {}
        self.model_info = {}
        self.load_data()
        self.load_model_info()
        self.initialize_models()
    
    def load_data(self):
        """Load and prepare the stock data"""
        try:
            self.df = pd.read_csv(self.data_path, parse_dates=['Date'])
            self.df['Date'] = pd.to_datetime(self.df['Date'])
            self.df = self.df.set_index('Date').sort_index()
            print(f"✅ Loaded dataset with {len(self.df)} rows")
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            self.df = pd.DataFrame()
    
    def load_model_info(self):
        """Load model information"""
        try:
            if os.path.exists('model_info.pkl'):
                with open('model_info.pkl', 'rb') as f:
                    self.model_info = pickle.load(f)
                print("✅ Model information loaded")
            else:
                print("⚠️ Model info file not found, using defaults")
                self.model_info = {}
        except Exception as e:
            print(f"❌ Error loading model info: {e}")
            self.model_info = {}
    
    def initialize_models(self):
        """Initialize all project models"""
        print("🤖 Initializing Project Models...")
        
        # Initialize LSTM Model
        self.initialize_lstm_model()
        
        # Initialize ARIMA Model
        self.initialize_arima_model()
        
        # Initialize SARIMA Model
        self.initialize_sarima_model()
        
        # Initialize Prophet Model
        self.initialize_prophet_model()
        
        print(f"✅ Initialized {len(self.models)} models")
    
    def initialize_lstm_model(self):
        """Initialize LSTM model from saved file"""
        try:
            from keras.models import load_model
            from sklearn.preprocessing import MinMaxScaler
            
            # Load the trained LSTM model
            if os.path.exists('lstm_model.h5'):
                self.models['lstm'] = load_model('lstm_model.h5')
                print("✅ LSTM model loaded successfully")
                
                # Load scaler if available
                if os.path.exists('lstm_scaler.pkl'):
                    with open('lstm_scaler.pkl', 'rb') as f:
                        self.scalers['lstm'] = pickle.load(f)
                else:
                    # Create new scaler if not available
                    data = self.df[['Close']].values
                    self.scalers['lstm'] = MinMaxScaler()
                    self.scalers['lstm'].fit(data)
                
                # Prepare recent data for predictions
                data_scaled = self.scalers['lstm'].transform(self.df[['Close']].values)
                self.models['lstm_recent_data'] = data_scaled[-60:]  # 60-day lookback
                
            else:
                print("⚠️ LSTM model file not found")
                
        except Exception as e:
            print(f"❌ Error initializing LSTM model: {e}")
    
    def initialize_arima_model(self):
        """Initialize ARIMA model from saved file"""
        try:
            if os.path.exists('arima_model.pkl'):
                with open('arima_model.pkl', 'rb') as f:
                    self.models['arima'] = pickle.load(f)
                print("✅ ARIMA model loaded successfully")
            else:
                print("⚠️ ARIMA model file not found")
                
        except Exception as e:
            print(f"❌ Error initializing ARIMA model: {e}")
    
    def initialize_sarima_model(self):
        """Initialize SARIMA model from saved file"""
        try:
            if os.path.exists('sarima_model.pkl'):
                with open('sarima_model.pkl', 'rb') as f:
                    self.models['sarima'] = pickle.load(f)
                print("✅ SARIMA model loaded successfully")
            else:
                print("⚠️ SARIMA model file not found")
                
        except Exception as e:
            print(f"❌ Error initializing SARIMA model: {e}")
    
    def initialize_prophet_model(self):
        """Initialize Prophet model from saved file"""
        try:
            if os.path.exists('prophet_model.pkl'):
                with open('prophet_model.pkl', 'rb') as f:
                    self.models['prophet'] = pickle.load(f)
                print("✅ Prophet model loaded successfully")
            else:
                print("⚠️ Prophet model file not found")
                
        except Exception as e:
            print(f"❌ Error initializing Prophet model: {e}")
    
    def predict_lstm(self, days=30):
        """Make LSTM predictions"""
        try:
            if 'lstm' not in self.models or 'lstm_recent_data' not in self.models:
                return None
            
            predictions = []
            current_sequence = self.models['lstm_recent_data'].copy()
            
            for i in range(days):
                # Reshape data for LSTM (batch_size, time_steps, features)
                X_input = current_sequence.reshape(1, 60, 1)
                
                # Make prediction
                pred_scaled = self.models['lstm'].predict(X_input, verbose=0)
                
                # Inverse transform to get actual price
                pred_price = float(self.scalers['lstm'].inverse_transform(pred_scaled)[0][0])
                
                # Add realistic bounds
                last_known_price = self.df['Close'].iloc[-1]
                confidence_factor = max(0.3, 1.0 - (i * 0.02))
                max_change = last_known_price * 0.05 * confidence_factor
                
                min_price = last_known_price - max_change
                max_price = last_known_price + max_change
                pred_price = max(min_price, min(max_price, pred_price))
                pred_price = max(0.01, pred_price)
                
                # Update sequence for next prediction
                current_sequence = np.roll(current_sequence, -1)
                current_sequence[-1] = float(pred_scaled[0][0])
                
                predictions.append(pred_price)
            
            return predictions
            
        except Exception as e:
            print(f"❌ Error in LSTM prediction: {e}")
            return None
    
    def predict_arima(self, days=30):
        """Make ARIMA predictions"""
        try:
            if 'arima' not in self.models:
                return None
            
            # Make predictions
            forecast = self.models['arima'].forecast(steps=days)
            predictions = []
            
            for i, pred_price in enumerate(forecast):
                pred_price = float(pred_price)
                
                # Add realistic bounds
                last_price = self.df['Close'].iloc[-1]
                min_price = last_price * 0.8
                max_price = last_price * 1.5
                pred_price = max(min_price, min(max_price, pred_price))
                pred_price = max(0.01, pred_price)
                
                predictions.append(pred_price)
            
            return predictions
            
        except Exception as e:
            print(f"❌ Error in ARIMA prediction: {e}")
            return None
    
    def predict_sarima(self, days=30):
        """Make SARIMA predictions"""
        try:
            if 'sarima' not in self.models:
                return None
            
            # Make predictions
            forecast = self.models['sarima'].forecast(steps=days)
            predictions = []
            
            for i, pred_price in enumerate(forecast):
                pred_price = float(pred_price)
                
                # Add realistic bounds
                last_price = self.df['Close'].iloc[-1]
                min_price = last_price * 0.8
                max_price = last_price * 1.4
                pred_price = max(min_price, min(max_price, pred_price))
                pred_price = max(0.01, pred_price)
                
                predictions.append(pred_price)
            
            return predictions
            
        except Exception as e:
            print(f"❌ Error in SARIMA prediction: {e}")
            return None
    
    def predict_prophet(self, days=30):
        """Make Prophet predictions"""
        try:
            if 'prophet' not in self.models:
                return None
            
            # Make future dataframe and predictions
            future = self.models['prophet'].make_future_dataframe(periods=days)
            forecast = self.models['prophet'].predict(future)
            
            # Extract predictions for the future dates
            prophet_predictions = forecast['yhat'].tail(days).values
            predictions = []
            
            for i, pred_price in enumerate(prophet_predictions):
                pred_price = float(pred_price)
                
                # Add realistic bounds
                last_price = self.df['Close'].iloc[-1]
                min_price = last_price * 0.8
                max_price = last_price * 1.3
                pred_price = max(min_price, min(max_price, pred_price))
                pred_price = max(0.01, pred_price)
                
                predictions.append(pred_price)
            
            return predictions
            
        except Exception as e:
            print(f"❌ Error in Prophet prediction: {e}")
            return None
    
    def get_predictions(self, model_type, days=30):
        """Get predictions from specified model"""
        if model_type == 'lstm':
            return self.predict_lstm(days)
        elif model_type == 'arima':
            return self.predict_arima(days)
        elif model_type == 'sarima':
            return self.predict_sarima(days)
        elif model_type == 'prophet':
            return self.predict_prophet(days)
        else:
            return None
    
    def get_model_info(self):
        """Get information about available models"""
        model_info = {}
        for model_name in ['lstm', 'arima', 'sarima', 'prophet']:
            # Check if model is actually available
            is_available = model_name in self.models
            
            model_info[model_name] = {
                'available': is_available,
                'name': self.get_model_display_name(model_name),
                'description': self.get_model_description(model_name),
                'accuracy': self.get_model_accuracy(model_name),
                'best_for': self.get_model_best_for(model_name)
            }
        return model_info
    
    def get_model_display_name(self, model_type):
        """Get display name for model"""
        names = {
            'lstm': 'LSTM Neural Network',
            'arima': 'ARIMA Model',
            'sarima': 'SARIMA Model',
            'prophet': 'Prophet Model'
        }
        return names.get(model_type, model_type)
    
    def get_model_description(self, model_type):
        """Get model description"""
        if model_type in self.model_info:
            return self.model_info[model_type].get('description', '')
        return ''
    
    def get_model_accuracy(self, model_type):
        """Get model accuracy"""
        if model_type in self.model_info:
            return self.model_info[model_type].get('accuracy', 'N/A')
        return 'N/A'
    
    def get_model_best_for(self, model_type):
        """Get model best use case"""
        if model_type in self.model_info:
            return self.model_info[model_type].get('best_for', '')
        return ''
    
    def get_current_price(self):
        """Get current stock price"""
        if not self.df.empty:
            return float(self.df['Close'].iloc[-1])
        return 0.0

# Create global model manager instance
model_manager = None

def initialize_model_manager():
    """Initialize the global model manager"""
    global model_manager
    if model_manager is None:
        model_manager = ModelManager()
    return model_manager 