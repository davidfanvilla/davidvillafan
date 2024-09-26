let points = [];
let numPoints = 300;
let maxSize = 10;
let cvGraphics;
let contentHeight = 4000;
let scrollY = 0;
let touchStartY = 0;
let velocity = 0;
let lastTime = 0;
let scrolling = false;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(contentHeight),
      size: random(3, maxSize),
      grow: random(0.02, 0.05),
      direction: random([1, -1]),
      speedX: random(-1, 1),
      speedY: random(-1, 1),
      accelX: random(-0.01, 0.01),
      accelY: random(-0.01, 0.01),
    });
  }

  cvGraphics = createGraphics(windowWidth, contentHeight);
  cvGraphics.textFont('Arial');
  cvGraphics.textAlign(CENTER, TOP);

  dibujarCV();
}

function draw() {
  background(10);
  
  let currentTime = millis();
  let deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  
  scrollY += velocity * deltaTime;
  velocity *= 0.95; // Reducir la velocidad para inercia
  
  scrollY = constrain(scrollY, 0, contentHeight - height); // Limitar el scroll para no pasarse del contenido

  push();
  translate(0, -scrollY); // Aplicar el desplazamiento de scroll
  
  // Dibujar puntos y conexiones neuronales
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    
    p.size += p.grow * p.direction;
    if (p.size > maxSize || p.size < 3) {
      p.direction *= -1;
    }
    
    p.speedX += p.accelX;
    p.speedY += p.accelY;
    p.x += p.speedX;
    p.y += p.speedY;
    
    if (p.x < 0 || p.x > width) p.speedX *= -1;
    if (p.y < 0 || p.y > contentHeight) p.speedY *= -1;
    
    fill(255, 100, 255);
    noStroke();
    ellipse(p.x, p.y + scrollY, p.size, p.size);
    
    for (let j = i + 1; j < points.length; j++) {
      let p2 = points[j];
      let d = dist(p.x, p.y + scrollY, p2.x, p2.y + scrollY);
      
      if (d < 150) {
        stroke(255, 50);
        line(p.x, p.y + scrollY, p2.x, p2.y + scrollY);
      }
    }
  }
  
  image(cvGraphics, 0, 0);
  
  pop();

  drawScrollbar();
}

function dibujarCV() {
  cvGraphics.clear();
  
  let titleSize = min(windowWidth * 0.05, 28);
  let subtitleSize = min(windowWidth * 0.035, 20);
  let sectionTitleSize = min(windowWidth * 0.045, 24);
  let textGap = min(windowWidth * 0.04, 25);

  let margin = 20;
  let effectiveWidth = windowWidth - 2 * margin;

  function drawTextWithShadow(text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let testWidth = cvGraphics.textWidth(testLine);
      if (testWidth > maxWidth && n > 0) {
        cvGraphics.fill(0);
        cvGraphics.text(line, x + 1, y + 1);
        cvGraphics.fill(255);
        cvGraphics.text(line, x, y);
        y += lineHeight;
        line = words[n] + ' ';
      }
      else {
        line = testLine;
      }
    }
    cvGraphics.fill(0);
    cvGraphics.text(line, x + 1, y + 1);
    cvGraphics.fill(255);
    cvGraphics.text(line, x, y);
    return y + lineHeight;
  }

  // Código para dibujar el CV
  cvGraphics.textSize(titleSize);
  let startY = 50;
  startY = drawTextWithShadow("David Villafán Sánchez", windowWidth / 2, startY, effectiveWidth, titleSize * 1.5);

  cvGraphics.textSize(subtitleSize);
  startY = drawTextWithShadow("Fecha de nacimiento: 18/02/1990", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("Correo: davidvillafan180290@hotmail.com", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("Teléfono: 55 22 72 45 85", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);

  cvGraphics.textSize(sectionTitleSize);
  startY = drawTextWithShadow("Habilidades:", windowWidth / 2, startY + textGap * 2, effectiveWidth, sectionTitleSize * 1.5);

  cvGraphics.textSize(subtitleSize);
  startY = drawTextWithShadow("Buena comunicación / Resolución de problemas", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("Liderazgo / Adaptación / Persuasivo", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);

  cvGraphics.textSize(sectionTitleSize);
  startY = drawTextWithShadow("Experiencia Laboral:", windowWidth / 2, startY + textGap * 2, effectiveWidth, sectionTitleSize * 1.5);

  cvGraphics.textSize(subtitleSize);
  startY = drawTextWithShadow("Escuela de Aviación México", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("· Jefe de Operaciones Aéreas", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("· Area de Compras de partes aeronáuticas", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("· Administrativo en el Área de Control Escolar", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);

  cvGraphics.textSize(sectionTitleSize);
  startY = drawTextWithShadow("Herramientas de trabajo:", windowWidth / 2, startY + textGap * 2, effectiveWidth, sectionTitleSize * 1.5);

  cvGraphics.textSize(subtitleSize);
  startY = drawTextWithShadow("Uso de prompts para IA: ChatGPT, Gemini (google), Groq, Claude, Dall-e (generación de imagenes por texto), con todos ellos puedo dieñar una pagina web desde cero, hacer proyectos de de programacion y arte generativa.", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("Software: Paquetería de Office, Blender (Diseño y Renderización en 3D y AR), Processing (Arte generativo) P5.js (arte generativo)", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
  startY = drawTextWithShadow("Lenguajes de Programación: Javascript, HTML, CSS", windowWidth / 2, startY + textGap, effectiveWidth, subtitleSize * 1.5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cvGraphics.resizeCanvas(windowWidth, contentHeight);
  dibujarCV();
}

function mouseWheel(event) {
  velocity += event.delta * 0.1;
  return false;
}

function touchStarted() {
  touchStartY = mouseY; // Almacenar el inicio del toque
  scrolling = true;
  velocity = 0; // Reiniciar la velocidad cuando el toque comienza
  return false;
}

function touchMoved() {
  if (scrolling) {
    let touchY = mouseY;
    let deltaY = touchStartY - touchY; // Diferencia del toque
    scrollY = constrain(scrollY + deltaY, 0, contentHeight - height); // Desplazamiento dentro de los límites
    touchStartY = touchY; // Actualizar la posición inicial para el siguiente movimiento
  }
  return false;
}

function touchEnded() {
  scrolling = false; // Detener el scroll cuando se suelta
  return false;
}

function drawScrollbar() {
  fill(0);
  noStroke();
  rect(0, height - 20, 10, 20);
  
  let scrollbarPosition = map(scrollY, 0, contentHeight - height, 0, 20);
  fill(255);
  rect(0, height - 20, 10, scrollbarPosition);
}