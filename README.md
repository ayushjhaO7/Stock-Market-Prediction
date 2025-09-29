# Stock Market Forecasting Project

## Overview
This repository provides a Flask-based web application for stock market forecasting and visualization. It serves predictions from multiple time-series models using a historical OHLCV dataset and exposes simple JSON APIs for programmatic access.

## Features
- LSTM (TensorFlow), ARIMA, SARIMA, and Prophet models
- Interactive pages: Home, Visualization, Prediction, Models
- Technical indicators (e.g., MA20, MA50)
- JSON APIs for stock data and future predictions

## Tech Stack
- Python 3.10
- Flask 3.x
- NumPy 1.26.x, Pandas 2.3.x, scikit-learn 1.7.x
- TensorFlow 2.19 (via tf.keras)
- statsmodels 0.14.x, prophet 1.1.5
- Plotly / Matplotlib / Seaborn (visualization)

## Project Structure
```text
Stock-Market-Prediction/
├── run.py                      # App entry point
├── app/                        # Flask web application
│   ├── app.py                  # Routes and JSON APIs
│   ├── models/
│   │   └── model_manager.py    # Model loading and prediction logic
│   ├── templates/              # HTML templates
│   ├── static/                 # CSS/JS assets
│   └── utils/                  # (placeholder)
├── models/
│   ├── lstm_model.h5
│   ├── arima_model.pkl
│   ├── sarima_model.pkl
│   ├── prophet_model.pkl
│   └── model_info.pkl
├── data/
│   ├── raw/
│   │   ├── apple_data.csv
│   │   └── AAPL_stock_data.csv
│   └── processed/
│       └── scalers/
│           └── lstm_scaler.pkl
├── notebooks/                  # EDA/FE/modeling experiments
│   ├── EDA.ipynb
│   ├── FE.ipynb
│   ├── FE_LSTM.ipynb
│   ├── armina_sarima.ipynb
│   └── prophet.ipynb
├── tests/                      # (empty placeholder)
├── start_app.sh                # Unix helper (optional)
├── cleanup_project.py          # Cleanup utility (optional)
├── config.py                   # App configuration (optional)
├── requirements.txt
├── README.md
└── venv/                       # Local virtual env (don’t commit)
```

## Setup
1) Create and activate a virtual environment (Windows):
```bash
python -m venv venv
venv\Scripts\activate
```
2) Install dependencies:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```
Notes
- Prophet 1.1.5 is compatible with NumPy 1.26.x. If you encounter NumPy 2.x errors (np.float_ removed), install: `pip install "numpy==1.26.4"`.
- The app expects data at `data/raw/apple_data.csv` with columns: Date, Open, High, Low, Close, Volume.

## Running
```bash
python run.py
```
Then open http://127.0.0.1:5000 in your browser.

## API Endpoints
- GET `/api/stock-data/<days>`
  - Returns arrays for dates, open, high, low, close, volume for the last `<days>` days.
- GET `/api/technical-indicators/<days>`
  - Returns MA20 and MA50 for the last `<days>` days.
- GET `/api/predictions?model=lstm|arima|sarima|prophet&days=N`
  - Returns N future daily predictions using the chosen model.
  - If the model isn’t available, the app gracefully falls back to a simple trend projection.

## Models
- Loaded at startup by `app/models/model_manager.py`.
- Artifacts in `models/`:
  - `lstm_model.h5` (tf.keras)
  - `arima_model.pkl`
  - `sarima_model.pkl`
  - `prophet_model.pkl`
  - `model_info.pkl` (metadata for display)

Retraining (optional): use `train_all_models.py` to fit and re-save all models on the current dataset.

## Data
- Default dataset: `data/raw/apple_data.csv`.
- Ensure `Date` is parseable and sorted; missing values should be handled before training.

## Troubleshooting
- Prophet error about `np.float_` with NumPy 2.x:
  - `pip install "numpy==1.26.4"`
- TensorFlow oneDNN/CPU feature messages:
  - Informational; the app still runs.
- Virtual environment naming:
  - The repository includes `venv/`; activate with `venv\Scripts\activate` on Windows.

## Housekeeping
- Notebooks in the repo are for research; they are not used at runtime.
- Duplicates may exist between root and `notebooks/`; prefer keeping `notebooks/` only.
- Files like `TSLA.csv`, `start_app.sh`, `app/routes.py`, `config.py` are optional/unused unless you explicitly wire them.

## License
Add a license of your choice (e.g., MIT, Apache-2.0) in `LICENSE`.

## Acknowledgements
- Data sources: Yahoo Finance (via `yfinance`) and other public datasets
- Libraries: Prophet (Meta), TensorFlow/Keras, statsmodels, scikit-learn, Pandas
