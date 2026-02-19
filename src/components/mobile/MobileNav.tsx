import { useLocation, useNavigate } from 'react-router'
import {
  User,
  FolderKanban,
  FileText,
  PlayCircle,
  Mail,
} from 'lucide-react'
import styles from './MobileNav.module.css'

const navItems = [
  { path: '/about', icon: User, label: 'About' },
  { path: '/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/articles', icon: FileText, label: 'Articles' },
  { path: '/videos', icon: PlayCircle, label: 'Videos' },
  { path: '/contact', icon: Mail, label: 'Contact' },
]

interface MobileNavProps {
  onNavigate: () => void
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/about') return location.pathname === '/' || location.pathname.startsWith('/about')
    return location.pathname.startsWith(path)
  }

  return (
    <nav className={styles.overlay}>
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          className={`${styles.navItem} ${isActive(path) ? styles.active : ''}`}
          onClick={() => {
            navigate(path)
            onNavigate()
          }}
        >
          <Icon size={20} strokeWidth={1.5} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
