import { useOpenTab } from '@/hooks/useOpenTab'
import { ProjectCard } from '@/components/content/ProjectCard'
import { RepoCard } from '@/components/content/RepoCard'
import { getAllContent } from '@/utils/content-loader'
import { repos } from '@/data/repos'
import styles from './ProjectsPage.module.css'

export function ProjectsPage() {
  useOpenTab({ id: '/projects', title: 'projects/' })

  const projects = getAllContent('projects')

  return (
    <>
      <h1>Projects</h1>
      <p>Write-ups and documentation for things I've built.</p>

      <div className={styles.grid}>
        {projects.map(p => (
          <ProjectCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            description={p.description}
            tags={p.tags}
          />
        ))}
      </div>

      <h2>GitHub Repositories</h2>
      <div className={styles.grid}>
        {repos.map(repo => (
          <RepoCard key={repo.name} {...repo} />
        ))}
      </div>
    </>
  )
}
