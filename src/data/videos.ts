export interface VideoEntry {
  id: string
  title: string
  description: string
  videoId: string
  date: string
}

export const videos: VideoEntry[] = [
  {
    id: 'demo-ai-agent',
    title: 'AI Agent Demo — Autonomous Task Completion',
    description: 'Watch an AI agent autonomously navigate and complete a multi-step workflow using tool calls and reasoning.',
    videoId: 'dQw4w9WgXcQ',
    date: '2025-03-15',
  },
  {
    id: 'portfolio-walkthrough',
    title: 'Portfolio Site Walkthrough',
    description: 'A quick walkthrough of this IDE-themed portfolio site, covering the tech stack and design decisions.',
    videoId: 'dQw4w9WgXcQ',
    date: '2025-02-01',
  },
]
