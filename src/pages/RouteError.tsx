import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { LinkButton } from '@/components/ui/link-button'
import Layout from '@/components/Layout'

export default function RouteError() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
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
            {is404 ? 'Página não encontrada' : 'Algo deu errado'}
          </h1>
          <p className="text-sm max-w-sm" style={{ color: 'var(--color-ink-mid)' }}>
            {is404
              ? 'A página que você procura não existe ou foi movida.'
              : 'Ocorreu um erro inesperado nesta página.'}
          </p>
        </div>
        <LinkButton
          to="/"
          variant="default"
          size="sm"
        >
          Voltar para o início
        </LinkButton>
      </div>
    </Layout>
  )
}
