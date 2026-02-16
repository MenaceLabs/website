import { useNavigate } from 'react-router'
import { X } from 'lucide-react'
import { useTabStore } from '@/stores/useTabStore'
import styles from './TabBar.module.css'

export function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useTabStore()
  const navigate = useNavigate()

  const handleTabClick = (id: string) => {
    setActiveTab(id)
    navigate(id)
  }

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const { tabs: currentTabs, activeTabId: currentActive } = useTabStore.getState()
    const idx = currentTabs.findIndex(t => t.id === id)

    closeTab(id)

    if (currentActive === id) {
      const remaining = currentTabs.filter(t => t.id !== id)
      if (remaining.length > 0) {
        const newActive = idx >= remaining.length
          ? remaining[remaining.length - 1]
          : remaining[idx]
        navigate(newActive.id)
      } else {
        navigate('/')
      }
    }
  }

  if (tabs.length === 0) {
    return (
      <div className={styles.tabBar}>
        <div className={styles.emptyState}>No open editors</div>
      </div>
    )
  }

  return (
    <div className={styles.tabBar}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`${styles.tab} ${tab.id === activeTabId ? styles.active : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          <span className={styles.tabTitle}>{tab.title}</span>
          <button
            className={styles.closeButton}
            onClick={(e) => handleClose(e, tab.id)}
            aria-label={`Close ${tab.title}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
