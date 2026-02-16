import { useState } from 'react'
import { Outlet } from 'react-router'
import { ActivityBar } from './ActivityBar'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { Terminal } from './Terminal'
import { StatusBar } from './StatusBar'
import styles from './IDELayout.module.css'

export function IDELayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <div className={`${styles.layout} ${!sidebarOpen ? styles.sidebarCollapsed : ''}`}>
      <ActivityBar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <TabBar />
      <main style={{ gridArea: 'editor', overflow: 'auto', background: 'var(--editor-bg)' }}>
        <div className="editor-content" style={{ padding: '1.5em 2em' }}>
          <Outlet />
        </div>
      </main>
      <Terminal />
      <StatusBar />
    </div>
  )
}
