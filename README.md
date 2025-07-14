# Stock Market Prediction

## Overview
This project is an AI-powered web application for stock market price forecasting and analysis. It leverages multiple machine learning models (LSTM, ARIMA, SARIMA, Prophet) to predict future stock prices and visualize trends, providing users with actionable insights.

## Features
- **Interactive Dashboard:** Visualize historical and predicted stock prices.
- **Multiple AI Models:** Choose from LSTM, ARIMA, SARIMA, and Prophet for predictions.
- **Model Comparison:** View and compare model accuracy and performance.
- **Custom Predictions:** Select custom time periods for price forecasts.
- **Responsive UI:** Modern, mobile-friendly design with Bootstrap 5.

## Project Structure
```
Stock-Market-Prediction/
├── app.py                  # Flask backend
├── model_manager.py        # Model management and prediction logic
├── templates/              # HTML templates (Jinja2)
├── static/                 # Static files (JS, CSS)
├── *.pkl, *.h5             # Model and scaler files
├── apple_data.csv          # Stock data
└── stockenv/               # Python virtual environment
```

## Setup Instructions

### 1. Clone the Repository
```
git clone <your-repo-url>
cd Stock-Market-Prediction
```

### 2. Create and Activate Virtual Environment
It is recommended to use the provided `stockenv` or create a new one:
```
python -m venv stockenv
# Windows:
stockenv\Scripts\activate
# Unix/Mac:
source stockenv/bin/activate
```

### 3. Install Dependencies
```
pip install -r requirements.txt
```
If `requirements.txt` is missing, install the following main packages:
- Flask
- pandas
- numpy
- scikit-learn
- keras
- statsmodels
- prophet
- matplotlib

### 4. Prepare Model Files
Ensure the following model files are present in the project root:
- `lstm_model.h5`
- `lstm_scaler.pkl`
- `arima_model.pkl`
- `sarima_model.pkl`
- `prophet_model.pkl`
- `model_info.pkl`

If you do not have these files, you will need to train the models or request them from the project author.

### 5. Run the Application
```
python app.py
```
The app will be available at [http://localhost:5000](http://localhost:5000)

## Usage
- Visit the homepage to navigate to prediction, visualization, and model comparison pages.
- Select an AI model and generate predictions for various time periods.
- View model accuracy and compare different models.

## Credits
- Developed by [Your Name/Team].
- Powered by Flask, Bootstrap, Keras, Prophet, and more.

## License
This project is for educational and research purposes. Please contact the author for commercial use. 