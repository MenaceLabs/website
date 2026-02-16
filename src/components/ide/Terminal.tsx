import { useEffect, useState, useRef } from 'react'
import { bootSequence, type TerminalLine } from '@/utils/terminal-messages'
import styles from './Terminal.module.css'

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [done, setDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    bootSequence.forEach((line, i) => {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, line])
        if (i === bootSequence.length - 1) setDone(true)
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className={styles.terminal} ref={containerRef}>
      <div className={styles.header}>
        <span className={styles.headerTab}>Terminal</span>
      </div>
      {lines.map((line, i) => (
        <div key={i} className={`${styles.line} ${styles[line.type] || ''}`}>
          {line.text}
        </div>
      ))}
      {!done && <span className={styles.cursor} />}
    </div>
  )
}
