import { useState } from 'react'
import { Monitor, X } from 'lucide-react'
import styles from './MobileBanner.module.css'

const STORAGE_KEY = 'mobile-banner-dismissed'

export function MobileBanner() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true'
  )

  if (dismissed) return null

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setDismissed(true)
  }

  return (
    <div className={styles.banner}>
      <Monitor size={16} strokeWidth={1.5} />
      <span className={styles.text}>
        This site is designed as an IDE experience. Visit on desktop for the full experience.
      </span>
      <button
        className={styles.dismiss}
        onClick={handleDismiss}
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  )
}
