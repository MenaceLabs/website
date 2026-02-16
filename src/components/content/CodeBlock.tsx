import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
}

export function CodeBlock({ className, children }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''
  const code = String(children).replace(/\n$/, '')

  if (!match) {
    return <code className={className}>{children}</code>
  }

  return (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      showLineNumbers
      customStyle={{
        margin: '0.8em 0',
        borderRadius: 'var(--radius-md)',
        fontSize: '14px',
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}
