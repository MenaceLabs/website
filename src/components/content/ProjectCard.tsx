import { useNavigate } from 'react-router'
import type { ProjectStatus } from '@/utils/content-loader'
import styles from './ProjectCard.module.css'

const statusLabels: Record<ProjectStatus, string> = {
  'premise': 'Premise',
  'in-progress': 'In Progress',
  'complete': 'Complete',
}

const statusClasses: Record<ProjectStatus, string> = {
  'premise': styles.premise,
  'in-progress': styles['in-progress'],
  'complete': styles.complete,
}

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  tags: string[]
  status: ProjectStatus
}

export function ProjectCard({ slug, title, description, tags, status }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/projects/${slug}`)}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <span className={`${styles.badge} ${statusClasses[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.tags}>
        {tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
