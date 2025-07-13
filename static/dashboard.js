// Dashboard JavaScript
let stockChart, maChart, rsiChart, modelComparisonChart;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Load initial data
    loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize all charts
function initializeCharts() {
    initializeStockChart();
    initializeMAChart();
    initializeRSIChart();
    initializeModelComparisonChart();
}

// Initialize stock price chart
function initializeStockChart() {
    const ctx = document.getElementById('stockChart');
    if (!ctx) return;

    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Actual Price',
                data: [],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }, {
                label: 'Predicted Price',
                data: [],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                borderDash: [5, 5]
            }]
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
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Price ($)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Initialize moving averages chart
function initializeMAChart() {
    const ctx = document.getElementById('maChart');
    if (!ctx) return;

    maChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Close Price',
                data: [],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                fill: false
            }, {
                label: 'MA 20',
                data: [],
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderWidth: 2,
                fill: false
            }, {
                label: 'MA 50',
                data: [],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Price ($)'
                    }
                }
            }
        }
    });
}

// Initialize RSI chart
function initializeRSIChart() {
    const ctx = document.getElementById('rsiChart');
    if (!ctx) return;

    rsiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'RSI',
                data: [],
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'RSI'
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

// Initialize model comparison chart
function initializeModelComparisonChart() {
    const ctx = document.getElementById('modelComparisonChart');
    if (!ctx) return;

    modelComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['LSTM', 'ARIMA', 'SARIMA', 'Prophet'],
            datasets: [{
                label: 'Accuracy (%)',
                data: [94.2, 89.1, 91.8, 90.5],
                backgroundColor: [
                    'rgba(0, 123, 255, 0.8)',
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(23, 162, 184, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 123, 255, 1)',
                    'rgba(40, 167, 69, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(23, 162, 184, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                }
            }
        }
    });
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Load stock data
        const stockResponse = await fetch('/api/stock-data');
        const stockData = await stockResponse.json();
        updateStockChart(stockData);

        // Load technical indicators
        const indicatorsResponse = await fetch('/api/technical-indicators');
        const indicatorsData = await indicatorsResponse.json();
        updateTechnicalCharts(indicatorsData);

        // Load model comparison
        const modelResponse = await fetch('/api/model-comparison');
        const modelData = await modelResponse.json();
        updateModelTable(modelData);

        // Load predictions
        const predictionsResponse = await fetch('/api/predictions');
        const predictionsData = await predictionsResponse.json();
        updatePredictionsTable(predictionsData);
        updateQuickStats(predictionsData);

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please try again.');
    }
}

// Update stock chart with new data
function updateStockChart(data) {
    if (!stockChart) return;

    stockChart.data.labels = data.dates;
    stockChart.data.datasets[0].data = data.close;
    
    // Add predictions (simulated)
    const predictions = data.close.map((price, index) => {
        if (index < data.close.length - 10) {
            return price;
        } else {
            return price * (1 + (Math.random() - 0.5) * 0.02);
        }
    });
    
    stockChart.data.datasets[1].data = predictions;
    stockChart.update();
}

// Update technical charts
function updateTechnicalCharts(data) {
    if (maChart) {
        maChart.data.labels = data.dates;
        maChart.data.datasets[0].data = data.close;
        maChart.data.datasets[1].data = data.ma_20;
        maChart.data.datasets[2].data = data.ma_50;
        maChart.update();
    }

    if (rsiChart) {
        rsiChart.data.labels = data.dates;
        rsiChart.data.datasets[0].data = data.rsi;
        rsiChart.update();
    }
}

// Update model performance table
function updateModelTable(data) {
    const tableBody = document.getElementById('modelTable');
    if (!tableBody || !data.models) return;

    tableBody.innerHTML = '';
    
    data.models.forEach(model => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${model.name}</strong></td>
            <td>${model.accuracy}%</td>
            <td>${model.mae}</td>
            <td>${model.rmse}</td>
            <td>${model.mape}%</td>
            <td><span class="badge bg-success">Active</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Update predictions table
function updatePredictionsTable(data) {
    const tableBody = document.getElementById('predictionTable');
    if (!tableBody || !data.predictions) return;

    tableBody.innerHTML = '';
    
    data.predictions.forEach(prediction => {
        const row = document.createElement('tr');
        const confidence = Math.random() * 20 + 80; // Simulated confidence
        const trend = Math.random() > 0.5 ? 'up' : 'down';
        
        row.innerHTML = `
            <td>${prediction.date}</td>
            <td>$${prediction.price}</td>
            <td>${confidence.toFixed(1)}%</td>
            <td><span class="badge bg-${trend === 'up' ? 'success' : 'danger'}">${trend}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Update quick stats
function updateQuickStats(data) {
    if (data.current_price) {
        document.getElementById('currentPrice').textContent = `$${data.current_price}`;
    }
    
    if (data.predictions && data.predictions.length > 0) {
        const latestPrediction = data.predictions[0];
        document.getElementById('predictedPrice').textContent = `$${latestPrediction.price}`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Update dashboard button
    const updateBtn = document.querySelector('button[onclick="updateDashboard()"]');
    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
            loadDashboardData().finally(() => {
                this.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Update Dashboard';
            });
        });
    }

    // Stock symbol change
    const stockSymbol = document.getElementById('stockSymbol');
    if (stockSymbol) {
        stockSymbol.addEventListener('change', function() {
            loadDashboardData();
        });
    }

    // Time period change
    const timePeriod = document.getElementById('timePeriod');
    if (timePeriod) {
        timePeriod.addEventListener('change', function() {
            loadDashboardData();
        });
    }

    // Prediction days change
    const predictionDays = document.getElementById('predictionDays');
    if (predictionDays) {
        predictionDays.addEventListener('change', function() {
            loadDashboardData();
        });
    }
}

// Global function for update dashboard button
function updateDashboard() {
    loadDashboardData();
}

// Show error message
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Add real-time updates (simulated)
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time price updates
        const currentPriceElement = document.getElementById('currentPrice');
        if (currentPriceElement) {
            const currentPrice = parseFloat(currentPriceElement.textContent.replace('$', ''));
            const change = (Math.random() - 0.5) * 2;
            const newPrice = currentPrice + change;
            currentPriceElement.textContent = `$${newPrice.toFixed(2)}`;
            
            // Add visual feedback
            if (change > 0) {
                currentPriceElement.classList.add('price-up');
                setTimeout(() => currentPriceElement.classList.remove('price-up'), 1000);
            } else if (change < 0) {
                currentPriceElement.classList.add('price-down');
                setTimeout(() => currentPriceElement.classList.remove('price-down'), 1000);
            }
        }
    }, 10000); // Update every 10 seconds
}

// Start real-time updates when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(startRealTimeUpdates, 5000); // Start after 5 seconds
});

// Export chart data
function exportChartData() {
    const data = {
        stockData: stockChart ? stockChart.data : null,
        technicalData: {
            ma: maChart ? maChart.data : null,
            rsi: rsiChart ? rsiChart.data : null
        },
        modelData: modelComparisonChart ? modelComparisonChart.data : null
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'r':
                e.preventDefault();
                updateDashboard();
                break;
            case 'e':
                e.preventDefault();
                exportChartData();
                break;
        }
    }
}); 