import { Image, Eye, Sparkles, Target, Mail, Building, CalendarDays, MapPin, User } from 'lucide-react'
import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'
import { Section } from '@/components/layout/section'
import { FeatureCard } from '@/components/shared/feature-card'

const missionCards = [
  { icon: Target, title: 'Missão', description: 'Levar acolhimento, alimentação e dignidade às pessoas em situação de rua no ABC Paulista e centro de São Paulo.' },
  { icon: Eye, title: 'Visão', description: 'Um mundo onde ninguém precisa dormir nas ruas sem amparo, sem comida e sem esperança.' },
  { icon: Sparkles, title: 'Valores', description: 'Empatia, solidariedade, transparência e respeito à dignidade humana em tudo o que fazemos.' },
]

const orgDetails = [
  { icon: Building, label: 'CNPJ', value: '00.000.000/0001-00' },
  { icon: CalendarDays, label: 'Fundação', value: '2018' },
  { icon: MapPin, label: 'Atuação', value: 'ABC Paulista e Centro de SP' },
  { icon: Mail, label: 'E-mail', value: 'contato@irmaosderua.org.br' },
]

const team = [
  { name: 'Carlos Henrique', role: 'Fundador' },
  { name: 'Ana Paula Santos', role: 'Coordenadora de Voluntários' },
  { name: 'Ricardo Oliveira', role: 'Responsável por Logística' },
  { name: 'Juliana Mendes', role: 'Comunicação e Redes Sociais' },
]

const QuemSomos = () => {
  return (
    <Layout>
      <PageHero
        title="Quem Somos"
        breadcrumb="Quem Somos"
        subtitle="Conheça a história e as pessoas por trás da Irmãos de Rua"
      />

      {/* Nossa História */}
      <Section label="Nossa História" title="De um gesto simples a uma missão de vida">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] bg-muted border border-border rounded-xl flex items-center justify-center">
            <Image className="w-10 h-10 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
          <div className="space-y-5 text-base text-foreground leading-relaxed">
            <p>
              Tudo começou em <strong>2005</strong>, quando um pequeno grupo de amigos decidiu levar marmitas e palavras de acolhimento às pessoas em situação de rua na região do ABC Paulista. O que era um gesto espontâneo se transformou em compromisso.
            </p>
            <p>
              Ao longo dos anos, a iniciativa cresceu e ganhou forma. Em <strong>2018</strong>, a Irmãos de Rua foi oficialmente registrada como organização sem fins lucrativos, formalizando uma missão que já mudava centenas de vidas.
            </p>
            <p>
              Hoje, contamos com mais de <strong>200 voluntários ativos</strong> e já atendemos mais de <strong>1.000 pessoas</strong> em São Caetano do Sul, Santo André, São Bernardo do Campo e no centro de São Paulo — levando alimentação, dignidade e esperança a cada ação.
            </p>
          </div>
        </div>
      </Section>

      {/* Nossa Missão */}
      <Section label="Nossa Missão" title="O que nos move" centered bg="muted">
        <div className="grid md:grid-cols-3 gap-6">
          {missionCards.map((card) => (
            <FeatureCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>
      </Section>

      {/* Transparência */}
      <Section label="Transparência" title="Gestão transparente e responsável">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="border border-border rounded-xl p-8">
            <ul className="space-y-5">
              {orgDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-5 text-base text-foreground leading-relaxed">
            <p>
              Acreditamos que a confiança dos nossos doadores e voluntários é o alicerce de tudo. Por isso, mantemos uma gestão financeira aberta e responsável, com prestações de contas regulares nas nossas redes sociais.
            </p>
            <p>
              Cada real doado é direcionado para ações que impactam diretamente a vida de quem mais precisa — da compra de alimentos e cobertores ao suporte de ressocialização.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a gestão da ONG."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:underline transition-colors duration-200 w-fit"
            >
              Fale Conosco →
            </a>
          </div>
        </div>
      </Section>

      {/* Nossa Equipe */}
      <Section label="Nossa Equipe" title="As pessoas que fazem acontecer" centered bg="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-muted border border-border rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  )
}

export default QuemSomos
