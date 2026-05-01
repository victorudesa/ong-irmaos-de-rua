import { Heart, Users, Lightbulb, Globe, Image, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'
import { Section } from '@/components/layout/section'
import CtaBanner from '@/components/CtaBanner'
import { VoluntarioForm } from '@/components/forms/VoluntarioForm'

const reasons = [
  { icon: Heart, text: 'Impacte vidas diretamente' },
  { icon: Users, text: 'Faça parte de uma comunidade solidária' },
  { icon: Lightbulb, text: 'Desenvolva novas habilidades' },
  { icon: Globe, text: 'Contribua para a transformação social' },
]

const steps = [
  { number: 1, title: 'Preencha o formulário', description: 'Conte um pouco sobre você, sua disponibilidade e como gostaria de contribuir.' },
  { number: 2, title: 'Receba orientações', description: 'Nossa equipe entrará em contato para explicar como funcionam as ações semanais.' },
  { number: 3, title: 'Participe das ações', description: 'Escolha os dias que combinam com sua agenda e comece a transformar vidas.' },
]

const contactInfo = [
  { icon: MapPin, label: 'Endereço', value: 'Rua Ribeirão Pires, 87 — São Caetano do Sul, SP' },
  { icon: Phone, label: 'WhatsApp', value: '(11) 99999-9999' },
  { icon: Mail, label: 'Email', value: 'contato@irmaosderua.org.br' },
  { icon: Clock, label: 'Ações', value: 'Sábados e domingos, das 8h às 12h' },
]

const faqs = [
  { q: 'Preciso ter experiência?', a: 'Não! Qualquer pessoa com vontade de ajudar é bem-vinda. Oferecemos toda a orientação necessária antes da sua primeira ação.' },
  { q: 'Qual a frequência mínima?', a: 'Não existe frequência mínima obrigatória. Você participa quando puder — o importante é estar presente quando possível.' },
  { q: 'Onde acontecem as ações?', a: 'Atuamos principalmente na região do ABC Paulista (São Caetano, Santo André, São Bernardo) e no centro de São Paulo.' },
  { q: 'Como é o dia de uma ação?', a: 'Nos reunimos pela manhã para preparar as marmitas e kits. Depois, saímos em grupos para distribuir nas ruas, sempre com acolhimento e respeito.' },
  { q: 'Posso levar amigos?', a: 'Claro! Quanto mais pessoas engajadas, mais vidas conseguimos impactar. Traga sua família e amigos — todos são bem-vindos.' },
]

const Voluntario = () => {
  return (
    <Layout>
      <PageHero
        title="Seja Voluntário"
        breadcrumb="Seja Voluntário"
        subtitle="Junte-se a mais de 200 voluntários que transformam vidas toda semana"
      />

      {/* Por Que Ser Voluntário */}
      <Section label="Por Que Ser Voluntário" title="Razões para fazer parte">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-4">
            {reasons.map((item) => (
              <div key={item.text} className="flex items-center gap-4">
                <div className="w-11 h-11 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-base md:text-lg font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="bg-muted rounded-xl aspect-[4/3] flex items-center justify-center">
            <Image className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
        </div>
      </Section>

      {/* Como Funciona */}
      <Section label="Como Funciona" title="Três passos para começar" bg="muted">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulário */}
      <Section id="formulario" label="Formulário" title="Cadastre-se">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          <div className="md:col-span-2">
            <VoluntarioForm />
          </div>

          <aside className="space-y-6">
            <div className="bg-neutral-50 rounded-xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Informações de Contato</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section label="Dúvidas Frequentes" title="Perguntas e respostas" centered bg="muted">
        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm transition-shadow duration-200">
                <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <CtaBanner
        title="Pronto para começar?"
        subtitle="Entre em contato pelo nosso WhatsApp e saiba como participar da próxima ação."
        primaryAction={{ label: 'Fale conosco no WhatsApp', href: 'https://wa.me/5511999999999' }}
      />
    </Layout>
  )
}

export default Voluntario
