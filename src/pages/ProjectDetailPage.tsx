import { useParams } from 'react-router'
import { useOpenTab } from '@/hooks/useOpenTab'
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer'
import { getContent } from '@/utils/content-loader'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  useOpenTab({ id: `/projects/${slug}`, title: `${slug}.md` })

  const item = slug ? getContent('projects', slug) : null

  if (!item) {
    return <p>Project not found.</p>
  }

  return <MarkdownRenderer content={item.content} />
}
