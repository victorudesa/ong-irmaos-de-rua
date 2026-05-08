import { useState } from 'react'
import { Image, Copy, Check, MessageCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'

const impactoCards = [
  {
    valor: 'R$30',
    equiv: '= 10 marmitas',
    desc: 'Refeições nutritivas entregues diretamente nas ruas — preparadas na véspera com cuidado e carinho.',
  },
  {
    valor: 'R$60',
    equiv: '= kit de higiene + cobertor',
    desc: 'Um kit de higiene completo e um cobertor para aguentar a noite fria — dignidade que cabe em uma sacola.',
  },
  {
    valor: 'R$20',
    equiv: '= 1 mês de café da manhã',
    desc: 'Pão, café e fruta para uma pessoa começar o sábado com um sorriso — toda semana, sem falta.',
  },
]

const bankDetails = [
  { label: 'Banco', value: 'Banco do Brasil (001)' },
  { label: 'Agência', value: '1234-5' },
  { label: 'Conta Corrente', value: '00012345-6' },
  { label: 'CNPJ', value: '00.000.000/0001-00' },
  { label: 'Titular', value: 'Irmãos de Rua' },
]

const faqs = [
  { q: 'A doação é segura?', a: 'Sim. Todas as transações são feitas por canais bancários oficiais — PIX via CNPJ ou TED. Você recebe confirmação imediata do banco.' },
  { q: 'Emitem recibo ou comprovante?', a: 'Sim. Após a doação, entre em contato pelo WhatsApp e emitimos o recibo oficial da ONG com todos os dados fiscais.' },
  { q: 'Posso deduzir no Imposto de Renda?', a: 'Atualmente não possuímos certificação para dedução no IR. Estamos trabalhando para obter essa qualificação em breve.' },
  { q: 'Como sei que o dinheiro chegou?', a: 'Publicamos prestações de contas mensais nas redes sociais e enviamos relatórios de impacto para doadores recorrentes.' },
  { q: 'Aceitam doações de alimentos ou roupas?', a: 'Sim! Recebemos doações físicas na nossa sede em São Caetano do Sul. Entre em contato pelo WhatsApp para combinar a entrega.' },
]

const PIX_KEY = '00.000.000/0001-00'

const DoeAgora = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
    } catch {
      // fallback — silently ignore
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Layout>
      <PageHero
        photoVariant
        breadcrumb="Doe Agora"
        title={<>Sua doação chega<br />a quem <em style={{ fontStyle: 'italic', color: 'var(--color-amber)' }}>mais precisa</em></>}
        subtitle="Cada contribuição é convertida em marmitas, cobertores e esperança — direto nas ruas do ABC Paulista."
      />

      {/* ── IMPACTO CONCRETO ── */}
      <section className="py-[clamp(56px,7vw,104px)]" style={{ background: 'var(--color-surface)' }}>
        <div className="container mx-auto px-[clamp(20px,5vw,60px)] max-w-[1200px]">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Por Que Doar
          </span>
          <h2 className="font-display text-[clamp(26px,3.5vw,50px)] leading-[1.08] tracking-[-0.02em] text-balance" style={{ color: 'var(--color-ink)' }}>
            O que sua doação coloca na mesa
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {impactoCards.map((card) => (
              <div
                key={card.equiv}
                className="bg-white rounded-[28px] border px-6 py-7 sm:px-7 sm:py-8 flex flex-col gap-4 transition-all duration-200 hover:shadow-[0_14px_36px_oklch(0_0_0/0.08)] hover:-translate-y-0.5"
                style={{ borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
              >
                <div className="font-display text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.02em]" style={{ color: 'var(--color-ink)' }}>
                  {card.valor.replace(/\d.*/, '')}
                  <span style={{ color: 'var(--color-primary)' }}>{card.valor.replace(/[^\d.,]/g, '')}</span>
                </div>
                <div className="text-[13px] font-bold tracking-[0.04em] uppercase" style={{ color: 'var(--color-primary)' }}>
                  {card.equiv}
                </div>
                <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--color-ink-mid)' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO DOAR ── */}
      <section className="py-[clamp(56px,7vw,104px)]" style={{ background: 'oklch(0.97 0.012 60)' }} id="como-doar">
        <div className="container mx-auto px-[clamp(20px,5vw,60px)] max-w-[1200px]">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Como Doar
          </span>
          <h2 className="font-display text-[clamp(26px,3.5vw,50px)] leading-[1.08] tracking-[-0.02em] text-balance" style={{ color: 'var(--color-ink)' }}>
            Escolha sua forma de contribuir
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12 items-start">

            {/* PIX — dark card */}
            <div className="rounded-[28px] flex flex-col p-7 sm:p-10" style={{ background: 'var(--color-ink)' }}>
              <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Transferência instantânea
              </p>
              <h3 className="font-display text-[28px] sm:text-[32px] text-white leading-[1.1] mb-6 sm:mb-8">PIX</h3>

              <div
                className="rounded-[18px] p-4 flex items-center justify-between gap-3 mb-7"
                style={{ background: 'oklch(1 0 0 / 0.07)', border: '1px solid oklch(1 0 0 / 0.12)' }}
              >
                <div className="min-w-0">
                  <p className="text-[11px] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Chave PIX (CNPJ)</p>
                  <p className="text-[14px] sm:text-[16px] font-bold text-white tracking-[0.02em] truncate">{PIX_KEY}</p>
                </div>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="icon-sm"
                  className="flex-shrink-0"
                  aria-label="Copiar chave PIX"
                  style={{ background: copied ? 'oklch(0.65 0.18 145)' : 'var(--color-amber)', color: copied ? 'white' : 'var(--color-ink)' }}
                >
                  {copied
                    ? <Check className="w-4 h-4" strokeWidth={2.5} />
                    : <Copy className="w-4 h-4" strokeWidth={2} />
                  }
                </Button>
              </div>

              {/* QR placeholder */}
              <div
                className="aspect-square max-w-[160px] mx-auto mb-4 rounded-[18px] flex flex-col items-center justify-center gap-2"
                style={{ background: 'oklch(1 0 0 / 0.06)', border: '1px dashed oklch(1 0 0 / 0.15)' }}
              >
                <Image className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.2)' }} strokeWidth={1} />
                <span className="font-mono text-[10px] text-center leading-snug" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  QR Code<br />substituir por imagem real
                </span>
              </div>
              <p className="text-[12px] text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Escaneie com seu app bancário
              </p>

              {copied && (
                <div className="flex items-center gap-2 mt-4 px-4 py-2.5 rounded-[10px] text-[13px] font-semibold" style={{ background: 'oklch(0.95 0.06 145)', color: 'oklch(0.35 0.18 145)' }}>
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                  Chave PIX copiada!
                </div>
              )}
            </div>

            {/* TED + Recorrente */}
            <div className="bg-white rounded-[28px] border flex flex-col overflow-hidden" style={{ borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}>
              <div className="px-6 py-6 sm:px-8 sm:py-7" style={{ borderBottom: '1px solid oklch(0.10 0.008 50 / 0.09)' }}>
                <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase mb-2" style={{ color: 'var(--color-ink-soft)' }}>
                  Transferência bancária
                </p>
                <h3 className="font-display text-[22px] sm:text-[26px] leading-[1.1]" style={{ color: 'var(--color-ink)' }}>
                  TED / Transferência
                </h3>
              </div>

              <div className="px-6 sm:px-8">
                {bankDetails.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-3 py-4"
                    style={{ borderBottom: i < bankDetails.length - 1 ? '1px solid oklch(0.10 0.008 50 / 0.09)' : 'none' }}
                  >
                    <span className="text-[13px] flex-shrink-0" style={{ color: 'var(--color-ink-soft)' }}>{item.label}</span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-right break-all" style={{ color: 'var(--color-ink)' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Recorrente */}
              <div
                className="px-6 py-6 sm:px-8 sm:py-7 mt-auto"
                style={{ background: 'oklch(0.96 0.04 25)', borderTop: '1px solid oklch(0.55 0.20 25 / 0.12)' }}
              >
                <p className="text-[15px] font-bold flex items-center gap-2 mb-2" style={{ color: 'var(--color-ink)' }}>
                  Doação Recorrente
                  <span className="text-[10px] font-extrabold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--color-primary)' }}>
                    Recomendado
                  </span>
                </p>
                <p className="text-[14px] leading-[1.6] mb-4" style={{ color: 'var(--color-ink-mid)' }}>
                  Doe mensalmente um valor fixo e garanta que nossas ações nunca parem. Doadores recorrentes recebem relatórios de impacto todo mês.
                </p>
                <a
                  href="https://wa.me/5511999999999?text=Olá! Quero saber mais sobre doação recorrente."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-primary text-white rounded-[10px] no-underline font-medium transition-all duration-150 hover:opacity-90 hover:-translate-y-px"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  Quero ser doador recorrente
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FRASE IMPACTO ── */}
      <section
        className="py-[clamp(40px,5vw,68px)] relative overflow-hidden"
        style={{ background: 'var(--color-primary)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle at 80% 50%, oklch(0.65 0.20 25), transparent 60%)' }}
        />
        <div className="relative z-10 container mx-auto px-[clamp(20px,5vw,60px)] max-w-[720px] text-center">
          <p className="font-display text-[clamp(20px,3.5vw,44px)] leading-[1.25] tracking-[-0.02em] text-white mb-7" style={{ textWrap: 'balance' } as React.CSSProperties}>
            Com R$30 você garante{' '}
            <em className="font-display not-italic" style={{ opacity: 0.7 }}>10 marmitas</em>{' '}
            para quem vive nas ruas do ABC.
          </p>
          <a
            href="#como-doar"
            className="inline-flex items-center gap-2 h-11 px-7 text-base bg-white text-primary rounded-[10px] no-underline font-medium transition-all duration-150 hover:opacity-90 hover:-translate-y-px"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Fazer uma doação
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[clamp(56px,7vw,104px)]" style={{ background: 'var(--color-surface-warm)' }} id="faq">
        <div className="container mx-auto px-[clamp(20px,5vw,60px)] max-w-[1200px]">
          <span className="block text-center text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-[clamp(26px,3.5vw,50px)] leading-[1.08] tracking-[-0.02em] text-center mb-0" style={{ color: 'var(--color-ink)', textWrap: 'balance' } as React.CSSProperties}>
            Perguntas e respostas
          </h2>

          <div className="max-w-[760px] mx-auto mt-12">
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="bg-white border rounded-[18px] overflow-hidden data-[state=open]:shadow-[0_4px_20px_oklch(0_0_0/0.06)] transition-shadow duration-150"
                  style={{ borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 text-[15px] font-semibold hover:no-underline text-left"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-[14px] leading-[1.75]" style={{ color: 'var(--color-ink-mid)' }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default DoeAgora
