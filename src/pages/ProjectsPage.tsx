import { useOpenTab } from '@/hooks/useOpenTab'
import { ProjectCard } from '@/components/content/ProjectCard'
import { RepoCard } from '@/components/content/RepoCard'
import { getAllProjects, type ProjectStatus } from '@/utils/content-loader'
import { repos } from '@/data/repos'
import styles from './ProjectsPage.module.css'

const sections: { status: ProjectStatus; heading: string; description: string }[] = [
  { status: 'premise', heading: 'Premises', description: 'Ideas taking shape.' },
  { status: 'in-progress', heading: 'In Progress', description: 'Actively being built.' },
  { status: 'complete', heading: 'Complete', description: 'Shipped and documented.' },
]

export function ProjectsPage() {
  useOpenTab({ id: '/projects', title: 'projects/' })

  const projects = getAllProjects()

  return (
    <>
      <h1>Projects</h1>
      <p>Write-ups and documentation for things I've built.</p>

      {sections.map(({ status, heading, description }) => {
        const group = projects.filter(p => p.status === status)
        if (group.length === 0) return null
        return (
          <section key={status}>
            <h2>{heading}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '-0.5em' }}>
              {description}
            </p>
            <div className={styles.grid}>
              {group.map(p => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  status={p.status}
                />
              ))}
            </div>
          </section>
        )
      })}

      <h2>GitHub Repositories</h2>
      <div className={styles.grid}>
        {repos.map(repo => (
          <RepoCard key={repo.name} {...repo} />
        ))}
      </div>
    </>
  )
}
