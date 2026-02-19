import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Menu, X } from 'lucide-react'
import { MobileNav } from './MobileNav'
import styles from './MobileHeader.module.css'

export function MobileHeader() {
  const [navOpen, setNavOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className={styles.header}>
        <button
          className={styles.siteName}
          onClick={() => {
            navigate('/')
            setNavOpen(false)
          }}
        >
          ~/portfolio
        </button>
        <button
          className={styles.hamburger}
          onClick={() => setNavOpen(prev => !prev)}
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        >
          {navOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {navOpen && <MobileNav onNavigate={() => setNavOpen(false)} />}
    </>
  )
}
