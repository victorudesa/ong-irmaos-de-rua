import { Link } from 'react-router-dom'
import { ChevronDown, Users, UtensilsCrossed, Coffee, Shirt, Droplets, Heart, Wallet, Share2, ChevronRight, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { Section } from '@/components/layout/section'
import { FeatureCard } from '@/components/shared/feature-card'
import CtaBanner from '@/components/CtaBanner'
import MetricsGrid from '@/components/MetricsGrid'
import heroBg from '@/assets/hero-bg.jpg'

const actions = [
  { icon: UtensilsCrossed, title: 'Entrega de Marmitas', description: 'Preparamos e distribuímos refeições completas todas as semanas para pessoas em situação de rua.' },
  { icon: Coffee, title: 'Café da Manhã Solidário', description: 'Servimos café da manhã com pão, café e frutas para começar o dia com dignidade.' },
  { icon: Shirt, title: 'Distribuição de Roupas e Cobertores', description: 'Arrecadamos e entregamos agasalhos, cobertores e roupas, especialmente no inverno.' },
  { icon: Droplets, title: 'Kits de Higiene', description: 'Montamos kits com sabonete, escova de dentes, pasta e outros itens essenciais de higiene pessoal.' },
  { icon: Heart, title: 'Acolhimento e Ressocialização', description: 'Oferecemos escuta, orientação e apoio para quem deseja reconstruir sua vida fora das ruas.' },
]

const howToHelp = [
  { icon: Wallet, title: 'Doação Financeira', description: 'PIX, transferência ou recorrente' },
  { icon: Users, title: 'Voluntariado', description: 'Participe das ações semanais' },
  { icon: Share2, title: 'Divulgação', description: 'Compartilhe nas redes sociais' },
]

const metrics = [
  { number: '+5.000', label: 'Marmitas Entregues' },
  { number: '+200', label: 'Voluntários Ativos' },
  { number: '19', label: 'Anos de Atuação' },
  { number: '+1.000', label: 'Pessoas Atendidas' },
]

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Voluntários ajudando pessoas em situação de rua"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="relative z-10 container text-center text-primary-foreground px-6">
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto mb-6">
            Transformando vidas nas ruas do ABC e São Paulo
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 text-white/80">
            Desde 2005 levando acolhimento, alimentação e esperança
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/doe-agora">Doe Agora</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/voluntario">Seja Voluntário</Link>
            </Button>
          </div>
        </div>
        <a
          href="#sobre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Rolar para baixo"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </a>
      </section>

      {/* Métricas */}
      <MetricsGrid metrics={metrics} />

      {/* Quem Somos */}
      <Section id="sobre" label="Quem Somos" title="Uma família que acolhe quem a sociedade esqueceu">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Tudo começou em 2005, quando um pequeno grupo de amigos decidiu que não podia mais ignorar as pessoas dormindo nas calçadas do ABC Paulista. Com marmitas preparadas em casa e muita vontade de ajudar, nasceu o Irmãos de Rua.
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Desde então, crescemos para uma rede de mais de 200 voluntários que atuam semanalmente na região do ABC e no centro de São Paulo, oferecendo alimentação, roupas, cobertores, kits de higiene e, acima de tudo, dignidade e acolhimento.
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Oficialmente registrada como ONG em 2018, mantemos o mesmo espírito de família que nos uniu no início: a crença de que ninguém deveria ser invisível.
            </p>
          </div>
          <div className="bg-muted rounded-xl aspect-[4/3] flex items-center justify-center">
            <Users className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
        </div>
      </Section>

      {/* O Que Fazemos */}
      <Section label="O Que Fazemos" title="Ações que transformam" bg="muted">
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {actions.map((action) => (
            <FeatureCard key={action.title} icon={action.icon} title={action.title} description={action.description} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaBanner
        title="Sua ajuda transforma vidas"
        subtitle="Cada gesto faz a diferença para quem vive nas ruas"
        primaryAction={{ label: 'Faça uma Doação', to: '/doe-agora' }}
        secondaryAction={{ label: 'Seja Voluntário', to: '/voluntario' }}
      />

      {/* Como Ajudar */}
      <Section label="Como Ajudar" title="Escolha sua forma de contribuir">
        <div className="bg-card rounded-xl border border-border">
          {howToHelp.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 p-5 md:p-6 cursor-pointer hover:bg-muted transition-all duration-200 ${
                index < howToHelp.length - 1 ? 'border-b border-border' : ''
              } ${index === 0 ? 'rounded-t-xl' : ''} ${index === howToHelp.length - 1 ? 'rounded-b-xl' : ''}`}
            >
              <div className="w-11 h-11 bg-muted rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </Section>

      {/* Instagram */}
      <Section label="Instagram" title="@ongirmaosderua" centered bg="muted">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-xl aspect-square flex items-center justify-center">
              <Image className="w-10 h-10 text-muted-foreground/40" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <a
            href="https://www.instagram.com/ongirmaosderua"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold text-sm hover:underline transition-all duration-200"
          >
            Siga @ongirmaosderua no Instagram →
          </a>
        </p>
      </Section>
    </Layout>
  )
}

export default Index
