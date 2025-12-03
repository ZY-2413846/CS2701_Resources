const temperatureData = [
    { year: 1950, temp: 13.8, anomaly: -0.2 },
    { year: 1960, temp: 13.95, anomaly: -0.05 },
    { year: 1970, temp: 13.95, anomaly: -0.05 },
    { year: 1980, temp: 14.1, anomaly: 0.1 },
    { year: 1990, temp: 14.3, anomaly: 0.3 },
    { year: 2000, temp: 14.4, anomaly: 0.4 },
    { year: 2010, temp: 14.65, anomaly: 0.65 },
    { year: 2020, temp: 15.0, anomaly: 1.0 },
    { year: 2023, temp: 15.1, anomaly: 1.1 },
];

const rainfallData = [
    { year: 1950, rain: 990 }, { year: 1960, rain: 995 },
    { year: 1970, rain: 1005 }, { year: 1980, rain: 1010 },
    { year: 1990, rain: 1020 }, { year: 2000, rain: 1030 },
    { year: 2010, rain: 1045 }, { year: 2020, rain: 1060 },
    { year: 2023, rain: 1065 },
];

const co2Data = [
    { year: 1950, co2: 310 }, { year: 1960, co2: 317 },
    { year: 1970, co2: 326 }, { year: 1980, co2: 339 },
    { year: 1990, co2: 354 }, { year: 2000, co2: 369 },
    { year: 2010, co2: 390 }, { year: 2020, co2: 414 },
    { year: 2023, co2: 421 },
];

const metrics = [
    { label: "Renewable Energy", value: 29, unit: "%" },
    { label: "Forest Coverage", value: 31, unit: "%" },
    { label: "Ocean Health", value: 66, unit: "/100" },
    { label: "Air Quality", value: 78, unit: "/100" },
];

function renderMetrics() {
    const grid = document.getElementById('metricsGrid');
    metrics.forEach(m => {
        grid.innerHTML += `
            <div class="metric-card">
                <h4>${m.label}</h4>
                <span class="value">${m.value}${m.unit}</span>
            </div>`;
    });
}

function initCharts() {
    const opts = { responsive: false, maintainAspectRatio: false };

    new Chart(document.getElementById('temperatureChart'), {
        type: 'line',
        data: {
            labels: temperatureData.map(d => d.year),
            datasets: [
                { label: 'Temp (°C)', data: temperatureData.map(d => d.temp), borderColor: '#4CAF50' },
                { label: 'Anomaly', data: temperatureData.map(d => d.anomaly), borderColor: '#81C784' }
            ]
        },
        options: opts
    });

    new Chart(document.getElementById('rainfallChart'), {
        type: 'line',
        data: {
            labels: rainfallData.map(d => d.year),
            datasets: [{
                label: 'Rainfall (mm)',
                data: rainfallData.map(d => d.rain),
                borderColor: '#4CAF50',
                fill: true,
                backgroundColor: 'rgba(76,175,80,0.1)'
            }]
        },
        options: opts
    });

    new Chart(document.getElementById('co2Chart'), {
        type: 'line',
        data: {
            labels: co2Data.map(d => d.year),
            datasets: [{ label: 'CO2 (ppm)', data: co2Data.map(d => d.co2), borderColor: '#4CAF50' }]
        },
        options: opts
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderMetrics();
    initCharts();

    
    document.getElementById('loginBtn').addEventListener('click', e => e.preventDefault());
    document.getElementById('registerBtn').addEventListener('click', e => e.preventDefault());
});

