import type { RepoData } from '@/components/content/RepoCard'

export const repos: RepoData[] = [
  {
    name: 'website',
    description: 'This portfolio site — a VS Code-themed personal website built with React, TypeScript, and Vite.',
    url: 'https://github.com/MenaceLabs/website',
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'shared-workflows',
    description: 'Reusable GitHub Actions workflows for CI and application security scanning.',
    url: 'https://github.com/MenaceLabs/shared-workflows',
    language: 'YAML',
    languageColor: '#cb171e',
  },
]
