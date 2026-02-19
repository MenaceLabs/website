import { useParams } from 'react-router'
import { useOpenTab } from '@/hooks/useOpenTab'
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer'
import { getProject } from '@/utils/content-loader'

const statusLabels = {
  'premise': 'Premise',
  'in-progress': 'In Progress',
  'complete': 'Complete',
} as const

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  useOpenTab({ id: `/projects/${slug}`, title: `${slug}.md` })

  const item = slug ? getProject(slug) : null

  if (!item) {
    return <p>Project not found.</p>
  }

  const { meta, content } = item

  return (
    <>
      <div style={{ marginBottom: '1em', color: 'var(--text-muted)', fontSize: '12px' }}>
        {meta.date} · {statusLabels[meta.status]} · {meta.tags.join(', ')}
        {meta.repo && (
          <>
            {' · '}
            <a
              href={meta.repo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-link)' }}
              onClick={e => e.stopPropagation()}
            >
              GitHub
            </a>
          </>
        )}
      </div>
      <MarkdownRenderer content={content} />
    </>
  )
}
