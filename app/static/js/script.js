// Main JavaScript for the homepage
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero chart
    initializeHeroChart();
    
    // Load model performance data
    loadModelPerformance();
    
    // Add scroll animations
    addScrollAnimations();

    // Get Prediction button handler - Simplified
    const btn = document.getElementById('getPredictionBtn');
    console.log('Prediction button found:', btn); // Debug log
    if (btn) {
        btn.addEventListener('click', function(e) {
            console.log('Prediction button clicked via addEventListener!'); // Debug log
            alert('Button clicked! This means the event listener is working.');
        });
    } else {
        console.error('Prediction button not found!'); // Debug log
    }
});

// Initialize the hero chart
function initializeHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx) return;

    // Sample data for hero chart
    const labels = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
    const data = Array.from({length: 30}, () => Math.random() * 50 + 150);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    radius: 0
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
        
        // Update stats on the page
        if (data.models && data.models.length > 0) {
            const bestModel = data.models.reduce((prev, current) => 
                (prev.accuracy > current.accuracy) ? prev : current
            );
            
            document.getElementById('accuracy').textContent = bestModel.accuracy + '%';
            document.getElementById('mae').textContent = bestModel.mae;
            document.getElementById('rmse').textContent = bestModel.rmse;
        }
    } catch (error) {
        console.error('Error loading model performance:', error);
    }
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all cards and stat items
    document.querySelectorAll('.card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons (excluding prediction button)
document.querySelectorAll('.btn:not(#getPredictionBtn)').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('btn-outline-light')) {
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
            setTimeout(() => {
                this.innerHTML = this.getAttribute('data-original-text') || this.innerHTML;
            }, 2000);
        }
    });
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animate numbers on scroll
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-item h3, .stat-item h4');
    
    numberElements.forEach(element => {
        const finalNumber = parseFloat(element.textContent.replace(/[^0-9.]/g, ''));
        const suffix = element.textContent.replace(/[0-9.]/g, '');
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = currentNumber.toFixed(1) + suffix;
        }, 20);
    });
}

// Trigger number animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-item').forEach(el => {
    statsObserver.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
const heroTitle = document.querySelector('.hero-section h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
}

// Add counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.textContent);
            animateCounter(element, target);
            counterObserver.unobserve(element);
        }
    });
});

document.querySelectorAll('.stat-item h3, .stat-item h4').forEach(el => {
    counterObserver.observe(el);
}); 