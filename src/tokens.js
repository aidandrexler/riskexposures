export const C = {
  bg:          '#faf8f4',
  surface:     '#ffffff',
  surfaceAlt:  '#f5f2ec',
  border:      '#e2ddd6',
  borderDark:  '#c8c0b4',
  accent:      '#9a7c4a',
  accentLight: '#c8a96e',
  accentBg:    '#fdf6ec',
  red:         '#b84040',
  redBg:       '#fdf2f2',
  yellow:      '#9a6e20',
  yellowBg:    '#fdf8ec',
  green:       '#2e7a52',
  greenBg:     '#f0f9f4',
  text:        '#1a1714',
  textMid:     '#4a4540',
  textDim:     '#7a7268',
  textMuted:   '#a8a098',
}

export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`

export const BASE_STYLES = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${C.bg}; color: ${C.text}; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  a { color: inherit; text-decoration: none; }
  .pri-btn {
    background: ${C.accent}; color: #fff; border: none; padding: 0.875rem 2rem;
    font-family: 'DM Sans', sans-serif; font-size: 0.84rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
    transition: all 0.18s ease; border-radius: 3px; text-decoration: none;
    display: inline-block;
  }
  .pri-btn:hover { background: #7a6038; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(154,124,74,.24); }
  .ghost-btn {
    background: none; border: 1.5px solid ${C.border}; color: ${C.textMid};
    padding: 0.8rem 1.75rem; font-family: 'DM Sans', sans-serif; font-size: 0.84rem;
    font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; transition: all 0.15s ease; border-radius: 3px;
    text-decoration: none; display: inline-block;
  }
  .ghost-btn:hover { border-color: ${C.borderDark}; color: ${C.text}; }
  .fade-up   { animation: fuA 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .fade-up-1 { animation: fuA 0.55s cubic-bezier(.22,.68,0,1.2) 0.08s both; }
  .fade-up-2 { animation: fuA 0.55s cubic-bezier(.22,.68,0,1.2) 0.16s both; }
  .fade-up-3 { animation: fuA 0.55s cubic-bezier(.22,.68,0,1.2) 0.24s both; }
  @keyframes fuA { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
`
