import { useLocation } from 'react-router'
import { GitBranch, Github } from 'lucide-react'
import styles from './StatusBar.module.css'

export function StatusBar() {
  const location = useLocation()

  const currentFile = location.pathname === '/'
    ? 'welcome.md'
    : location.pathname.slice(1).replace(/\//g, '/') + '.md'

  return (
    <div className={styles.statusBar}>
      <a
        className={styles.statusItem}
        href="https://github.com/QuiGonGitt"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub Profile"
      >
        <Github size={14} />
        <span>QuiGonGitt</span>
      </a>

      <span className={styles.statusItem}>
        <GitBranch size={14} />
        <span>main</span>
      </span>

      <div className={styles.spacer} />

      <span className={styles.statusItem}>
        {currentFile}
      </span>

      <span className={styles.statusItem}>
        UTF-8
      </span>

      <span className={styles.statusItem}>
        Markdown
      </span>
    </div>
  )
}
