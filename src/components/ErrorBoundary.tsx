import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-primary-subtle)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-primary)' }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl tracking-tight" style={{ color: 'var(--color-ink)' }}>
              Algo deu errado
            </h1>
            <p className="text-sm max-w-sm" style={{ color: 'var(--color-ink-mid)' }}>
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => window.location.reload()}
            variant="default"
            size="sm"
          >
            Recarregar página
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
