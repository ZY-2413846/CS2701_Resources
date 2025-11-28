// Climate Data
const temperatureData = [
    { year: 1950, temperature: 13.8, anomaly: -0.2 },
    { year: 1955, temperature: 13.9, anomaly: -0.1 },
    { year: 1960, temperature: 13.95, anomaly: -0.05 },
    { year: 1965, temperature: 13.85, anomaly: -0.15 },
    { year: 1970, temperature: 13.95, anomaly: -0.05 },
    { year: 1975, temperature: 13.9, anomaly: -0.1 },
    { year: 1980, temperature: 14.1, anomaly: 0.1 },
    { year: 1985, temperature: 14.15, anomaly: 0.15 },
    { year: 1990, temperature: 14.3, anomaly: 0.3 },
    { year: 1995, temperature: 14.35, anomaly: 0.35 },
    { year: 2000, temperature: 14.4, anomaly: 0.4 },
    { year: 2005, temperature: 14.55, anomaly: 0.55 },
    { year: 2010, temperature: 14.65, anomaly: 0.65 },
    { year: 2015, temperature: 14.85, anomaly: 0.85 },
    { year: 2020, temperature: 15.0, anomaly: 1.0 },
    { year: 2023, temperature: 15.1, anomaly: 1.1 },
];

const rainfallData = [
    { year: 1950, rainfall: 990 },
    { year: 1955, rainfall: 985 },
    { year: 1960, rainfall: 995 },
    { year: 1965, rainfall: 1000 },
    { year: 1970, rainfall: 1005 },
    { year: 1975, rainfall: 995 },
    { year: 1980, rainfall: 1010 },
    { year: 1985, rainfall: 1015 },
    { year: 1990, rainfall: 1020 },
    { year: 1995, rainfall: 1025 },
    { year: 2000, rainfall: 1030 },
    { year: 2005, rainfall: 1040 },
    { year: 2010, rainfall: 1045 },
    { year: 2015, rainfall: 1055 },
    { year: 2020, rainfall: 1060 },
    { year: 2023, rainfall: 1065 },
];

const co2Data = [
    { year: 1950, co2: 310 },
    { year: 1955, co2: 313 },
    { year: 1960, co2: 317 },
    { year: 1965, co2: 320 },
    { year: 1970, co2: 326 },
    { year: 1975, co2: 331 },
    { year: 1980, co2: 339 },
    { year: 1985, co2: 346 },
    { year: 1990, co2: 354 },
    { year: 1995, co2: 361 },
    { year: 2000, co2: 369 },
    { year: 2005, co2: 379 },
    { year: 2010, co2: 390 },
    { year: 2015, co2: 401 },
    { year: 2020, co2: 414 },
    { year: 2023, co2: 421 },
];

const sustainabilityMetrics = [
    { label: "Renewable Energy", value: 29, max: 100, unit: "%", trend: "up", icon: "⚡" },
    { label: "Forest Coverage", value: 31, max: 100, unit: "%", trend: "down", icon: "🌳" },
    { label: "Ocean Health", value: 66, max: 100, unit: "/100", trend: "down", icon: "🌊" },
    { label: "Air Quality Index", value: 78, max: 100, unit: "/100", trend: "stable", icon: "💨" },
];

// Render Metric Cards
function renderMetrics() {
    const grid = document.getElementById('metricsGrid');
    
    sustainabilityMetrics.forEach((metric, index) => {
        const percentage = (metric.value / metric.max) * 100;
        const trendIcon = metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '−';
        const trendClass = `trend-${metric.trend}`;
        
        const card = document.createElement('div');
        card.className = 'metric-card';
        card.style.animationDelay = `${index * 100}ms`;
        card.innerHTML = `
            <div class="metric-header">
                <span class="metric-icon">${metric.icon}</span>
                <div class="metric-info">
                    <h3>${metric.label}</h3>
                    <div class="metric-value-container">
                        <span class="metric-value">${metric.value}${metric.unit}</span>
                        <span class="trend-icon ${trendClass}">${trendIcon}</span>
                    </div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Chart.js Configuration
const chartColors = {
    primary: '#2d8659',
    secondary: '#4ca87a',
    accent: '#6ba88a',
    warning: '#d97706',
    danger: '#dc2626',
    grid: '#d4e8dd',
    text: '#1a4d2e',
};

// Temperature Chart
function createTemperatureChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: temperatureData.map(d => d.year),
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatureData.map(d => d.temperature),
                    borderColor: chartColors.warning,
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Anomaly (°C)',
                    data: temperatureData.map(d => d.anomaly),
                    borderColor: chartColors.danger,
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: chartColors.text,
                    bodyColor: chartColors.text,
                    borderColor: chartColors.grid,
                    borderWidth: 1,
                }
            },
            scales: {
                y: {
                    grid: { color: chartColors.grid },
                    ticks: { color: chartColors.text }
                },
                x: {
                    grid: { color: chartColors.grid },
                    ticks: { color: chartColors.text }
                }
            }
        }
    });
}

// Rainfall Chart
function createRainfallChart() {
    const ctx = document.getElementById('rainfallChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: rainfallData.map(d => d.year),
            datasets: [{
                label: 'Rainfall (mm)',
                data: rainfallData.map(d => d.rainfall),
                borderColor: chartColors.secondary,
                backgroundColor: 'rgba(76, 168, 122, 0.3)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: chartColors.text,
                    bodyColor: chartColors.text,
                    borderColor: chartColors.grid,
                    borderWidth: 1,
                }
            },
            scales: {
                y: {
                    grid: { color: chartColors.grid },
                    ticks: { color: chartColors.text }
                },
                x: {
                    grid: { color: chartColors.grid },
                    ticks: { color: chartColors.text }
                }
            }
        }
    });
}

// CO2 Chart
function createCO2Chart() {
    const ctx = document.getElementById('co2Chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: co2Data.map(d => d.year),
            datasets: [{
                label: 'CO₂ Level (ppm)',
                data: co2Data.map(d => d.co2),
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(45, 134, 89, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: chartColors.text,
                    bodyColor: chartColors.text,
                    borderColor: chartColors.grid,
                    borderWidth: 1,
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 350,
                            yMax: 350,
                            borderColor: chartColors.primary,
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'Safe Level (350 ppm)',
                                enabled: true,
                                position: 'end'
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 300,
                    max: 450,
                    grid: { color: chartColors.grid },
                    ticks: { color: chartColors.text }
                },
                x: {
                    grid: { color: chartColors.grid },
                    ticks: { color: chartColors.text }
                }
            }
        }
    });
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderMetrics();
    createTemperatureChart();
    createRainfallChart();
    createCO2Chart();
});
