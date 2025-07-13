#!/bin/bash

echo "========================================"
echo "  Stock Market Prediction App Launcher"
echo "========================================"
echo

echo "🔍 Checking for stockenv environment..."
if [ ! -f "stockenv/bin/activate" ]; then
    echo "❌ stockenv environment not found!"
    echo "Please create the virtual environment first:"
    echo "  python3 -m venv stockenv"
    echo "  source stockenv/bin/activate"
    echo "  pip install -r requirements.txt"
    exit 1
fi

echo "✅ Found stockenv environment"
echo

echo "🔄 Activating stockenv..."
source stockenv/bin/activate
if [ $? -ne 0 ]; then
    echo "❌ Failed to activate stockenv"
    exit 1
fi

echo "✅ stockenv activated successfully"
echo

echo "📦 Checking requirements..."
python -c "import flask, pandas, numpy" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️ Installing requirements..."
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install requirements"
        exit 1
    fi
    echo "✅ Requirements installed"
else
    echo "✅ All requirements are available"
fi

echo
echo "🚀 Starting Stock Market Prediction App..."
echo "🌐 The app will be available at: http://localhost:5000"
echo "📊 Open your browser to access the application"
echo "🛑 Press Ctrl+C to stop the server"
echo

python run_app.py 