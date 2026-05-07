import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UtensilsCrossed, Coffee, Shirt, Droplets, Heart, Wallet, Users, Share2, Image } from 'lucide-react'
import { HeartIcon } from '@/components/icons/HeartIcon'
import { LinkButton } from '@/components/ui/link-button'
import Layout from '@/components/Layout'
import CtaBanner from '@/components/CtaBanner'
import MetricsGrid from '@/components/MetricsGrid'
import heroBg from '@/assets/hero-bg.jpg'

const actions = [
  {
    icon: UtensilsCrossed,
    title: 'Entrega de Marmitas',
    description: 'Preparamos e distribuímos refeições completas toda semana para pessoas em situação de rua.',
    cta: { label: 'Conhecer mais', to: '/doe-agora' },
  },
  {
    icon: Coffee,
    title: 'Café da Manhã Solidário',
    description: 'Pão, café e frutas para começar o dia com dignidade, aos sábados e domingos de manhã.',
    cta: { label: 'Conhecer mais', to: '/doe-agora' },
  },
  {
    icon: Heart,
    title: 'Acolhimento e Ressocialização',
    description: 'Escuta, orientação e apoio para quem deseja reconstruir sua vida fora das ruas.',
    cta: { label: 'Ser voluntário', to: '/voluntario' },
  },
  {
    icon: Shirt,
    title: 'Roupas, Cobertores e Kits de Higiene',
    description: 'Agasalhos e cobertores especialmente no inverno, além de kits de higiene essenciais montados com cuidado.',
    cta: { label: 'Fazer doação', to: '/doe-agora' },
  },
  {
    icon: Droplets,
    title: 'Ações Semanais',
    description: 'Todo sábado e domingo, das 8h às 12h, na região do ABC Paulista e no centro de São Paulo.',
    cta: { label: 'Participar', to: '/voluntario' },
  },
]

const metrics = [
  { number: '+5.000', label: 'Marmitas entregues' },
  { number: '+200', label: 'Voluntários ativos' },
  { number: '19', label: 'Anos de atuação' },
  { number: '+1.000', label: 'Pessoas atendidas' },
]

const howToHelp = [
  {
    num: '01',
    icon: Wallet,
    title: 'Doação Financeira',
    description: 'PIX, transferência bancária ou doação recorrente. Cada real chega diretamente a quem precisa — sem intermediários, sem burocracia.',
    to: '/doe-agora',
    main: true,
  },
  {
    num: '02',
    icon: Users,
    title: 'Seja Voluntário',
    description: 'Junte-se a mais de 200 voluntários que transformam vidas toda semana nas ruas do ABC.',
    to: '/voluntario',
    main: false,
  },
  {
    num: '03',
    icon: Share2,
    title: 'Divulgue a Causa',
    description: 'Compartilhe nosso trabalho nas redes sociais e ajude a ampliar nossa rede de impacto.',
    to: '/',
    main: false,
  },
]

function ActionsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateBtns = () => {
    const el = carouselRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    updateBtns()
    el.addEventListener('scroll', updateBtns, { passive: true })
    return () => el.removeEventListener('scroll', updateBtns)
  }, [])

  const scroll = (dir: 'prev' | 'next') => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector('[data-card]') as HTMLElement
    const amount = card ? card.offsetWidth + 20 : 320
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <div className="relative mt-12">
      {/* Prev */}
      <button
        onClick={() => scroll('prev')}
        disabled={!canPrev}
        aria-label="Anterior"
        className="absolute left-[-22px] top-[40%] z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none"
        style={{ background: 'white', border: '1px solid var(--color-border-mid)', boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto pb-2"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {actions.map((action) => (
          <div
            key={action.title}
            data-card
            className="flex-none flex flex-col rounded-[28px] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_oklch(0_0_0/0.10)] bg-white border border-[var(--color-border-faint)]"
            style={{
              width: 'calc((100% - 40px) / 3)',
              minWidth: '280px',
              scrollSnapAlign: 'start',
            }}
          >
            {/* Image placeholder */}
            <div
              className="relative h-[200px] flex items-center justify-center overflow-hidden"
              style={{
                background: 'repeating-linear-gradient(135deg, oklch(0.82 0.016 58) 0px, oklch(0.82 0.016 58) 2px, oklch(0.88 0.018 58) 2px, oklch(0.88 0.018 58) 14px)',
              }}
            >
              <Image className="w-8 h-8 opacity-25 text-ink-soft" strokeWidth={1.5} />
              <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
                aria-hidden="true"
              />
            </div>
            {/* Body */}
            <div className="flex flex-col gap-3 flex-1 px-6 pb-6 pt-5">
              <h3 className="text-[17px] font-bold leading-snug" style={{ color: 'var(--color-ink)' }}>
                {action.title}
              </h3>
              <p className="text-sm leading-[1.7] flex-1" style={{ color: 'var(--color-ink-mid)' }}>
                {action.description}
              </p>
              <Link
                to={action.cta.to}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold mt-1 transition-all duration-150 hover:gap-2.5"
                style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
              >
                {action.cta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => scroll('next')}
        disabled={!canNext}
        aria-label="Próximo"
        className="absolute right-[-22px] top-[40%] z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none hover:bg-ink"
        style={{ background: 'white', border: '1px solid var(--color-border-mid)', boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  )
}

function HowToHelpCard({ item }: { item: typeof howToHelp[0] }) {
  const Icon = item.icon
  return (
    <Link
      to={item.to}
      className="group flex flex-col gap-5 rounded-[28px] p-8 md:p-9 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_oklch(0_0_0/0.09)] bg-white border border-[var(--color-border-subtle)]"
      style={{ color: 'var(--color-ink)' }}
    >
      {item.main ? (
        <>
          <div>
            <div className="font-display leading-none tracking-tight mb-4" style={{ fontSize: '64px', color: 'var(--color-ink-ghost)' }}>
              {item.num}
            </div>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--color-surface-warm)' }}>
                <Icon className="w-[22px] h-[22px] text-ink" strokeWidth={1.5} />
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 bg-ink group-hover:bg-primary group-hover:translate-x-[3px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold leading-snug mb-2.5" style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: 'var(--color-ink)' }}>
              {item.title}
            </div>
            <div className="text-[15px] leading-[1.7]" style={{ color: 'var(--color-ink-mid)' }}>
              {item.description}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="font-display leading-none tracking-tight" style={{ fontSize: '64px', color: 'var(--color-ink-ghost)' }}>
            {item.num}
          </div>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--color-surface-warm)' }}>
              <Icon className="w-[22px] h-[22px] text-ink" strokeWidth={1.5} />
            </div>
            <div data-arrow className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150" style={{ background: 'var(--color-ink)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold leading-snug mb-2" style={{ color: 'var(--color-ink)' }}>{item.title}</div>
            <div className="text-sm leading-[1.7]" style={{ color: 'var(--color-ink-mid)' }}>{item.description}</div>
          </div>
        </>
      )}
    </Link>
  )
}

const Index = () => {
  return (
    <Layout>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: '100svh', paddingTop: '64px' }}
      >
        <img
          src={heroBg}
          alt="Voluntários ajudando pessoas em situação de rua"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, oklch(0 0 0 / 0.52) 0%, oklch(0 0 0 / 0.35) 45%, oklch(0 0 0 / 0.72) 100%)' }}
          aria-hidden="true"
        />

        <div
          className="relative z-10 container mx-auto px-6 md:px-8 max-w-[1200px]"
          style={{ padding: 'clamp(40px,8vh,100px) clamp(20px,5vw,60px) clamp(50px,8vh,80px)' }}
        >
          <div className="flex flex-col gap-8 md:gap-10 text-center md:text-left md:max-w-[600px]">
            {/* Headline */}
            <h1
              className="font-display text-white leading-[1.0] tracking-tight text-balance text-[clamp(48px,6.5vw,96px)]"
            >
              Transformando<br />
              <em className="font-display not-italic" style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>vidas</em> nas<br />
              ruas do ABC
            </h1>

            {/* Subtitle */}
            <p
              className="leading-[1.7]"
              style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'oklch(1 0 0 / 0.65)' }}
            >
              Somos mais de 200 voluntários que levam alimentação, dignidade e acolhimento a quem vive nas ruas da região do ABC Paulista e do centro de São Paulo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row gap-3 md:justify-start justify-center">
              <LinkButton
                to="/doe-agora"
                variant="default"
                size="lg"
                className="justify-center md:justify-start"
              >
                <HeartIcon width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
                Doe Agora
              </LinkButton>
              <LinkButton
                to="/voluntario"
                variant="outline-light"
                size="lg"
                className="justify-center md:justify-start"
              >
                Seja Voluntário
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-[clamp(20px,5vw,60px)] flex items-center gap-2.5 md:flex hidden"
          style={{ color: 'var(--color-on-dark-low)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, var(--color-on-dark-low))' }} />
        </div>
      </section>

      {/* ── MÉTRICAS ── */}
      <MetricsGrid metrics={metrics} />

      {/* ── QUEM SOMOS ── */}
      <section className="py-[var(--section-y)] md:py-[var(--section-y-md)]" style={{ background: 'white' }}>
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span
            className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Quem Somos
          </span>
          <h2
            className="font-display leading-[1.08] tracking-tight text-balance text-[clamp(32px,4vw,56px)]"
            style={{ color: 'var(--color-ink)' }}
          >
            Uma família que acolhe<br />quem a sociedade esqueceu
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center mt-14">
            <div className="space-y-5">
              <p className="text-base leading-[1.8]" style={{ color: 'var(--color-ink-mid)' }}>
                Tudo começou em <strong style={{ color: 'var(--color-ink)', fontWeight: 700 }}>2005</strong>, quando um pequeno grupo de amigos decidiu que não podia mais ignorar as pessoas dormindo nas calçadas do ABC Paulista. Com marmitas preparadas em casa e muita vontade de ajudar, nasceu o Irmãos de Rua.
              </p>
              <p className="text-base leading-[1.8]" style={{ color: 'var(--color-ink-mid)' }}>
                Desde então, crescemos para uma rede de mais de <strong style={{ color: 'var(--color-ink)', fontWeight: 700 }}>200 voluntários</strong> que atuam semanalmente na região do ABC e no centro de São Paulo — levando alimentação, roupas, cobertores, kits de higiene e, acima de tudo, dignidade.
              </p>
              <p className="text-base leading-[1.8]" style={{ color: 'var(--color-ink-mid)' }}>
                Oficialmente registrada como ONG em <strong style={{ color: 'var(--color-ink)', fontWeight: 700 }}>2018</strong>, mantemos o mesmo espírito de família que nos uniu no início: a crença de que ninguém deveria ser invisível.
              </p>
              <div className="flex gap-3 flex-wrap pt-4">
                <LinkButton
                  to="/sobre"
                  variant="default"
                  size="default"
                >
                  Nossa história
                </LinkButton>
                <LinkButton
                  to="/sobre"
                  variant="outline"
                  size="default"
                >
                  Ver ações
                </LinkButton>
              </div>
            </div>

            <div
              className="aspect-[4/3] rounded-[28px] flex items-center justify-center flex-col gap-3 text-center p-5"
              style={{
                background: 'var(--color-surface-warm)',
                border: '1px solid var(--color-border-faint)',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--color-ink-soft)',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.25 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              foto · voluntários em ação
            </div>
          </div>
        </div>
      </section>

      {/* ── O QUE FAZEMOS — carousel ── */}
      <section
        className="py-[var(--section-y)] md:py-[var(--section-y-md)]"
        style={{ background: 'var(--color-bg-warm)' }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span
            className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-4"
            style={{ color: 'var(--color-amber-dark)' }}
          >
            O Que Fazemos
          </span>
          <h2
            className="font-display leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'var(--color-ink)' }}
          >
            Ações que transformam
          </h2>
          <ActionsCarousel />
        </div>
      </section>

      {/* ── CTA IMPACTO ── */}
      <CtaBanner
        quote="Com R$30 você garante 10 marmitas para quem vive nas ruas."
        primaryAction={{ label: 'Fazer uma doação', to: '/doe-agora' }}
        secondaryAction={{ label: 'Via PIX ou TED', to: '/doe-agora' }}
      />

      {/* ── COMO AJUDAR ── */}
      <section
        className="py-[var(--section-y)] md:py-[var(--section-y-md)]"
        style={{ background: 'var(--color-bg-warm)' }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span
            className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Como Ajudar
          </span>
          <h2
            className="font-display leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'var(--color-ink)' }}
          >
            Escolha sua forma<br />de contribuir
          </h2>

          {/* Asymmetric grid: left col spans 2 rows, right col has 2 stacked cards */}
          <div className="hidden md:grid gap-5 mt-14" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
            <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
              <HowToHelpCard item={howToHelp[0]} />
            </div>
            <div style={{ gridColumn: '2', gridRow: '1' }}>
              <HowToHelpCard item={howToHelp[1]} />
            </div>
            <div style={{ gridColumn: '2', gridRow: '2' }}>
              <HowToHelpCard item={howToHelp[2]} />
            </div>
          </div>
          {/* Mobile: single column */}
          <div className="flex flex-col gap-5 mt-14 md:hidden">
            {howToHelp.map((item) => (
              <HowToHelpCard key={item.num} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM — 2x2 grid ── */}
      <section
        className="py-[var(--section-y-compact)] md:py-[var(--section-y-compact-md)]"
        style={{ background: 'var(--color-surface-warm)' }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span
                className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3"
                style={{ color: 'var(--color-amber-dark)' }}
              >
                Acompanhe nas redes sociais
              </span>
              <h2
                className="font-display leading-[1.08] tracking-tight"
                style={{ fontSize: 'clamp(24px, 3vw, 42px)', color: 'var(--color-ink)' }}
              >
                Nossa presença nas redes sociais
              </h2>
            </div>
            <a
              href="https://www.instagram.com/ongirmaosderua"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-sans font-semibold rounded-[10px] no-underline transition-all duration-150 hover:bg-neutral-100 whitespace-nowrap"
              style={{ fontSize: '13px', padding: '9px 18px', background: 'transparent', border: '1.5px solid var(--color-border-soft)', color: 'var(--color-ink)' }}
            >
              Ver no Instagram →
            </a>
          </div>

          <div
            className="grid grid-cols-2 grid-rows-2 gap-3 rounded-[28px] overflow-hidden"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-[18px] flex items-center justify-center relative overflow-hidden cursor-pointer transition-opacity duration-200 hover:opacity-80"
                style={{
                  background: 'repeating-linear-gradient(135deg, oklch(0.86 0.018 58) 0px, oklch(0.86 0.018 58) 2px, oklch(0.90 0.014 58) 2px, oklch(0.90 0.014 58) 14px)',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.25, color: 'var(--color-ink)' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <div
                  className="absolute bottom-0 left-0 right-0 text-center text-[10px] pb-2.5 pt-8"
                  style={{ fontFamily: 'monospace', color: 'var(--color-ink-soft)', background: 'linear-gradient(to top, oklch(0.90 0.014 58 / 0.9), transparent)' }}
                >
                  foto da ação
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Index
