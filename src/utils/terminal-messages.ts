export interface TerminalLine {
  text: string
  type: 'prompt' | 'info' | 'success' | 'warning' | 'default'
  delay: number
}

export const bootSequence: TerminalLine[] = [
  { text: '$ initializing portfolio...', type: 'prompt', delay: 0 },
  { text: '> Loading modules...', type: 'info', delay: 400 },
  { text: '  ✓ react@19 loaded', type: 'success', delay: 800 },
  { text: '  ✓ typescript@5 loaded', type: 'success', delay: 1000 },
  { text: '  ✓ vite@6 loaded', type: 'success', delay: 1200 },
  { text: '> Mounting IDE components...', type: 'info', delay: 1600 },
  { text: '  ✓ ActivityBar mounted', type: 'success', delay: 1900 },
  { text: '  ✓ Sidebar mounted', type: 'success', delay: 2100 },
  { text: '  ✓ EditorArea mounted', type: 'success', delay: 2300 },
  { text: '  ✓ Terminal mounted', type: 'success', delay: 2500 },
  { text: '> Fetching content...', type: 'info', delay: 2800 },
  { text: '  ✓ Markdown pipeline ready', type: 'success', delay: 3200 },
  { text: '  ✓ Syntax highlighter loaded', type: 'success', delay: 3400 },
  { text: '', type: 'default', delay: 3600 },
  { text: '> Portfolio ready. Welcome!', type: 'success', delay: 3800 },
  { text: '$ _', type: 'prompt', delay: 4200 },
]
