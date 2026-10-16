import { ExternalResource } from '../types';

export const POPULAR_RESOURCES: Omit<ExternalResource, 'id' | 'enabled'>[] = [
  {
    name: 'Tailwind CSS (Play CDN)',
    url: 'https://cdn.tailwindcss.com',
    type: 'js'
  },
  {
    name: 'Font Awesome 6.5 (Icons)',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    type: 'css'
  },
  {
    name: 'Bootstrap 5.3 (CSS)',
    url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    type: 'css'
  },
  {
    name: 'Bootstrap 5.3 (JS Bundle)',
    url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    type: 'js'
  },
  {
    name: 'Animate.css',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    type: 'css'
  },
  {
    name: 'jQuery 3.7.1',
    url: 'https://code.jquery.com/jquery-3.7.1.min.js',
    type: 'js'
  },
  {
    name: 'Chart.js 4.4',
    url: 'https://cdn.jsdelivr.net/npm/chart.js',
    type: 'js'
  },
  {
    name: 'Three.js (3D Graphics)',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    type: 'js'
  },
  {
    name: 'GSAP 3.12 (GreenSock Animation)',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    type: 'js'
  },
  {
    name: 'Lodash 4.17.21',
    url: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
    type: 'js'
  },
  {
    name: 'Canvas Confetti',
    url: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    type: 'js'
  }
];
