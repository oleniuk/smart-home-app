document.addEventListener('DOMContentLoaded', () => {
    const rangeSelector = document.getElementById('range--selector');
    const dialValueElement = document.querySelector('.ui--dial-value');
    const dialStatusElement = document.querySelector('.ui--dial-status');
    const indoorsValueElement = document.getElementById('Indoors'); 
    const temperatureValueElement = document.getElementById('Temperature');

    // Центр і радіус траєкторії
    const centerX = 125;
    const centerY = 130; 
    const radius = 110; 

    // Мінімальна і максимальна температура
    const minTemperature = 0;
    const maxTemperature = 30;

    let isDragging = false;
    let currentDegrees = parseInt(localStorage.getItem('currentDegrees')) || -180;
    let indoorsTemperature = parseInt(localStorage.getItem('currentIndoorsTemperature')) || 18;

    // Встановлюємо початкове значення Indoors і Temperature
    indoorsValueElement.innerHTML = `${indoorsTemperature}<span class="suffix">°C</span>`;
    temperatureValueElement.innerHTML = `${indoorsTemperature}<span class="suffix">°C</span>`;

    // Оновлення маркера і температури
    const updateUI = (degrees) => {
        const limitedAngle = (degrees * Math.PI) / 180;
        const markerX = centerX + radius * Math.cos(limitedAngle);
        const markerY = centerY + radius * Math.sin(limitedAngle);
        rangeSelector.style.left = `${markerX - rangeSelector.offsetWidth / 2}px`;
        rangeSelector.style.top = `${markerY - rangeSelector.offsetHeight / 2}px`;

        const temperature = Math.round(
            ((degrees + 180) / 180) * (maxTemperature - minTemperature) + minTemperature
        );
        dialValueElement.textContent = `${temperature}°C`;
        dialStatusElement.textContent = `Heating to`;

        // Зберігаємо поточні значення в localStorage
        localStorage.setItem('currentDegrees', degrees);
        localStorage.setItem('currentTemperature', temperature);

        // Поступово змінюємо Indoors до нової температури
        updateIndoorsTemperature(temperature);
    };

    // Поступове оновлення Indoors
    const updateIndoorsTemperature = (targetTemperature) => {
        clearInterval(window.indoorsUpdateInterval); // Видаляємо попередній інтервал, якщо він є

        window.indoorsUpdateInterval = setInterval(() => {
            if (indoorsTemperature < targetTemperature) {
                indoorsTemperature++;
            } else if (indoorsTemperature > targetTemperature) {
                indoorsTemperature--;
            } else {
                clearInterval(window.indoorsUpdateInterval); // Зупиняємо інтервал, якщо досягли значення
            }

            indoorsValueElement.innerHTML = `${indoorsTemperature}<span class="suffix">°C</span>`;
            temperatureValueElement.innerHTML = `${indoorsTemperature}<span class="suffix">°C</span>`;
            localStorage.setItem('currentIndoorsTemperature', indoorsTemperature); 
        }, 1000); 
    };

    // Відновлення початкового стану з localStorage
    updateUI(currentDegrees);

    // Події для миші
    rangeSelector.addEventListener('mousedown', () => {
        isDragging = true;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const rect = rangeSelector.offsetParent.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        let degrees = (angle * 180) / Math.PI;

        if (degrees > 0) return;

        if (degrees < -180) degrees = -180;
        if (degrees > 0) degrees = 0;

        currentDegrees = degrees;
        updateUI(currentDegrees);
    });

    // Події для сенсорних пристроїв
    rangeSelector.addEventListener('touchstart', () => {
        isDragging = true;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });

    document.addEventListener('touchmove', (event) => {
        if (!isDragging) return;

        const rect = rangeSelector.offsetParent.getBoundingClientRect();
        const touch = event.touches[0];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        let angle = Math.atan2(touchY - centerY, touchX - centerX);
        let degrees = (angle * 180) / Math.PI;

        if (degrees > 0) return;

        if (degrees < -180) degrees = -180;
        if (degrees > 0) degrees = 0;

        currentDegrees = degrees;
        updateUI(currentDegrees);
    });

    const savedTemperature = parseInt(localStorage.getItem('currentTemperature')) || 18;
    updateIndoorsTemperature(savedTemperature);
});

//=====================Підключення температури для Outdoors через API=============
const outdoorsValueElement = document.getElementById('Outdoors'); 

// URL до відкритого погодного API
const apiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=50.4501&lon=30.5234'; // Координати Києва

// Отримання температури
fetch(apiUrl, {
    headers: {
        'User-Agent': 'YourAppName' // Met.no вимагає User-Agent
    }
})
    .then(response => {
        if (!response.ok) throw new Error('Помилка при отриманні даних');
        return response.json();
    })
    .then(data => {
        // Знаходимо поточну температуру
        const temperature = Math.round(data.properties.timeseries[0].data.instant.details.air_temperature);

        // Оновлення інтерфейсу
        outdoorsValueElement.innerHTML = `${temperature}<span class="suffix">°C</span>`;
    })
    .catch(error => {
        console.error('Помилка:', error);
        outdoorsValueElement.innerHTML = `-<span class="suffix">°C</span>`;
    });
