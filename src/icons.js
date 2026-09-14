const paths = {
  github: '<path d="M15 22c-5 1.5-5-2.5-7-3m14 6v-4a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 26.4 7a5 5 0 0 0-.1-4S25.1 2.6 22 4.5a15.4 15.4 0 0 0-8 0C10.9 2.6 9.7 3 9.7 3A5 5 0 0 0 9.6 7a5.4 5.4 0 0 0-1.4 4.2c0 5.4 3.5 6.6 6.8 7A3.4 3.4 0 0 0 14 21v4"/>',
  linkedin: '<path d="M8 11v10M8 7v.01M12 21V11m0 4a4 4 0 0 1 8 0v6"/>',
  mail: '<path d="M4 4h20v18H4zM4 7l10 7 10-7"/>',
  external: '<path d="M18 3h7v7M15 13L25 3M22 15v10H3V6h10"/>',
  eye: '<path d="M2 16s5-8 14-8 14 8 14 8-5 8-14 8S2 16 2 16z"/><circle cx="16" cy="16" r="3.5"/>',
  close: '<path d="M7 7l18 18M25 7L7 25"/>',
  layout: '<rect x="4" y="5" width="24" height="22" rx="2"/><path d="M4 11h24M11 11v16"/>',
  server: '<rect x="4" y="5" width="24" height="9" rx="2"/><rect x="4" y="18" width="24" height="9" rx="2"/><path d="M8 9h.01M8 22h.01"/>',
  cloud: '<path d="M9 25H8a5 5 0 0 1-.9-9.9A8 8 0 0 1 22 11a6 6 0 0 1 1 11.9h-1"/><path d="M16 15v12M12 23l4 4 4-4"/>',
  settings: '<circle cx="16" cy="16" r="4"/><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M25.2 6.8l-2.1 2.1M8.9 23.1l-2.1 2.1"/>',
  database: '<ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v9c0 2.2 4.9 4 11 4s11-1.8 11-4V7M5 16v9c0 2.2 4.9 4 11 4s11-1.8 11-4v-9"/>',
  award: '<circle cx="16" cy="13" r="8"/><path d="M11 20l-2 9 7-4 7 4-2-9"/>',
  code: '<path d="M11 8l-7 8 7 8M21 8l7 8-7 8M19 4l-6 24"/>',
  arrow: '<path d="M5 16h22M21 10l6 6-6 6"/>',
  sun: '<circle cx="16" cy="16" r="5"/><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M25.2 6.8l-2.1 2.1M8.9 23.1l-2.1 2.1"/>',
  moon: '<path d="M25 20.2A11 11 0 0 1 11.8 7 10.5 10.5 0 1 0 25 20.2z"/>',
}

export function icon(name, className = 'size-5') {
  return `<svg class="${className}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`
}
