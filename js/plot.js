document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('energy-chart');
    const draggablePoint = document.getElementById('draggable-point');
    const pointLabel = document.getElementById('point-label');
    const path = svg.querySelector('path');
  
    // Функція для обчислення найближчої точки на шляху
    const getClosestPointOnPath = (path, x) => {
      const pathLength = path.getTotalLength();
      let closestDistance = Infinity;
      let closestPoint = null;
  
      for (let i = 0; i <= pathLength; i++) {
        const point = path.getPointAtLength(i);
        const distance = Math.abs(point.x - x);
  
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = point;
        }
      }
      return closestPoint;
    };
  
    const updateDraggablePoint = (x) => {
      const point = getClosestPointOnPath(path, x);
  
      // Оновлення позиції точки
      draggablePoint.setAttribute('cx', point.x);
      draggablePoint.setAttribute('cy', point.y);
  
      // Оновлення тексту над крапкою
      const value = Math.round((170 - point.y) * 10 / 2); // Зміна масштабу
      pointLabel.textContent = value;
      pointLabel.setAttribute('x', point.x);
      pointLabel.setAttribute('y', point.y - 20); // Розміщення тексту над крапкою
    };
  
    let isDragging = false;
  
    draggablePoint.addEventListener('mousedown', () => {
      isDragging = true;
    });
  
    document.addEventListener('mousemove', (event) => {
      if (!isDragging) return;
  
      const svgRect = svg.getBoundingClientRect();
      const mouseX = event.clientX - svgRect.left;
  
      if (mouseX >= 50 && mouseX <= 310) { // Обмеження в межах графіка
        updateDraggablePoint(mouseX);
      }
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    // Початкова позиція
    updateDraggablePoint(180);
  });
  