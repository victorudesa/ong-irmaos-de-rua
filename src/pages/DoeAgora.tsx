import { useState } from 'react'
import { UtensilsCrossed, Shirt, HeartHandshake, Copy, Image, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'
import Section from '@/components/Section'
import Card from '@/components/Card'

const whyCards = [
  { icon: UtensilsCrossed, title: 'Alimentação', description: 'Marmitas nutritivas e café da manhã solidário entregues semanalmente nas ruas.' },
  { icon: Shirt, title: 'Dignidade', description: 'Roupas, cobertores e kits de higiene que devolvem o cuidado básico a quem precisa.' },
  { icon: HeartHandshake, title: 'Esperança', description: 'Acolhimento, escuta e apoio na ressocialização para reconstruir vidas.' },
]

const bankDetails = [
  { label: 'Banco', value: 'Banco do Brasil (001)' },
  { label: 'Agência', value: '1234-5' },
  { label: 'Conta Corrente', value: '00012345-6' },
  { label: 'CNPJ', value: '00.000.000/0001-00' },
  { label: 'Titular', value: 'Irmãos de Rua' },
]

const faqs = [
  { q: 'A doação é segura?', a: 'Sim! Todas as transações são feitas por canais bancários oficiais. Você recebe confirmação imediata do pagamento via PIX ou transferência.' },
  { q: 'Emitem recibo ou comprovante?', a: 'Sim. Após a doação, entre em contato pelo nosso WhatsApp e emitimos o recibo oficial da ONG com todos os dados fiscais.' },
  { q: 'Posso deduzir no Imposto de Renda?', a: 'Atualmente nossa entidade não possui certificação para dedução no IR. Estamos trabalhando para obter essa qualificação em breve.' },
  { q: 'Como sei que o dinheiro chegou?', a: 'Publicamos prestações de contas mensais nas nossas redes sociais e enviamos relatórios de impacto para doadores recorrentes.' },
  { q: 'Aceitam doações de alimentos ou roupas?', a: 'Sim! Recebemos doações físicas na nossa sede em São Caetano do Sul. Entre em contato pelo WhatsApp para combinar a entrega.' },
]

const PIX_KEY = '00.000.000/0001-00'

const DoeAgora = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setCopied(true)
      toast.success('Chave PIX copiada!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Não foi possível copiar.')
    }
  }

  return (
    <Layout>
      <PageHero
        title="Doe Agora"
        breadcrumb="Doe Agora"
        subtitle="Sua contribuição chega diretamente a quem mais precisa"
      />

      {/* Por Que Doar */}
      <Section label="Por Que Doar" title="Cada doação transforma uma vida" centered className="bg-neutral-50">
        <div className="grid md:grid-cols-3 gap-6">
          {whyCards.map((card) => (
            <Card key={card.title} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>
      </Section>

      {/* Como Doar */}
      <Section label="Como Doar" title="Escolha sua forma de contribuir" centered>
        <div className="grid md:grid-cols-2 gap-8">

          {/* PIX */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">PIX</h3>
            <div className="border border-border rounded-lg p-5 flex items-center justify-between gap-4 mb-6">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Chave PIX (CNPJ)</p>
                <p className="text-lg font-semibold text-foreground truncate">{PIX_KEY}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
                aria-label="Copiar chave PIX"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="aspect-square max-w-[200px] mx-auto bg-muted border border-border rounded-xl flex items-center justify-center">
              <Image className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Escaneie o QR Code com seu app bancário
            </p>
          </div>

          {/* TED / Transferência */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">TED / Transferência</h3>
            <ul className="space-y-4 mb-8">
              {bankDetails.map((item) => (
                <li key={item.label} className="flex justify-between items-baseline border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-6">
              <h4 className="text-base font-semibold text-foreground mb-2">Doação Recorrente</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Ajude todos os meses com um valor fixo e garanta que nossas ações nunca parem. Sua contribuição contínua faz toda a diferença.
              </p>
              <Button asChild>
                <a href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a doação recorrente." target="_blank" rel="noopener noreferrer">
                  Saiba Mais
                </a>
              </Button>
            </div>
          </div>

        </div>
      </Section>

      {/* Impact reminder */}
      <section className="py-16 bg-primary">
        <div className="container-page text-center">
          <p className="font-display text-xl md:text-2xl font-semibold text-primary-foreground leading-snug">
            Com R$30 você garante 10 marmitas para quem vive nas ruas
          </p>
        </div>
      </section>

      {/* FAQ */}
      <Section label="Dúvidas Frequentes" title="Perguntas e respostas" centered className="bg-neutral-50">
        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm transition-shadow duration-200"
              >
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
    </Layout>
  )
}

export default DoeAgora
