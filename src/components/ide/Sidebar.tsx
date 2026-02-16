import { useLocation, useNavigate } from 'react-router'
import { FileText, FolderOpen, File, User, Mail, PlayCircle } from 'lucide-react'
import { getAllContent, type ContentMeta } from '@/utils/content-loader'
import styles from './Sidebar.module.css'

interface SidebarProps {
  isOpen: boolean
}

interface SidebarSection {
  label: string
  items: { path: string; title: string; icon: typeof FileText }[]
}

function getSectionsForPath(pathname: string): SidebarSection[] {
  if (pathname === '/' || pathname.startsWith('/about')) {
    return [{
      label: 'About',
      items: [
        { path: '/about', title: 'about.md', icon: User },
      ],
    }]
  }

  if (pathname.startsWith('/projects')) {
    const projects = getAllContent('projects')
    return [{
      label: 'Projects',
      items: [
        { path: '/projects', title: 'index.md', icon: FolderOpen },
        ...projects.map((p: ContentMeta) => ({
          path: `/projects/${p.slug}`,
          title: `${p.slug}.md`,
          icon: File,
        })),
      ],
    }]
  }

  if (pathname.startsWith('/articles')) {
    const articles = getAllContent('articles')
    return [{
      label: 'Articles',
      items: [
        { path: '/articles', title: 'index.md', icon: FolderOpen },
        ...articles.map((a: ContentMeta) => ({
          path: `/articles/${a.slug}`,
          title: `${a.slug}.md`,
          icon: FileText,
        })),
      ],
    }]
  }

  if (pathname.startsWith('/videos')) {
    return [{
      label: 'Videos',
      items: [
        { path: '/videos', title: 'videos.md', icon: PlayCircle },
      ],
    }]
  }

  if (pathname.startsWith('/contact')) {
    return [{
      label: 'Contact',
      items: [
        { path: '/contact', title: 'contact.md', icon: Mail },
      ],
    }]
  }

  return []
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const sections = getSectionsForPath(location.pathname)

  return (
    <div className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ''}`}>
      {sections.map(section => (
        <div key={section.label}>
          <div className={styles.sectionHeader}>{section.label}</div>
          <ul className={styles.fileList}>
            {section.items.map(item => {
              const Icon = item.icon
              return (
                <li
                  key={item.path}
                  className={`${styles.fileItem} ${location.pathname === item.path ? styles.active : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon size={16} strokeWidth={1.5} className={styles.fileIcon} />
                  <span>{item.title}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
