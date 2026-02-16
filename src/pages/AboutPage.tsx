import { useOpenTab } from '@/hooks/useOpenTab'
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer'
import { getPage } from '@/utils/content-loader'

export function AboutPage() {
  useOpenTab({ id: '/about', title: 'about.md' })

  const page = getPage('about')

  if (!page) {
    return <p>Content not found.</p>
  }

  return <MarkdownRenderer content={page.content} />
}
