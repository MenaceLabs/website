import { useEffect } from 'react'
import { useTabStore, type Tab } from '@/stores/useTabStore'

export function useOpenTab(tab: Tab) {
  const openTab = useTabStore(s => s.openTab)

  useEffect(() => {
    openTab(tab)
  }, [tab.id]) // eslint-disable-line react-hooks/exhaustive-deps
}
