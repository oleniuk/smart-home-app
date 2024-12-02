document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-item');

  const refreshButton = document.getElementById('Refresh');

  const livingRoomLights = document.getElementById('living-room-lights');
  const kitchenSpeaker = document.getElementById('kitchen-speaker');
  const frontDoor = document.getElementById('front-door');

  const audioFiles = {
      song1: new Audio('music/Good-morning.mp3'),
      song2: new Audio('music/Energy.mp3'),
      song3: new Audio('music/Good-night.mp3'),
  };

  let currentPlaying = null; 

  // Функція для зупинки всієї музики
  const stopAllMusic = () => {
      Object.values(audioFiles).forEach(audio => {
          audio.pause();
          audio.currentTime = 0; 
      });
      currentPlaying = null; 
  };

  // Функція для збереження стану перемикачів у localStorage
  const saveState = () => {
      const switchesState = {
          livingRoomLights: livingRoomLights.checked,
          kitchenSpeaker: kitchenSpeaker.checked,
          frontDoor: frontDoor.checked,
      };
      localStorage.setItem('switchesState', JSON.stringify(switchesState));
  };

  // Функція для завантаження стану перемикачів із localStorage
  const loadState = () => {
      const savedState = localStorage.getItem('switchesState');
      if (savedState) {
          const switchesState = JSON.parse(savedState);
          livingRoomLights.checked = switchesState.livingRoomLights || false;
          kitchenSpeaker.checked = switchesState.kitchenSpeaker || false;
          frontDoor.checked = switchesState.frontDoor || false;
      }
  };

  loadState();

  dropdownToggle.addEventListener('click', () => {
      dropdownMenu.classList.toggle('open');
  });

  refreshButton.addEventListener('click', () => {
      // Закриваємо список
      dropdownMenu.classList.remove('open');

      // Вимикаємо всі перемикачі
      livingRoomLights.checked = false;
      kitchenSpeaker.checked = false;
      frontDoor.checked = false;

      // Зупиняємо музику, якщо вона грає
      stopAllMusic();

      // Зберігаємо стан у localStorage
      saveState();
  });

  // Зберігаємо стан перемикачів при зміні кожного з них
  livingRoomLights.addEventListener('change', saveState);
  kitchenSpeaker.addEventListener('change', saveState);
  frontDoor.addEventListener('change', saveState);
});


