import { BookMarked, Star, GitFork } from 'lucide-react'
import styles from './RepoCard.module.css'

export interface RepoData {
  name: string
  description: string
  url: string
  language: string
  languageColor: string
  stars?: number
  forks?: number
}

export function RepoCard({ name, description, url, language, languageColor, stars, forks }: RepoData) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.header}>
        <BookMarked size={16} className={styles.repoIcon} />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.langDot} style={{ background: languageColor }} />
          {language}
        </span>
        {stars !== undefined && (
          <span className={styles.metaItem}>
            <Star size={14} />
            {stars}
          </span>
        )}
        {forks !== undefined && (
          <span className={styles.metaItem}>
            <GitFork size={14} />
            {forks}
          </span>
        )}
      </div>
    </a>
  )
}
