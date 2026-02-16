import { useParams } from 'react-router'
import { useOpenTab } from '@/hooks/useOpenTab'
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer'
import { getContent } from '@/utils/content-loader'

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  useOpenTab({ id: `/articles/${slug}`, title: `${slug}.md` })

  const item = slug ? getContent('articles', slug) : null

  if (!item) {
    return <p>Article not found.</p>
  }

  return (
    <>
      <div style={{ marginBottom: '1em', color: 'var(--text-muted)', fontSize: '12px' }}>
        {item.meta.date} · {item.meta.tags.join(', ')}
      </div>
      <MarkdownRenderer content={item.content} />
    </>
  )
}
