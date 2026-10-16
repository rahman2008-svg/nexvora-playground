import { BoilerplateTemplate } from '../types';

export const BOILERPLATES: BoilerplateTemplate[] = [
  {
    id: 'nexvora-starter',
    name: 'NexVora Interactive Playground',
    category: 'Starter',
    description: 'Interactive counter, real-time color themes, and canvas graphics',
    iconName: 'Sparkles',
    badge: 'Popular',
    html: `<div class="container">
  <div class="card">
    <div class="badge">NexVora Lab's Ofc</div>
    <h1 id="title">Welcome to NexVora Playground</h1>
    <p class="subtitle">Edit HTML, CSS, and JS — results update in real-time!</p>
    
    <div class="counter-box">
      <span class="label">Interactive Counter</span>
      <div class="counter-display" id="counter-val">0</div>
      <div class="btn-group">
        <button id="btn-dec" class="btn secondary">-1</button>
        <button id="btn-reset" class="btn secondary">Reset</button>
        <button id="btn-inc" class="btn primary">+1</button>
      </div>
    </div>

    <div class="actions">
      <button id="btn-theme" class="btn-toggle">✨ Cycle Accent Color</button>
      <button id="btn-log" class="btn-toggle">📟 Test Console</button>
    </div>

    <div class="canvas-wrap">
      <canvas id="live-canvas" width="400" height="120"></canvas>
    </div>
  </div>
</div>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --accent: #0084ff;
  --accent-glow: rgba(0, 132, 255, 0.25);
  --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  --card-bg: rgba(30, 41, 59, 0.7);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.08);
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background: var(--bg-gradient);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.container {
  width: 100%;
  max-width: 520px;
}

.card {
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.counter-box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
}

.label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.counter-display {
  font-size: 48px;
  font-weight: 700;
  font-family: monospace;
  color: var(--accent);
  margin: 8px 0;
  transition: transform 0.15s ease;
}

.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn.primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 12px var(--accent-glow);
}

.btn.primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-toggle {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-toggle:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
}

.canvas-wrap {
  border-radius: 10px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid var(--border-color);
}

canvas {
  display: block;
  width: 100%;
  height: 90px;
}`,
    javascript: `// Interactive state
let count = 0;
const counterDisplay = document.getElementById('counter-val');
const btnInc = document.getElementById('btn-inc');
const btnDec = document.getElementById('btn-dec');
const btnReset = document.getElementById('btn-reset');
const btnTheme = document.getElementById('btn-theme');
const btnLog = document.getElementById('btn-log');

const colors = ['#0084ff', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
let colorIndex = 0;

function updateDisplay() {
  counterDisplay.textContent = count;
  counterDisplay.style.transform = 'scale(1.12)';
  setTimeout(() => counterDisplay.style.transform = 'scale(1)', 150);
}

btnInc.addEventListener('click', () => {
  count++;
  updateDisplay();
  console.log('Count incremented:', count);
});

btnDec.addEventListener('click', () => {
  count--;
  updateDisplay();
  console.log('Count decremented:', count);
});

btnReset.addEventListener('click', () => {
  count = 0;
  updateDisplay();
  console.info('Counter reset to zero.');
});

btnTheme.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % colors.length;
  const newColor = colors[colorIndex];
  document.documentElement.style.setProperty('--accent', newColor);
  document.documentElement.style.setProperty('--accent-glow', newColor + '40');
  console.log('Accent color switched to:', newColor);
});

btnLog.addEventListener('click', () => {
  console.log('NexVora Playground runtime nominal');
  console.warn('Developer Notice: All systems running smoothly');
  console.info('Created by Prince AR Abdur Rahman · NexVora Lab\\'s Ofc');
});

// Animated wave canvas
const canvas = document.getElementById('live-canvas');
const ctx = canvas.getContext('2d');
let step = 0;

function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = colors[colorIndex];

  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin((x + step) * 0.05) * 20 + canvas.height / 2;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  step += 2;
  requestAnimationFrame(drawWave);
}

drawWave();
console.log('NexVora Playground initialized successfully.');`,
    externalResources: []
  },
  {
    id: 'tailwind-3d',
    name: 'Tailwind CSS 3D Glass Card',
    category: 'CSS & Design',
    description: 'Modern glassmorphic card with dynamic mouse tilt effect',
    iconName: 'Layout',
    badge: 'Tailwind',
    html: `<div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 selection:bg-cyan-500 selection:text-black">
  <div class="relative group">
    <!-- Glow behind card -->
    <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500"></div>
    
    <!-- 3D Card -->
    <div id="card" class="relative w-80 md:w-96 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-7 shadow-2xl transition-transform duration-200 ease-out">
      <div class="flex items-center justify-between mb-6">
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          NexVora Lab's Ofc
        </span>
        <span class="text-xs text-slate-400 font-mono">v1.0.0</span>
      </div>

      <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-cyan-500/20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>

      <h2 class="text-xl font-bold text-white tracking-tight mb-2">Modern Android & Web Engineering</h2>
      <p class="text-slate-400 text-sm leading-relaxed mb-6">
        Building next-gen digital experiences, productivity tools, and AI-powered interfaces.
      </p>

      <div class="pt-4 border-t border-white/5 flex items-center justify-between">
        <div class="text-xs text-slate-400">
          Developer: <span class="text-slate-200 font-medium">Prince AR Abdur Rahman</span>
        </div>
        <button id="tilt-btn" class="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
          Pulse Effect
        </button>
      </div>
    </div>
  </div>
</div>`,
    css: `/* Custom perspective for card tilt */
body {
  perspective: 1000px;
  overflow: hidden;
}`,
    javascript: `const card = document.getElementById('card');
const btn = document.getElementById('tilt-btn');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;
  
  card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)\`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

btn.addEventListener('click', () => {
  card.classList.add('animate-pulse');
  console.log('Triggered pulse animation on card');
  setTimeout(() => card.classList.remove('animate-pulse'), 1000);
});

console.log('Tailwind 3D Tilt Card ready!');`,
    externalResources: [
      {
        id: 'tw-cdn',
        name: 'Tailwind CSS CDN',
        url: 'https://cdn.tailwindcss.com',
        type: 'js',
        enabled: true
      }
    ]
  },
  {
    id: 'canvas-particles',
    name: 'HTML5 Interactive Particle Vortex',
    category: 'Graphics & Canvas',
    description: 'Dynamic canvas physics simulator with mouse attraction',
    iconName: 'Activity',
    badge: 'Canvas',
    html: `<div class="canvas-container">
  <canvas id="stage"></canvas>
  <div class="hud">
    <div class="hud-title">NexVora Particle Engine</div>
    <div class="hud-sub">Move mouse to attract · Click to burst</div>
    <div class="stats" id="particle-count">Particles: 120</div>
  </div>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #090d16;
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
}

.canvas-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.hud {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 18px;
  pointer-events: none;
}

.hud-title {
  font-size: 14px;
  font-weight: 700;
  color: #38bdf8;
  letter-spacing: 0.02em;
}

.hud-sub {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}

.stats {
  font-size: 12px;
  font-family: monospace;
  color: #e2e8f0;
  margin-top: 8px;
}`,
    javascript: `const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const countDisplay = document.getElementById('particle-count');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const mouse = { x: width / 2, y: height / 2, active: false };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

window.addEventListener('mouseleave', () => {
  mouse.active = false;
});

class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * width;
    this.y = y || Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = Math.random() * 2 + 1.5;
    this.baseRadius = this.radius;
    this.hue = Math.random() * 60 + 190; // Cyan to blue
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
      }
    }

    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = \`hsl(\${this.hue}, 85%, 65%)\`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = \`hsl(\${this.hue}, 85%, 65%)\`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const particles = [];
const TOTAL = 120;
for (let i = 0; i < TOTAL; i++) {
  particles.push(new Particle());
}

window.addEventListener('click', (e) => {
  for (let i = 0; i < 20; i++) {
    const p = new Particle(e.clientX, e.clientY);
    p.vx = (Math.random() - 0.5) * 8;
    p.vy = (Math.random() - 0.5) * 8;
    particles.push(p);
  }
  countDisplay.textContent = \`Particles: \${particles.length}\`;
  console.log('Particles spawned! Current count:', particles.length);
});

function loop() {
  ctx.fillStyle = 'rgba(9, 13, 22, 0.2)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = \`rgba(56, 189, 248, \${1 - dist / 90 * 0.8})\`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(loop);
}

loop();
console.info('NexVora Particle Canvas running at 60 FPS');`,
    externalResources: []
  },
  {
    id: 'task-manager',
    name: 'NexVora Productivity Task Manager',
    category: 'Productivity',
    description: 'Clean task organizer with filters, counters, and local persistence',
    iconName: 'CheckSquare',
    badge: 'App',
    html: `<div class="app-shell">
  <header class="app-header">
    <div class="app-brand">
      <span class="logo-mark">✓</span>
      <div>
        <h1>NexVora Tasks</h1>
        <p>Prince AR Abdur Rahman · v1.0.0</p>
      </div>
    </div>
    <div class="stats-badge" id="stats-counter">0 of 0 completed</div>
  </header>

  <form id="task-form" class="task-input-bar">
    <input type="text" id="task-input" placeholder="What needs to be done today?" autocomplete="off" required />
    <button type="submit" class="add-btn">Add Task</button>
  </form>

  <div class="filter-bar">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="active">Active</button>
    <button class="filter-btn" data-filter="completed">Completed</button>
  </div>

  <ul id="task-list" class="task-list"></ul>

  <footer class="app-footer">
    <span id="items-left">0 items left</span>
    <button id="clear-completed" class="text-btn">Clear Completed</button>
  </footer>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #0e131f;
  color: #f1f5f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.app-shell {
  width: 100%;
  max-width: 480px;
  background: #182032;
  border: 1px solid #29354d;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-mark {
  width: 34px;
  height: 34px;
  background: #0284c7;
  color: #fff;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.app-brand h1 {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.app-brand p {
  font-size: 11px;
  color: #94a3b8;
}

.stats-badge {
  font-size: 11px;
  background: #242f45;
  padding: 4px 10px;
  border-radius: 999px;
  color: #38bdf8;
  font-family: monospace;
}

.task-input-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.task-input-bar input {
  flex: 1;
  background: #0f1624;
  border: 1px solid #2e3c57;
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  font-size: 14px;
  outline: none;
}

.task-input-bar input:focus {
  border-color: #0284c7;
}

.add-btn {
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.add-btn:hover {
  background: #0369a1;
}

.filter-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}

.filter-btn {
  background: transparent;
  border: 1px solid #2e3c57;
  color: #94a3b8;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.filter-btn.active {
  background: #242f45;
  color: #38bdf8;
  border-color: #38bdf8;
}

.task-list {
  list-style: none;
  max-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #111726;
  border: 1px solid #243047;
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.2s;
}

.task-item.completed span {
  text-decoration: line-through;
  color: #64748b;
}

.task-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.task-item input[type="checkbox"] {
  accent-color: #0284c7;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.delete-btn:hover {
  color: #ef4444;
}

.app-footer {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #243047;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
}

.text-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.text-btn:hover {
  color: #fff;
}`,
    javascript: `const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const stats = document.getElementById('stats-counter');
const itemsLeft = document.getElementById('items-left');
const clearBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let tasks = [
  { id: 1, text: 'Review NexVora Android app architecture', completed: true },
  { id: 2, text: 'Design playground split-pane code editor', completed: true },
  { id: 3, text: 'Test real-time console communication', completed: false },
  { id: 4, text: 'Ship NexVora Playground v1.0.0', completed: false }
];

function render() {
  list.innerHTML = '';
  const filtered = tasks.filter(t => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = \`task-item \${task.completed ? 'completed' : ''}\`;
    li.innerHTML = \`
      <div class="task-left">
        <input type="checkbox" \${task.completed ? 'checked' : ''} data-id="\${task.id}">
        <span>\${task.text}</span>
      </div>
      <button class="delete-btn" data-id="\${task.id}">×</button>
    \`;
    list.appendChild(li);
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.length - completedCount;
  stats.textContent = \`\${completedCount} of \${tasks.length} completed\`;
  itemsLeft.textContent = \`\${activeCount} item\${activeCount === 1 ? '' : 's'} left\`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  input.value = '';
  render();
  console.log('Added task:', text);
});

list.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.matches('input[type="checkbox"]')) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = e.target.checked;
      render();
      console.log('Task status toggled:', task.text, task.completed);
    }
  } else if (e.target.matches('.delete-btn')) {
    tasks = tasks.filter(t => t.id !== id);
    render();
    console.warn('Deleted task ID:', id);
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  render();
  console.info('Cleared completed tasks');
});

render();
console.log('NexVora Tasks ready!');`,
    externalResources: []
  }
];
