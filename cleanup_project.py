#!/usr/bin/env python3
"""
Project Cleanup Script
Removes irrelevant files while preserving core website functionality
"""

import os
import shutil
import sys

def cleanup_project():
    """Remove irrelevant files from the project"""
    
    # Files to remove (non-essential for website)
    files_to_remove = [
        # Jupyter Notebooks (Development/Research)
        'LStm.ipynb',
        'prophet.ipynb', 
        'armina_sarima.ipynb',
        'model_Comarison_tunning.ipynb',
        'FE_LSTM.ipynb',
        'FE.ipynb',
        'EDA.ipynb',
        
        # Test Files
        'test_long_term_predictions.py',
        'test_custom_predictions.py',
        'test_flask_direct.py',
        'debug_models_simple.py',
        'test_api_simple.py',
        'debug_models.py',
        'test_all_models_website.py',
        'test_all_models.py',
        'test_lstm.py',
        'test_project_models.py',
        'test_models.py',
        'test_visualization.py',
        'test_api.py',
        
        # Setup/Debug Files
        'debug_arima_sarima.py',
        'setup_stockenv.py',
        'setup_models.py',
        'run_app.py',
        
        # Documentation
        'STOCKENV_SETUP.md',
        'MODEL_CONNECTION_GUIDE.md',
        'README.md',
        'EDA_FE_Report.md',
        
        # Empty/Unused Files
        'back.py',
        'index.html',  # Empty file in root
        'appy.py',
        'style.css',  # Duplicate in root
        
        # Data files (keep only essential ones)
        'X_test.npy',
        'TSLA.csv',
    ]
    
    # Directories to remove
    dirs_to_remove = [
        '__pycache__',
        '.ipynb_checkpoints',
        'venv',
        'tf_env',
        'project details',
    ]
    
    # Files to keep (essential for website)
    essential_files = [
        'app.py',
        'model_manager.py',
        'model_info.pkl',
        'prophet_model.pkl',
        'sarima_model.pkl', 
        'arima_model.pkl',
        'lstm_scaler.pkl',
        'lstm_model.h5',
        'train_all_models.py',
        'requirements.txt',
        'start_app.sh',
        'start_app.bat',
        'apple_data.csv',
        'AAPL_stock_data.csv',
        'templates/',
        'static/',
        'stockenv/',
        '.git/',
    ]
    
    print("🧹 Starting project cleanup...")
    print("=" * 50)
    
    # Remove files
    removed_files = 0
    for file in files_to_remove:
        if os.path.exists(file):
            try:
                os.remove(file)
                print(f"✅ Removed file: {file}")
                removed_files += 1
            except Exception as e:
                print(f"❌ Error removing {file}: {e}")
        else:
            print(f"⚠️  File not found: {file}")
    
    # Remove directories
    removed_dirs = 0
    for dir_name in dirs_to_remove:
        if os.path.exists(dir_name):
            try:
                shutil.rmtree(dir_name)
                print(f"✅ Removed directory: {dir_name}")
                removed_dirs += 1
            except Exception as e:
                print(f"❌ Error removing {dir_name}: {e}")
        else:
            print(f"⚠️  Directory not found: {dir_name}")
    
    print("=" * 50)
    print(f"📊 Cleanup Summary:")
    print(f"   Files removed: {removed_files}")
    print(f"   Directories removed: {removed_dirs}")
    print(f"   Total items removed: {removed_files + removed_dirs}")
    print()
    print("✅ Essential files preserved:")
    for file in essential_files:
        if os.path.exists(file):
            print(f"   ✓ {file}")
        else:
            print(f"   ⚠️  {file} (not found)")
    
    print()
    print("🎯 Your website will continue to work with these core files:")
    print("   - app.py (Flask application)")
    print("   - model_manager.py (Model management)")
    print("   - templates/ (HTML pages)")
    print("   - static/ (CSS/JS files)")
    print("   - Model files (.pkl, .h5)")
    print("   - Stock data (.csv)")
    print()
    print("🚀 You can now run your website with: python app.py")

if __name__ == "__main__":
    # Confirm before proceeding
    print("⚠️  WARNING: This will permanently delete files!")
    print("This script will remove:")
    print("- Jupyter notebooks (development files)")
    print("- Test files")
    print("- Documentation files")
    print("- Empty/unused files")
    print("- Cache directories")
    print()
    
    response = input("Do you want to proceed? (yes/no): ").lower().strip()
    
    if response in ['yes', 'y']:
        cleanup_project()
    else:
        print("❌ Cleanup cancelled.")
        sys.exit(0) 