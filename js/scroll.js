const screens = document.querySelectorAll('.container');
let currentIndex = 0;

// Функція для переходу до певного екрану
function goToScreen(index) {
  if (index < 0 || index >= screens.length) return;
  currentIndex = index;
  screens[currentIndex].scrollIntoView({ behavior: 'smooth' });
}

// Додаємо функціонал кнопок
document.getElementById('scroll-up').addEventListener('click', (event) => {
  event.stopPropagation(); // Запобігає блокуванню події
  goToScreen(currentIndex - 1); // Перехід на екран вище
});

document.getElementById('scroll-down').addEventListener('click', (event) => {
  event.stopPropagation(); // Запобігає блокуванню події
  goToScreen(currentIndex + 1); // Перехід на екран нижче
});

// Забороняємо лише вертикальну прокрутку сторінки
window.addEventListener(
  'wheel',
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault(); // Блокуємо вертикальну прокрутку
    }
  },
  { passive: false }
);

// Забороняємо вертикальний свайп
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

window.addEventListener(
  'touchmove',
  (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    // Блокуємо тільки вертикальну прокрутку
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      event.preventDefault();
    }
  },
  { passive: false }
);

// Додаткове забезпечення для мобільних пристроїв:
// Додаємо слухачі для подій `touchstart` і `touchend` на кнопках
document.getElementById('scroll-up').addEventListener('touchstart', (event) => {
  event.stopPropagation(); // Запобігає блокуванню події
  event.preventDefault(); // Уникнути конфліктів із swipe
  goToScreen(currentIndex - 1);
});

document.getElementById('scroll-down').addEventListener('touchstart', (event) => {
  event.stopPropagation();
  event.preventDefault();
  goToScreen(currentIndex + 1);
});
