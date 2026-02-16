import { useNavigate } from 'react-router'
import { useOpenTab } from '@/hooks/useOpenTab'
import { getAllContent } from '@/utils/content-loader'
import styles from './ArticlesPage.module.css'

export function ArticlesPage() {
  useOpenTab({ id: '/articles', title: 'articles/' })
  const navigate = useNavigate()

  const articles = getAllContent('articles')

  return (
    <>
      <h1>Articles</h1>
      <p>Thoughts on AI, software engineering, and building things.</p>

      <div className={styles.list}>
        {articles.map(a => (
          <div
            key={a.slug}
            className={styles.articleItem}
            onClick={() => navigate(`/articles/${a.slug}`)}
          >
            <div className={styles.articleTitle}>{a.title}</div>
            <div className={styles.articleMeta}>
              <span>{a.date}</span>
            </div>
            <div className={styles.articleDescription}>{a.description}</div>
            <div className={styles.tags}>
              {a.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
