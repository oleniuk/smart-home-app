//=============================Активація кнопок в Devices======
//=====Living room lights==============

const toggleInput = document.getElementById('living-room-lights');
const subtitle = document.querySelector('.ui-card--subtitle');

// Функція для оновлення тексту
function updateSubtitle(isOn) {
    subtitle.textContent = isOn ? '3 on' : '3 off';
}

function saveState(isOn) {
    localStorage.setItem('livingRoomLightsState', isOn ? 'on' : 'off');
}

function loadState() {
    const savedState = localStorage.getItem('livingRoomLightsState');
    return savedState === 'on'; 
}

document.addEventListener('DOMContentLoaded', () => {
    const isOn = loadState();
    toggleInput.checked = isOn; 
    updateSubtitle(isOn); 
});

toggleInput.addEventListener('change', () => {
    const isOn = toggleInput.checked;
    updateSubtitle(isOn); 
    saveState(isOn); 
});