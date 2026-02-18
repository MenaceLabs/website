import { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ActivityBar } from './ActivityBar'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { Terminal } from './Terminal'
import { StatusBar } from './StatusBar'
import styles from './IDELayout.module.css'

const MOBILE_BREAKPOINT = 768

function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT
}

export function IDELayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => !isMobile())
  const location = useLocation()

  // Close sidebar on navigation when on mobile
  useEffect(() => {
    if (isMobile()) {
      setSidebarOpen(false)
    }
  }, [location.pathname])

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className={`${styles.layout} ${!sidebarOpen ? styles.sidebarCollapsed : ''}`}>
      <ActivityBar onToggleSidebar={toggleSidebar} />
      {sidebarOpen && isMobile() && (
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
