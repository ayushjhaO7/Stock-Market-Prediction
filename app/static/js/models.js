// Models page JavaScript
let modelComparisonChart;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize model comparison chart
    initializeModelComparisonChart();
    
    // Load model performance data
    loadModelPerformance();
    
    // Setup event listeners
    setupModelEventListeners();
});

// Initialize model comparison chart
function initializeModelComparisonChart() {
    const ctx = document.getElementById('modelComparisonChart');
    if (!ctx) return;

    modelComparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Accuracy', 'MAE', 'RMSE', 'MAPE', 'Speed', 'Interpretability'],
            datasets: [
                {
                    label: 'LSTM',
                    data: [94.2, 85, 88, 90, 60, 40],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#007bff',
                    pointBorderColor: '#007bff',
                    pointHoverBackgroundColor: '#007bff',
                    pointHoverBorderColor: '#007bff'
                },
                {
                    label: 'ARIMA',
                    data: [89.1, 70, 75, 85, 90, 95],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#28a745',
                    pointHoverBackgroundColor: '#28a745',
                    pointHoverBorderColor: '#28a745'
                },
                {
                    label: 'SARIMA',
                    data: [91.8, 80, 82, 88, 85, 90],
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffc107',
                    pointBorderColor: '#ffc107',
                    pointHoverBackgroundColor: '#ffc107',
                    pointHoverBorderColor: '#ffc107'
                },
                {
                    label: 'Prophet',
                    data: [90.5, 78, 80, 85, 95, 85],
                    borderColor: '#17a2b8',
                    backgroundColor: 'rgba(23, 162, 184, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#17a2b8',
                    pointBorderColor: '#17a2b8',
                    pointHoverBackgroundColor: '#17a2b8',
                    pointHoverBorderColor: '#17a2b8'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Load model performance data
async function loadModelPerformance() {
    try {
        const response = await fetch('/api/model-comparison');
        const data = await response.json();
        
        if (data.models) {
            updateModelComparisonChart(data.models);
        }
    } catch (error) {
        console.error('Error loading model performance:', error);
    }
}

// Update model comparison chart
function updateModelComparisonChart(models) {
    if (!modelComparisonChart) return;

    // Update radar chart data based on actual model performance
    models.forEach((model, index) => {
        if (modelComparisonChart.data.datasets[index]) {
            modelComparisonChart.data.datasets[index].data = [
                model.accuracy,
                100 - model.mae * 10, // Convert MAE to score (lower is better)
                100 - model.rmse * 5, // Convert RMSE to score
                100 - model.mape, // Convert MAPE to score
                getSpeedScore(model.name), // Speed score
                getInterpretabilityScore(model.name) // Interpretability score
            ];
        }
    });

    modelComparisonChart.update();
}

// Get speed score for model
function getSpeedScore(modelName) {
    const speedScores = {
        'LSTM': 60,
        'ARIMA': 90,
        'SARIMA': 85,
        'Prophet': 95
    };
    return speedScores[modelName] || 70;
}

// Get interpretability score for model
function getInterpretabilityScore(modelName) {
    const interpretabilityScores = {
        'LSTM': 40,
        'ARIMA': 95,
        'SARIMA': 90,
        'Prophet': 85
    };
    return interpretabilityScores[modelName] || 70;
}

// Setup event listeners
function setupModelEventListeners() {
    // Model detail buttons
    document.querySelectorAll('[onclick^="showModelDetails"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modelType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showModelDetails(modelType);
        });
    });

    // Add hover effects to model cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Show model details modal
function showModelDetails(modelType) {
    const modelDetails = getModelDetails(modelType);
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="modelDetailsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-brain me-2"></i>${modelDetails.title}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Performance Metrics</h6>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Accuracy:</span>
                                        <strong>${modelDetails.accuracy}%</strong>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>MAE:</span>
                                        <strong>${modelDetails.mae}</strong>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>RMSE:</span>
                                        <strong>${modelDetails.rmse}</strong>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>MAPE:</span>
                                        <strong>${modelDetails.mape}%</strong>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6>Technical Details</h6>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Training Time:</span>
                                        <strong>${modelDetails.trainingTime}</strong>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Prediction Time:</span>
                                        <strong>${modelDetails.predictionTime}</strong>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Model Size:</span>
                                        <strong>${modelDetails.modelSize}</strong>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>Last Updated:</span>
                                        <strong>${modelDetails.lastUpdated}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr>
                        <h6>Description</h6>
                        <p>${modelDetails.description}</p>
                        <h6>Key Features</h6>
                        <ul>
                            ${modelDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <h6>Use Cases</h6>
                        <ul>
                            ${modelDetails.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="downloadModel('${modelType}')">
                            <i class="fas fa-download me-2"></i>Download Model
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('modelDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('modelDetailsModal'));
    modal.show();
}

// Get model details
function getModelDetails(modelType) {
    const details = {
        'lstm': {
            title: 'LSTM Neural Network',
            accuracy: 94.2,
            mae: 2.34,
            rmse: 3.12,
            mape: 1.85,
            trainingTime: '45 minutes',
            predictionTime: '0.1 seconds',
            modelSize: '398KB',
            lastUpdated: '2024-07-10',
            description: 'Long Short-Term Memory networks are a type of recurrent neural network that can learn long-term dependencies in time series data. Our LSTM model uses multiple layers with dropout regularization to prevent overfitting.',
            features: [
                'Deep learning architecture with multiple LSTM layers',
                'Dropout regularization for improved generalization',
                'Attention mechanism for better feature selection',
                'Batch normalization for stable training'
            ],
            useCases: [
                'Long-term stock price prediction',
                'Complex pattern recognition',
                'High-frequency trading signals',
                'Portfolio optimization'
            ]
        },
        'arima': {
            title: 'ARIMA Model',
            accuracy: 89.1,
            mae: 3.45,
            rmse: 4.23,
            mape: 2.67,
            trainingTime: '2 minutes',
            predictionTime: '0.01 seconds',
            modelSize: '45KB',
            lastUpdated: '2024-07-08',
            description: 'AutoRegressive Integrated Moving Average is a classical statistical method for time series forecasting. It combines autoregression, differencing, and moving average components.',
            features: [
                'Statistical approach with interpretable parameters',
                'Handles trend and seasonality automatically',
                'Fast training and prediction',
                'Robust to parameter selection'
            ],
            useCases: [
                'Short to medium-term forecasting',
                'Trend analysis and decomposition',
                'Statistical modeling and analysis',
                'Baseline model comparison'
            ]
        },
        'sarima': {
            title: 'SARIMA Model',
            accuracy: 91.8,
            mae: 2.89,
            rmse: 3.67,
            mape: 2.12,
            trainingTime: '5 minutes',
            predictionTime: '0.02 seconds',
            modelSize: '52KB',
            lastUpdated: '2024-07-09',
            description: 'Seasonal ARIMA extends ARIMA to handle seasonal patterns in time series data. It\'s particularly effective for stock data with weekly or monthly patterns.',
            features: [
                'Seasonal component handling',
                'Better for periodic data',
                'Robust parameter selection',
                'Good for medium-term predictions'
            ],
            useCases: [
                'Seasonal pattern recognition',
                'Periodic data forecasting',
                'Business cycle analysis',
                'Quarterly earnings prediction'
            ]
        },
        'prophet': {
            title: 'Prophet Model',
            accuracy: 90.5,
            mae: 3.12,
            rmse: 3.89,
            mape: 2.34,
            trainingTime: '3 minutes',
            predictionTime: '0.05 seconds',
            modelSize: '38KB',
            lastUpdated: '2024-07-07',
            description: 'Facebook\'s Prophet is designed for forecasting time series data with strong seasonal patterns and holiday effects. It\'s robust to missing data and trend changes.',
            features: [
                'Holiday effect handling',
                'Trend change detection',
                'Robust to missing data',
                'Easy to interpret'
            ],
            useCases: [
                'Holiday-impacted forecasting',
                'Trend change detection',
                'Missing data handling',
                'Business planning'
            ]
        }
    };

    return details[modelType.toLowerCase()] || details['lstm'];
}

// Download model function
function downloadModel(modelType) {
    const modelFiles = {
        'lstm': 'lstm_model.h5',
        'arima': 'arima_model.pkl',
        'sarima': 'sarima_model.pkl',
        'prophet': 'prophet_model.pkl'
    };

    const fileName = modelFiles[modelType.toLowerCase()];
    if (fileName) {
        // Create a dummy download (in real app, this would be a server endpoint)
        const link = document.createElement('a');
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent('Model file content')}`;
        link.download = fileName;
        link.click();
        
        showSuccess(`Model ${modelType.toUpperCase()} downloaded successfully!`);
    }
}

// Show success message
function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showModelDetails('lstm');
                break;
            case '2':
                e.preventDefault();
                showModelDetails('arima');
                break;
            case '3':
                e.preventDefault();
                showModelDetails('sarima');
                break;
            case '4':
                e.preventDefault();
                showModelDetails('prophet');
                break;
        }
    }
});

// Add chart interaction
function addChartInteractions() {
    if (modelComparisonChart) {
        modelComparisonChart.options.onClick = function(event, elements) {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const modelNames = ['LSTM', 'ARIMA', 'SARIMA', 'Prophet'];
                const modelType = modelNames[datasetIndex].toLowerCase();
                showModelDetails(modelType);
            }
        };
        modelComparisonChart.update();
    }
}

// Initialize chart interactions
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addChartInteractions, 1000);
}); 