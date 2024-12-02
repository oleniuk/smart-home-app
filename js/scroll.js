const screens = document.querySelectorAll('.container');
let currentIndex = 0;

// Функція для переходу до певного екрану
function goToScreen(index) {
  if (index < 0 || index >= screens.length) return;
  currentIndex = index;
  screens[currentIndex].scrollIntoView({ behavior: 'smooth' });
}

// Додаємо функціонал кнопок
document.getElementById('scroll-up').addEventListener('click', () => {
  goToScreen(currentIndex - 1); // Перехід на екран вище
});

document.getElementById('scroll-down').addEventListener('click', () => {
  goToScreen(currentIndex + 1); // Перехід на екран нижче
});

// Забороняємо скрол мишею
window.addEventListener('wheel', (event) => {
  event.preventDefault(); // Відключає прокрутку сторінки
}, { passive: false });

// Забороняємо скрол через свайпи (мобільні пристрої)
window.addEventListener('touchmove', (event) => {
  event.preventDefault(); // Відключає прокрутку сторінки
}, { passive: false });
