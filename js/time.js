//==========================Налаштування часу==============
function updateAllTimes() {
    const timeElements = document.querySelectorAll('#time');
  
    // Отримуємо поточний час
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    timeElements.forEach(element => {
        element.textContent = `${hours}:${minutes}`;
    });
  }
  updateAllTimes();
  setInterval(updateAllTimes, 60000);
  

//==========================Налаштування зарядки==============
  
function updateAllPowerLevels() {
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {

            const updatePower = () => {
                const powerElements = document.querySelectorAll('#power');
                const batteryLevel = Math.round(battery.level * 100) + '%';

                powerElements.forEach(element => {
                    element.textContent = batteryLevel;
                });
            };

            updatePower();
    
            battery.addEventListener('levelchange', updatePower);
        });
    } else {
        console.error('Battery Status API is not supported on this browser.');
    }
}

  updateAllPowerLevels();
  
