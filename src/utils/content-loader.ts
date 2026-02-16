import matter from 'gray-matter'

export interface ContentMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  [key: string]: unknown
}

export interface ContentItem {
  meta: ContentMeta
  content: string
}

const modules = import.meta.glob('/content/**/*.md', { query: '?raw', eager: true })

function parseModule(path: string): ContentItem | null {
  const mod = modules[path]
  if (!mod) return null

  const raw = (mod as { default: string }).default
  const { data, content } = matter(raw)

  const segments = path.split('/')
  const filename = segments[segments.length - 1]
  const slug = filename.replace(/\.md$/, '')

  const date = data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : (data.date as string) || ''

  return {
    meta: {
      ...data,
      slug,
      title: (data.title as string) || slug,
      date,
      tags: (data.tags as string[]) || [],
      description: (data.description as string) || '',
    },
    content,
  }
}

export function getContent(section: string, slug: string): ContentItem | null {
  const path = `/content/${section}/${slug}.md`
  return parseModule(path)
}

export function getPage(name: string): ContentItem | null {
  const path = `/content/pages/${name}.md`
  return parseModule(path)
}

export function getAllContent(section: string): ContentMeta[] {
  const prefix = `/content/${section}/`
  return Object.keys(modules)
    .filter(path => path.startsWith(prefix))
    .map(path => parseModule(path))
    .filter((item): item is ContentItem => item !== null)
    .sort((a, b) => {
      if (a.meta.date && b.meta.date) {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
      }
      return 0
    })
    .map(item => item.meta)
}
