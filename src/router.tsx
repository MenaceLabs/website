import { createBrowserRouter } from 'react-router'
import { IDELayout } from '@/components/ide/IDELayout'
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { VideosPage } from '@/pages/VideosPage'
import { ContactPage } from '@/pages/ContactPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IDELayout />,
    children: [
      { index: true, element: <AboutPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/:slug', element: <ArticleDetailPage /> },
      { path: 'videos', element: <VideosPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
])
