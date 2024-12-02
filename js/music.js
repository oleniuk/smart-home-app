document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо елементи
    const musicToggle = document.getElementById('music-toggle');
    const songsContainer = document.getElementById('songs-container');
    const songButtons = document.querySelectorAll('.music_btn');
    const kitchenSpeakerToggle = document.getElementById('kitchen-speaker');
    const kitchenSubtitle = document.getElementById('now-plaing');
    const refreshButton = document.getElementById('Refresh'); 

    const audioFiles = {
        song1: new Audio('music/Good-morning.mp3'),
        song2: new Audio('music/Energy.mp3'),
        song3: new Audio('music/Good-night.mp3'),
    };

    let currentPlaying = null; 

    // Завантаження стану з localStorage
    function loadState() {
        const savedState = localStorage.getItem('musicState');
        if (savedState) {
            const { playingSong, kitchenSpeakerChecked } = JSON.parse(savedState);

            // Якщо була активна пісня, відновлюємо її
            if (playingSong) {
                const button = document.getElementById(playingSong);
                currentPlaying = button;
                audioFiles[playingSong].play();
                button.classList.add('on');
                button.classList.remove('off');
                button.querySelector('.status').textContent = 'on';
                updateKitchenSpeaker(playingSong);
            }

            // Відновлюємо стан Kitchen Speaker
            kitchenSpeakerToggle.checked = kitchenSpeakerChecked || false;
        }
    }

    // Збереження стану в localStorage
    function saveState() {
        const state = {
            playingSong: currentPlaying ? currentPlaying.id : null,
            kitchenSpeakerChecked: kitchenSpeakerToggle.checked,
        };
        localStorage.setItem('musicState', JSON.stringify(state));
    }

    // Функція для оновлення стану Kitchen Speaker
    function updateKitchenSpeaker(songId = null) {
        if (songId) {
            kitchenSpeakerToggle.checked = true; // Вкл. Kitchen Speaker
            kitchenSubtitle.textContent = `Now playing: ${
                songId === 'song1' ? 'Good morning' : songId === 'song2' ? 'Energy' : 'Good night'
            }`;
        } else {
            kitchenSpeakerToggle.checked = false; // Викл. Kitchen Speaker
            kitchenSubtitle.textContent = 'Music stopped';
        }
        saveState();
    }

    // Функція для зупинки всієї музики
    function stopAllMusic() {
        if (currentPlaying) {
            const currentId = currentPlaying.id;
            audioFiles[currentId].pause();
            audioFiles[currentId].currentTime = 0; 
            currentPlaying.classList.remove('on');
            currentPlaying.classList.add('off');
            currentPlaying.querySelector('.status').textContent = 'off';
            currentPlaying = null;
        }
        updateKitchenSpeaker(null); 
    }

    // Обробка кліків на кнопки пісень
    songButtons.forEach(button => {
        button.addEventListener('click', () => {
            const songId = button.id;

            // Якщо кнопка вже активна, зупиняємо музику
            if (currentPlaying === button) {
                audioFiles[songId].pause();
                audioFiles[songId].currentTime = 0; 
                button.classList.remove('on');
                button.classList.add('off');
                button.querySelector('.status').textContent = 'off';
                currentPlaying = null;
                updateKitchenSpeaker(null); 
            } else {
                // Зупиняємо попередню пісню
                if (currentPlaying) {
                    const currentId = currentPlaying.id;
                    audioFiles[currentId].pause();
                    audioFiles[currentId].currentTime = 0;
                    currentPlaying.classList.remove('on');
                    currentPlaying.classList.add('off');
                    currentPlaying.querySelector('.status').textContent = 'off';
                }

                // Запускаємо нову пісню
                audioFiles[songId].play();
                button.classList.add('on');
                button.classList.remove('off');
                button.querySelector('.status').textContent = 'on';
                currentPlaying = button;
                updateKitchenSpeaker(songId); 
            }
            saveState(); 
        });
    });

    // Обробка перемикача Kitchen Speaker
    kitchenSpeakerToggle.addEventListener('change', () => {
        if (kitchenSpeakerToggle.checked) {
            // Якщо перемикач увімкнено, але нічого не грає, запускаємо Energy
            if (!currentPlaying) {
                const songId = 'song2'; // Energy грає за замовчуванням
                audioFiles[songId].play();
                kitchenSubtitle.textContent = 'Now playing: Energy';
                currentPlaying = document.getElementById(songId);
                currentPlaying.classList.add('on');
                currentPlaying.classList.remove('off');
                currentPlaying.querySelector('.status').textContent = 'on';
            }
        } else {
            // Якщо перемикач вимкнено, зупиняємо музику
            stopAllMusic();
        }
        saveState(); 
    });

    // Обробка кнопки Refresh
    refreshButton.addEventListener('click', () => {
        // Вимикаємо всі перемикачі та музику
        stopAllMusic();
        kitchenSpeakerToggle.checked = false;
        saveState();
        console.log('All devices have been turned off, and music has stopped.');
    });

    // Встановлюємо off для всіх кнопок
    songButtons.forEach(button => {
        button.querySelector('.status').textContent = 'off';
        button.classList.add('off');
    });

    // Перемикаємо видимість пісень
    musicToggle.addEventListener('click', () => {
        if (songsContainer.classList.contains('hidden')) {
            songsContainer.classList.remove('hidden');
            songsContainer.classList.add('visible');
        } else {
            songsContainer.classList.remove('visible');
            songsContainer.classList.add('hidden');
        }
    });

    loadState();
});



