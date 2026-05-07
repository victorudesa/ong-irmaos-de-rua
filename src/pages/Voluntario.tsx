import { Heart, Users, Clock, Globe, MapPin, Phone, Image } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import { VoluntarioForm } from '@/components/forms/VoluntarioForm'

const reasons = [
  {
    icon: Heart,
    text: 'Impacte vidas diretamente — com as próprias mãos',
  },
  {
    icon: Users,
    text: 'Faça parte de uma comunidade solidária e acolhedora',
  },
  {
    icon: Clock,
    text: 'Desenvolva empatia, liderança e novas habilidades',
  },
  {
    icon: Globe,
    text: 'Contribua para a transformação social no ABC Paulista',
  },
]

const steps = [
  {
    num: '01',
    number: 1,
    title: 'Preencha o formulário',
    description: 'Conte um pouco sobre você, sua disponibilidade e como gostaria de contribuir. Leva menos de 3 minutos.',
  },
  {
    num: '02',
    number: 2,
    title: 'Receba orientações',
    description: 'Nossa equipe entra em contato pelo WhatsApp para explicar como funcionam as ações semanais.',
  },
  {
    num: '03',
    number: 3,
    title: 'Participe das ações',
    description: 'Escolha os dias que combinam com sua agenda e comece a transformar vidas nas ruas do ABC.',
  },
]

const contactInfo = [
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'Rua Ribeirão Pires, 87\nSão Caetano do Sul, SP',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '(11) 99999-9999',
  },
  {
    icon: Clock,
    label: 'Ações',
    value: 'Sábados e domingos\ndas 8h às 12h',
  },
]

const faqs = [
  { q: 'Preciso ter experiência?', a: 'Não! Qualquer pessoa com vontade de ajudar é bem-vinda. Oferecemos toda a orientação necessária antes da sua primeira ação.' },
  { q: 'Qual a frequência mínima?', a: 'Não existe frequência mínima obrigatória. Você participa quando puder — o importante é estar presente quando possível.' },
  { q: 'Onde acontecem as ações?', a: 'Atuamos principalmente na região do ABC Paulista (São Caetano, Santo André, São Bernardo) e no centro de São Paulo.' },
  { q: 'Como é o dia de uma ação?', a: 'Nos reunimos pela manhã para preparar as marmitas e kits. Depois saímos em grupos para distribuir nas ruas, sempre com acolhimento e respeito.' },
  { q: 'Posso levar amigos?', a: 'Claro! Quanto mais pessoas engajadas, mais vidas conseguimos impactar. Traga sua família e amigos — todos são bem-vindos.' },
]

const WhatsAppPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"

