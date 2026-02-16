import { create } from 'zustand'

export interface Tab {
  id: string
  title: string
  icon?: string
}

interface TabState {
  tabs: Tab[]
  activeTabId: string | null
  openTab: (tab: Tab) => void
  closeTab: (id: string) => void
  setActiveTab: (id: string) => void
}

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeTabId: null,

  openTab: (tab) => {
    const { tabs } = get()
    const exists = tabs.find(t => t.id === tab.id)
    if (!exists) {
      set({ tabs: [...tabs, tab], activeTabId: tab.id })
    } else {
      set({ activeTabId: tab.id })
    }
  },

  closeTab: (id) => {
    const { tabs, activeTabId } = get()
    const idx = tabs.findIndex(t => t.id === id)
    const newTabs = tabs.filter(t => t.id !== id)

    let newActive = activeTabId
    if (activeTabId === id) {
      if (newTabs.length === 0) {
        newActive = null
      } else if (idx >= newTabs.length) {
        newActive = newTabs[newTabs.length - 1].id
      } else {
        newActive = newTabs[idx].id
      }
    }

    set({ tabs: newTabs, activeTabId: newActive })
  },

  setActiveTab: (id) => {
    set({ activeTabId: id })
  },
}))
