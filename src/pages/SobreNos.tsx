import { Mail, Building, CalendarDays, MapPin, User } from 'lucide-react'
import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'
import { Section } from '@/components/layout/section'
import aboutUsHeroBanner from '@/assets/images/about-us-hero-banner.jpg'
import sedeAntiga from '@/assets/images/sede-antiga.jpg'
import sedeAtual from '@/assets/images/sede-atual.jpg'
import { ExternalLinkButton } from '@/components/ui/external-link-button'

const orgDetails = [
  { icon: Building, label: 'CNPJ', value: '31.442.548/0001-15' },
  { icon: CalendarDays, label: 'Fundação', value: '2005' },
  { icon: MapPin, label: 'Atuação', value: 'ABC Paulista e Centro de SP' },
  { icon: Mail, label: 'E-mail', value: 'contato@irmaosderua.org.br' },
]

const team = [
  { name: 'Humberto', role: 'Fundador' },
  { name: 'Cris', role: 'Coordenadora de Voluntários' },
  { name: 'Ricardo Oliveira', role: 'Responsável por Logística' },
  { name: 'Juliana Mendes', role: 'Comunicação e Redes Sociais' },
]

const QuemSomos = () => {
  return (
    <Layout>
      <PageHero
        photoVariant
        bgImage={aboutUsHeroBanner}
        bgImageAlt="Voluntários do Irmãos de Rua reunidos em uma ação"
        title="Sobre Nós"
        breadcrumb="Sobre Nós"
        subtitle="Com mais de 20 anos nas ruas, a ONG Irmãos de Rua cresce a cada ação com a ajuda de centenas de voluntários que levam alimento, agasalho e acolhimento a quem mais precisa."
      />

      {/* Nossa História */}
      <Section label="Nossa História" title="De um gesto simples a uma missão de vida">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <figure>
            <div className="aspect-[4/3] rounded-xl overflow-hidden max-w-[440px] mx-auto">
              <img
                src={sedeAntiga}
                alt="Sede antiga da ONG Irmãos de Rua com veículos da operação"
                className="w-full h-full object-cover"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-sm text-center text-muted-foreground italic">
              Sede antiga da ONG, onde tudo começou!
            </figcaption>
          </figure>
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

        <div className="grid md:grid-cols-2 gap-10 items-start mt-16">
          <div className="space-y-5 text-base text-foreground leading-relaxed order-2 md:order-1">
            <p>
              Com o crescimento da rede de voluntários e o aumento das demandas, <strong>reformamos e expandimos recentemente</strong> a nossa sede — um espaço maior e mais estruturado para receber doações, preparar marmitas e organizar as ações semanais com mais eficiência.
            </p>
            <p>
              É daqui que partem os times todo sábado e domingo, levando alimento, agasalho e acolhimento às ruas. A sede atual representa não só o crescimento da ONG, mas também a confiança de cada voluntário, doador e parceiro que abraçou a causa.
            </p>
          </div>
          <figure className="order-1 md:order-2">
            <div className="aspect-[4/3] rounded-xl overflow-hidden max-w-[440px] mx-auto">
              <img
                src={sedeAtual}
                alt="Sede atual da ONG Irmãos de Rua"
                className="w-full h-full object-cover"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-sm text-center text-muted-foreground italic">
              Sede atual da ONG, onde a missão continua.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* Transparência */}
      <Section label="Transparência" title="Gestão transparente e responsável">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="border border-border rounded-xl p-6 sm:p-8">
            <ul className="space-y-5">
              {orgDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground break-words">{item.value}</p>
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
            <ExternalLinkButton
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a gestão da ONG."
              variant="outline"
              className="w-fit"
            >
              Fale Conosco no WhatsApp
            </ExternalLinkButton>
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
