import { useOpenTab } from '@/hooks/useOpenTab'
import { YouTubeEmbed } from '@/components/content/YouTubeEmbed'
import { videos } from '@/data/videos'
import styles from './VideosPage.module.css'

export function VideosPage() {
  useOpenTab({ id: '/videos', title: 'videos.md' })

  return (
    <>
      <h1>Videos</h1>
      <p>Demos, walkthroughs, and presentations.</p>

      <div className={styles.grid}>
        {videos.map(video => (
          <div key={video.id} className={styles.videoCard}>
            <YouTubeEmbed videoId={video.videoId} title={video.title} />
            <div className={styles.videoInfo}>
              <div className={styles.videoTitle}>{video.title}</div>
              <div className={styles.videoDate}>{video.date}</div>
              <div className={styles.videoDescription}>{video.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
