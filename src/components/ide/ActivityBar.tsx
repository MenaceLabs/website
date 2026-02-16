import { useLocation, useNavigate } from 'react-router'
import {
  User,
  FolderKanban,
  FileText,
  PlayCircle,
  Mail,
  PanelLeft,
} from 'lucide-react'
import styles from './ActivityBar.module.css'

const navItems = [
  { path: '/about', icon: User, label: 'About' },
  { path: '/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/articles', icon: FileText, label: 'Articles' },
  { path: '/videos', icon: PlayCircle, label: 'Videos' },
  { path: '/contact', icon: Mail, label: 'Contact' },
]

interface ActivityBarProps {
  onToggleSidebar: () => void
}

export function ActivityBar({ onToggleSidebar }: ActivityBarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/about') return location.pathname === '/' || location.pathname.startsWith('/about')
    return location.pathname.startsWith(path)
  }

  return (
    <div className={styles.activityBar}>
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          className={`${styles.navButton} ${isActive(path) ? styles.active : ''}`}
          onClick={() => navigate(path)}
          title={label}
          aria-label={label}
        >
          <Icon size={24} strokeWidth={1.5} />
        </button>
      ))}
      <div className={styles.spacer} />
      <button
        className={styles.navButton}
        onClick={onToggleSidebar}
        title="Toggle Sidebar"
        aria-label="Toggle Sidebar"
      >
        <PanelLeft size={24} strokeWidth={1.5} />
      </button>
    </div>
  )
}
