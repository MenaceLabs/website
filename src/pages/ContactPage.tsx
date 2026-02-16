import { useOpenTab } from '@/hooks/useOpenTab'
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer'
import { getPage } from '@/utils/content-loader'

export function ContactPage() {
  useOpenTab({ id: '/contact', title: 'contact.md' })

  const page = getPage('contact')

  if (!page) {
    return <p>Content not found.</p>
  }

  return <MarkdownRenderer content={page.content} />
}
