import { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ActivityBar } from './ActivityBar'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { Terminal } from './Terminal'
import { StatusBar } from './StatusBar'
import { useIsMobile } from '../../hooks/useIsMobile'
import { MobileHeader } from '../mobile/MobileHeader'
import { MobileBanner } from '../mobile/MobileBanner'
import styles from './IDELayout.module.css'

export function IDELayout() {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(() => !isMobile)
  const location = useLocation()

  // Close sidebar on navigation when on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile])

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  if (isMobile) {
    return (
      <div className={styles.mobileLayout}>
        <MobileHeader />
        <MobileBanner />
        <main className={styles.mobileContent}>
          <div className="editor-content">
            <Outlet />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={`${styles.layout} ${!sidebarOpen ? styles.sidebarCollapsed : ''}`}>
      <ActivityBar onToggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div className={styles.sidebarBackdrop} onClick={closeSidebar} />
      )}
      <Sidebar isOpen={sidebarOpen} />
      <TabBar />
      <main style={{ gridArea: 'editor', overflow: 'auto', background: 'var(--editor-bg)' }}>
        <div className={`editor-content ${styles.editorContent}`}>
          <Outlet />
        </div>
      </main>
      <Terminal />
      <StatusBar />
    </div>
  )
}
