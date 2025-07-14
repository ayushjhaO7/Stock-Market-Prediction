# 📊 Stock Market Prediction & Forecasting Web App

## Overview
This project is an AI-powered web application for stock market price forecasting and analysis. It leverages multiple machine learning models (LSTM, ARIMA, SARIMA, Prophet) to predict future stock prices and visualize trends, providing users with actionable insights.

---

## 🔗 Dataset Source
We use publicly available historical stock market datasets from:
- [Yahoo Finance](https://finance.yahoo.com/)
- [Alpha Vantage](https://www.alphavantage.co/)
- [Kaggle Datasets](https://www.kaggle.com/)

The dataset typically includes the following columns:
- `Open`
- `Close`
- `High`
- `Low`
- `Volume`
- `Date` as index

---

## 📅 Project Timeline (Deadline: **15 July**)
| Date Range         | Task                                                                 |
|--------------------|----------------------------------------------------------------------|
| **June 17 – June 23** | Study time series concepts and collect stock market data            |
| **June 24 – June 30** | Data preprocessing and visualization                                |
| **July 1 – July 5**   | Apply ARIMA, SARIMA, and Prophet models                             |
| **July 6 – July 9**   | Implement LSTM model for deep learning-based forecasting            |
| **July 10**           | Model comparison and hyperparameter tuning                          |
| **July 11 – July 14** | Final evaluation, report writing, Streamlit app deployment, and video/PPT |
| **July 15**           | **Final submission** to project mentor/reviewer                      |

---

## 🛠 Operations Performed
1. **Data Collection**: Using APIs like `yfinance` or Alpha Vantage, saving raw and processed data.
2. **Preprocessing**: Handling nulls, scaling, feature engineering.
3. **Visualization**: Time series plots, moving averages, ACF/PACF, decomposition.
4. **Model Training**: ARIMA, SARIMA, Prophet, LSTM (Keras).
5. **Hyperparameter Tuning**: Grid Search, epochs, batch size, etc.
6. **Model Evaluation**: MAE, RMSE, MAPE, R², forecast vs actual, residuals.
7. **Model Saving**: Using `pickle`, `joblib`, `.h5` for LSTM.
8. **Deployment**: Flask web app (this repo), optionally Streamlit for demo.
9. **Documentation & Presentation**: Video demo, PPT, code documentation.

---

## 🚀 Features
- **Interactive Dashboard:** Visualize historical and predicted stock prices.
- **Multiple AI Models:** Choose from LSTM, ARIMA, SARIMA, and Prophet for predictions.
- **Model Comparison:** View and compare model accuracy and performance.
- **Custom Predictions:** Select custom time periods for price forecasts.
- **Responsive UI:** Modern, mobile-friendly design with Bootstrap 5.

---

## 🗂 Project Directory Structure
```
Stock-Market-Prediction/
├── app.py                  # Flask backend
├── model_manager.py        # Model management and prediction logic
├── templates/              # HTML templates (Jinja2)
├── static/                 # Static files (JS, CSS)
├── *.pkl, *.h5             # Model and scaler files
├── apple_data.csv          # Stock data
├── stockenv/               # Python virtual environment
├── requirements.txt        # Python dependencies
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/ayushjhaO7/Stock-Market-Prediction.git
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

---

## 💻 Usage
- Visit the homepage to navigate to prediction, visualization, and model comparison pages.
- Select an AI model and generate predictions for various time periods.
- View model accuracy and compare different models.

---

## 👥 Contributors
| Name         | Role                        |
| ------------ | --------------------------- |
| Kishan Kumar | Data Collection, LSTM Model |
| Member 2     | ARIMA/SARIMA Modeling       |
| Member 3     | Data Preprocessing          |
| Member 4     | Prophet Modeling            |
| Member 5     | Visualization & Dashboard   |
| Member 6     | Web Deployment              |
| Member 7     | PPT & Video Presentation    |

---

## 🧑‍💼 Project Review
This project is reviewed and mentored by **Zidio Development**, who guided us through all critical checkpoints and helped ensure a production-ready result.

---

## 📽 Demo and Deliverables
- ✔️ Cleaned dataset and preprocessing code
- ✔️ Trained models and evaluation results
- ✔️ Visualization dashboards
- ✔️ Pickled models for deployment
- ✔️ Final **Flask Web App**
- ✔️ GitHub repository with documentation
- ✔️ Final PPT presentation
- ✔️ Video demonstration

---

## 📬 Feedback and Contributions
We welcome feedback, contributions, or suggestions for improving this project. Please open an issue or fork and contribute. Thank you for your interest!

---

## Credits
- Developed by the project team.
- Powered by Flask, Bootstrap, Keras, Prophet, and more.

## License
This project is for educational and research purposes. Please contact the author for commercial use. 