const Voluntario = () => {
  return (
    <Layout>
      <PageHero
        photoVariant
        breadcrumb="Seja Voluntário"
        title={
          <>
            Seja parte de<br />
            algo <em style={{ fontStyle: 'italic', color: 'var(--color-amber)' }}>maior</em>
          </>
        }
        subtitle="Junte-se a mais de 200 voluntários que transformam vidas toda semana nas ruas do ABC Paulista."
      />

      {/* Razões para fazer parte */}
      <section className="py-[var(--section-y)] md:py-[var(--section-y-md)] bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Por Que Ser Voluntário
          </span>
          <h2 className="font-display leading-[1.08] tracking-tight" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
            Razões para<br />fazer parte
          </h2>

          <div className="grid md:grid-cols-[1.1fr_1fr] gap-[clamp(40px,6vw,80px)] items-center mt-12">
            {/* Reason cards */}
            <div className="flex flex-col gap-4">
              {reasons.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 bg-white border rounded-[18px] px-5 py-[18px] transition-all duration-150 hover:-translate-y-0 hover:shadow-[0_6px_20px_oklch(0_0_0/0.07)] hover:translate-x-[3px]"
                  style={{ borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
                >
                  <div
                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-[10px]"
                    style={{ background: 'oklch(0.96 0.04 25)' }}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} style={{ stroke: 'var(--color-primary)' }} />
                  </div>
                  <span className="text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Image placeholder */}
            <div
              className="aspect-[4/3] rounded-[28px] flex items-center justify-center flex-col gap-3 border"
              style={{ background: 'var(--color-surface-warm)', borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
            >
              <Image className="w-12 h-12 opacity-20" strokeWidth={1} style={{ color: 'var(--color-ink-soft)' }} />
              <span className="font-mono text-xs text-center px-6" style={{ color: 'var(--color-ink-soft)' }}>
                foto · voluntários juntos em ação
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-[var(--section-y)] md:py-[var(--section-y-md)]" style={{ background: 'var(--color-bg-warm)' }}>
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Como Funciona
          </span>
          <h2 className="font-display leading-[1.08] tracking-tight" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
            Três passos<br />para começar
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative bg-white rounded-[28px] border px-7 py-8 overflow-hidden"
                style={{ borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
              >
                {/* Ghost large number */}
                <span
                  className="font-display absolute top-3 right-5 leading-none select-none pointer-events-none"
                  style={{ fontSize: '80px', color: 'oklch(0.10 0.008 50 / 0.05)', letterSpacing: '-0.03em' }}
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                {/* Connector line between cards (desktop) */}
                {i < steps.length - 1 && (
                  <span
                    className="hidden md:block absolute top-[44px] right-[-17px] w-[34px] z-10"
                    style={{ height: '1px', background: 'oklch(0.10 0.008 50 / 0.09)' }}
                    aria-hidden="true"
                  />
                )}
                {/* Badge */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white mb-5"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {step.number}
                </div>
                <h3 className="text-[17px] font-bold mb-2.5 leading-snug" style={{ color: 'var(--color-ink)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'var(--color-ink-mid)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="formulario" className="py-[var(--section-y)] md:py-[var(--section-y-md)] bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Formulário
          </span>
          <h2 className="font-display leading-[1.08] tracking-tight mb-12" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
            Cadastre-se
          </h2>

          <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start">
            {/* Form card */}
            <div
              className="rounded-[28px] border px-9 py-10"
              style={{ background: 'var(--color-bg-warm)', borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
            >
              <VoluntarioForm />
            </div>

            {/* Sidebar */}
            <aside className="sticky top-[84px]">
              <div
                className="rounded-[28px] border overflow-hidden"
                style={{ background: 'white', borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
              >
                {/* Header ink */}
                <div className="px-7 py-6" style={{ background: 'var(--color-ink)' }}>
                  <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Informações de Contato
                  </p>
                  <h3 className="font-display text-[22px] leading-snug text-white">
                    Fale conosco<br />diretamente
                  </h3>
                </div>

                {/* Body */}
                <div className="px-7 py-6 flex flex-col gap-5">
                  {contactInfo.map((item, i) => (
                    <div key={item.label}>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-[38px] h-[38px] flex-shrink-0 flex items-center justify-center rounded-[10px]"
                          style={{ background: 'var(--color-surface-warm)' }}
                        >
                          <item.icon className="w-4 h-4" strokeWidth={1.5} style={{ stroke: 'var(--color-primary)' }} />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.06em] mb-0.5" style={{ color: 'var(--color-ink-soft)' }}>
                            {item.label}
                          </p>
                          <p className="text-sm font-medium leading-snug whitespace-pre-line" style={{ color: 'var(--color-ink)' }}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                      {i < contactInfo.length - 1 && (
                        <div className="mt-5 h-px" style={{ background: 'oklch(0.10 0.008 50 / 0.09)' }} />
                      )}
                    </div>
                  ))}

                  <div className="h-px" style={{ background: 'oklch(0.10 0.008 50 / 0.09)' }} />

                  {/* WhatsApp button */}
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Quero saber mais sobre o voluntariado."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3.5 rounded-[10px] font-bold text-sm text-white transition-all duration-150 hover:opacity-90 hover:-translate-y-px"
                    style={{ background: 'var(--color-whatsapp)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d={WhatsAppPath} />
                    </svg>
                    Falar pelo WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-[var(--section-y)] md:py-[var(--section-y-md)]"
        style={{ background: 'var(--color-surface-warm)' }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <span className="block text-center text-[11px] font-extrabold tracking-[0.14em] uppercase mb-3.5" style={{ color: 'var(--color-primary)' }}>
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-center leading-[1.08] tracking-tight mb-12" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
            Perguntas e respostas
          </h2>

          <div className="max-w-[760px] mx-auto flex flex-col gap-2">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="mb-2 border rounded-[18px] bg-white overflow-hidden transition-shadow duration-150 data-[state=open]:shadow-[0_4px_20px_oklch(0_0_0/0.06)]"
                  style={{ borderColor: 'oklch(0.10 0.008 50 / 0.09)' }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 text-[15px] font-semibold text-left hover:no-underline"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm leading-[1.75]" style={{ color: 'var(--color-ink-mid)' }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Pronto para começar?"
        subtitle="Entre em contato pelo nosso WhatsApp e saiba como participar da próxima ação."
        primaryAction={{ label: 'Fale conosco no WhatsApp', href: 'https://wa.me/5511999999999?text=Olá! Quero participar como voluntário.' }}
      />
    </Layout>
  )
}

export default Voluntario
