import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Algo deu errado
            </p>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Erro inesperado
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              {this.state.error.message}
            </p>
            <Button onClick={() => this.setState({ error: null })}>
              Tentar novamente
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
