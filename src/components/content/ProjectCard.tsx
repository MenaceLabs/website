import { useNavigate } from 'react-router'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  tags: string[]
}

export function ProjectCard({ slug, title, description, tags }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/projects/${slug}`)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.tags}>
        {tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
