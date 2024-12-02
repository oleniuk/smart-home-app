// Забороняємо лише вертикальну прокрутку сторінки
window.addEventListener(
  'wheel',
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      // Якщо прокрутка вертикальна, блокуємо її
      event.preventDefault();
    }
  },
  { passive: false }
);

// Обробка свайпів, щоб заборонити вертикальну прокрутку
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
