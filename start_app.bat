@echo off
echo ========================================
echo   Stock Market Prediction App Launcher
echo ========================================
echo.

echo 🔍 Checking for stockenv environment...
if not exist "stockenv\Scripts\activate.bat" (
    echo ❌ stockenv environment not found!
    echo Please create the virtual environment first:
    echo   python -m venv stockenv
    echo   stockenv\Scripts\activate
    echo   pip install -r requirements.txt
    pause
    exit /b 1
)

echo ✅ Found stockenv environment
echo.

echo 🔄 Activating stockenv...
call stockenv\Scripts\activate.bat
if errorlevel 1 (
    echo ❌ Failed to activate stockenv
    pause
    exit /b 1
)

echo ✅ stockenv activated successfully
echo.

echo 📦 Checking requirements...
python -c "import flask, pandas, numpy" 2>nul
if errorlevel 1 (
    echo ⚠️ Installing requirements...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Failed to install requirements
        pause
        exit /b 1
    )
    echo ✅ Requirements installed
) else (
    echo ✅ All requirements are available
)

echo.
echo 🚀 Starting Stock Market Prediction App...
echo 🌐 The app will be available at: http://localhost:5000
echo 📊 Open your browser to access the application
echo 🛑 Press Ctrl+C to stop the server
echo.

python run_app.py

pause 