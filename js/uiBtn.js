document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо кнопки
    const ecoModeCheckbox = document.getElementById('eco-mode');
    const airFlowCheckbox = document.getElementById('air-flow');
    const fanSpeedCheckbox = document.getElementById('fan-speed');
    const humidityCheckbox = document.getElementById('humidity');
    const energyDisplay = document.getElementById('Energy');

    const baseEnergy = 17; // Значення, коли ввімкнені дві кнопки
    const energyIncrement = 6; // Збільшення або зменшення коли ввімкнені 4 кнопки


    const updateEnergy = () => {
        const isEcoModeOn = ecoModeCheckbox.checked;
        const isAirFlowOn = airFlowCheckbox.checked;
        const isFanSpeedOn = fanSpeedCheckbox.checked;
        const isHumidityOn = humidityCheckbox.checked;

        const totalOn = [isEcoModeOn, isAirFlowOn, isFanSpeedOn, isHumidityOn].filter(Boolean).length;

        const energy = totalOn === 4 ? baseEnergy + energyIncrement : 
                       totalOn === 0 ? baseEnergy - energyIncrement : baseEnergy;

        energyDisplay.firstChild.textContent = `${energy}`;
    };

    // Зберігаємо стан кнопок у localStorage
    const saveState = () => {
        localStorage.setItem('ecoMode', ecoModeCheckbox.checked);
        localStorage.setItem('airFlow', airFlowCheckbox.checked);
        localStorage.setItem('fanSpeed', fanSpeedCheckbox.checked);
        localStorage.setItem('humidity', humidityCheckbox.checked);
    };

    // Відновлюємо стан кнопок із localStorage
    const restoreState = () => {
        ecoModeCheckbox.checked = JSON.parse(localStorage.getItem('ecoMode')) || false;
        airFlowCheckbox.checked = JSON.parse(localStorage.getItem('airFlow')) || false;
        fanSpeedCheckbox.checked = JSON.parse(localStorage.getItem('fanSpeed')) || false;
        humidityCheckbox.checked = JSON.parse(localStorage.getItem('humidity')) || false;
        updateEnergy();
    };


    [ecoModeCheckbox, airFlowCheckbox, fanSpeedCheckbox, humidityCheckbox].forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            updateEnergy();
            saveState();
        });
    });

    restoreState();
});



//==============Волоігсть==================

document.addEventListener('DOMContentLoaded', () => {
    const indoorsTemperatureElement = document.getElementById('Indoors');
    const humidityCheckbox = document.getElementById('humidity');
    const humiditySensorElement = document.getElementById('Humidity-sensors');

    // Базова вологість
    const baseHumidity = 46;

    const calculateHumidity = (temperature, isHumidityOn) => {
        let humidity = baseHumidity;

        if (temperature > 20) {
            humidity -= 6; // Зменшення вологості, якщо температура > 20°C
        } else if (temperature < 15) {
            humidity += 6; // Збільшення вологості, якщо температура < 15°C
        }

        if (isHumidityOn) {
            humidity += 10; // Додатково +10%, якщо кнопка вологості активна
        }

        return Math.max(0, Math.min(100, humidity)); // Обмеження від 0% до 100%
    };

    const updateHumidity = () => {
        const temperatureText = indoorsTemperatureElement.firstChild.textContent;
        const temperature = parseInt(temperatureText);
        const isHumidityOn = humidityCheckbox.checked;
        const humidity = calculateHumidity(temperature, isHumidityOn);

        humiditySensorElement.firstChild.textContent = `${humidity}`;
    };

    humidityCheckbox.addEventListener('change', updateHumidity);

    const observer = new MutationObserver(updateHumidity);
    observer.observe(indoorsTemperatureElement, { childList: true });

    updateHumidity();
});




