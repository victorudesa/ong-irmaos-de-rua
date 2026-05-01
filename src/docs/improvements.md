# Melhorias e Estrutura de Componentes React

Este documento detalha as melhores práticas para a estrutura de componentes React em um sistema de design profissional, e como mapear os Component Properties (Variantes) do Figma direto para o código.

## 1. Estrutura de Componentes React (Design System Profissional)

O mercado adotou uma separação muito clara entre os "Componentes de Base" (UI/Atoms) e os "Componentes de Domínio" (Organisms). A melhor prática é estruturar a pasta `src/components` assim:

```text
src/
  components/
    ui/                <-- O "Figma Core". Componentes burros, focados em visual e variantes. 
                       Ex: Button, Badge, Input, Card. NENHUMA lógica de negócio aqui.
    
    layout/            <-- Organismos globais.
                       Ex: Navbar, Footer, Section, PageHero.
    
    forms/             <-- Estruturas de formulário complexas que usam os componentes de UI.
                       Ex: VolunteerForm, DonationForm.
    
    shared/            <-- (Ou 'modules') Componentes que juntam blocos de UI para criar 
                       algo de negócio. Ex: MetricsGrid, ImpactCard, CtaBanner.
```

**Por que isso é profissional?** Porque se você precisar mudar o estilo do botão primário do Figma, você vai APENAS em `components/ui/button.tsx`. Você não precisa caçar botões perdidos dentro do `CtaBanner`.

## 2. Como implementar as Variantes no React

No Figma, você tem *Component Properties* (Variants, Booleans, Text). No React moderno (usando shadcn + Tailwind), nós usamos uma biblioteca chamada **CVA (`class-variance-authority`)** para espelhar isso perfeitamente.

O CVA permite que você crie variantes exatamente como no Figma:

```tsx
// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  // Estilos base que todo botão tem
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:ring-2 disabled:opacity-50",
  {
    variants: {
      // 1. Variante de Intenção/Estilo
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-neutral-100 hover:text-foreground",
        ghost: "hover:bg-neutral-100 hover:text-foreground",
      },
      // 2. Variante de Tamanho
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

No JSX da aplicação, você usa como se fosse o painel da direita do Figma:
`<Button variant="outline" size="lg">Doe Agora</Button>`

## 3. Quais elementos *SEMPRE* têm variantes (Mentalidade Figma -> React)

Além dos botões, em um Design System robusto, estes são os componentes que **obrigatoriamente** possuem matrizes de variantes no código:

### A. Badges / Tags (Etiquetas)
Muito comuns em listagens, status ou categorias.
*   **Variantes (Intent):** `default` (neutro), `primary` (destaque), `success` (concluído), `warning` (atenção), `destructive` (erro/cancelado).
*   **Variantes (Estilo):** `solid` (fundo preenchido), `outline` (só borda), `soft/subtle` (fundo claro com texto escuro - ex: fundo de ícone).

### B. Tipografia (Text / Heading)
Em vez de ter tags perdidas, crie variantes semânticas baseadas na escala.
*   **Variantes (Role):** `h1`, `h2`, `h3`, `h4`, `p`, `lead` (parágrafo de destaque), `muted` (texto de suporte).
*   *Exemplo no React:* `<Typography variant="h2">Nossa Missão</Typography>` já puxa a fonte (ex: Fraunces), tamanho correto e tracking.

### C. Cards
Cards geralmente têm estados e hierarquias diferentes.
*   **Variantes (Elevation):** `flat` (sem sombra, com borda), `elevated` (com sombra customizada), `solid` (fundo cinza sem borda).
*   **Variantes (Interactive):** `true/false` (aplica animação de hover e elevação/sombra dinâmica).

### D. Inputs e Formulários
Formulários no Figma têm estados bem definidos.
*   **Variantes (State):** `default`, `error` (borda e texto de erro), `disabled` (cinza/opacidade).
*   **Variantes (Size):** `sm`, `default`, `lg` (devem casar com a altura dos botões para ficarem alinhados lado a lado).

### E. Section Labels (Etiquetas de Seção)
Pequenas etiquetas acima dos títulos das seções que contextualizam a navegação.
*   **Variantes (Theme):** `default` (texto colorido para fundo claro) e `inverted` (texto com contraste menor/branco com opacidade para fundos escuros).

### F. Alertas / Banners (Callouts)
Avisos de sistema no topo do site ou dentro de formulários.
*   **Variantes (Intent):** `info`, `success`, `warning`, `error`. Mudam o fundo, a borda e a cor do ícone de acordo com o peso do alerta.

---

## 4. Log de Implementação

Aqui mantemos um registro das etapas já executadas a partir destas diretrizes.

### Etapa 1: Componente Button
- **O que foi feito:** O componente nativo `button.tsx` do shadcn foi refatorado.
- **Base:** Alterado de `rounded-4xl` para `rounded-md` (8px).
- **Variantes adicionadas/ajustadas:**
  - `default`: Adicionada animação dinâmica de escala e tokens de sombra.
  - `inverted`: Criada para botões claros em fundos escuros.
  - `whatsapp`: Criada com a cor de marca e animação focada.
  - `outline`: Ajustada para o padrão neutro do projeto.
- **Refatoração de Uso:** O componente `CtaBanner.tsx` foi limpo, substituindo dezenas de classes utilitárias poluidoras pelas novas props `variant="inverted"` e `variant="outline"`.

### Etapa 2: Tipografia Semântica e Section Labels
- **O que foi feito:** O CSS base já continha as variáveis de tipografia (`font-display`, `font-sans`) e tokens de cores em OKLCH do design system. Criamos os componentes React para encapsular essas classes e evitar overengineering no JSX.
- **Componentes criados:**
  - `src/components/ui/heading.tsx`: Encapsula a lógica de títulos. Traz a fonte Fraunces (`font-display`) por padrão, e aceita a tag (`h1` a `h6`), tamanho (`size="sm|default|lg|hero"`) e cor (`color="default|primary|inverted"`).
  - `src/components/ui/section-label.tsx`: Encapsula as etiquetas pequenas acima dos títulos, garantindo tracking e uppercase consistentes. Suporta as variantes `default` e `inverted`.
- **Refatoração de Uso:** O `CtaBanner.tsx` foi atualizado para usar o `<Heading color="inverted">` em vez da tag `<h2>` gigantesca com 10 classes do Tailwind.

### Etapa 3: Organismos de Layout e Cards
- **O que foi feito:** Criamos os componentes estruturais principais para acabar com o "copia e cola" de divs e classes repetitivas no layout.
- **Componentes criados:**
  - `src/components/layout/section.tsx`: O wrapper universal das páginas. Gera a tag `<section>` semântica com o espaçamento dinâmico (`spacing="default|compact|none"`) baseado nos tokens `var(--section-y)`. Também embute opcionalmente o container centralizado de `1200px`. Suporta mudança rápida de fundo (`bg="default|primary|muted|dark"`).
  - `src/components/shared/feature-card.tsx`: O Card de destaque desenhado no figma. Já traz o ícone com fundo `neutral-100`, título, descrição, e as sombras baseadas nos tokens (`shadow-card`), além da animação de elevação nativa ao passar o mouse.
- **Refatoração de Uso:** O componente `CtaBanner.tsx` substituiu a tag manual de `<section>` + `<div className="container...">` pelo limpo `<Section bg="primary" spacing="compact">`.

### Etapa 4: Migração das Páginas
- **O que foi feito:** O componente `Section` foi enriquecido para aceitar as props `label`, `title` e `centered` (usando internamente os novos `<SectionLabel>` e `<Heading>`), tornando-o um substituto direto do componente legado.
- **Páginas refatoradas:**
  - `Index.tsx`: Migrado de `@/components/Section` e `@/components/Card` para `@/components/layout/section` e `@/components/shared/feature-card`. Fundos de seção passaram a usar `bg="muted"` em vez de `className="bg-neutral-50"`.
  - `QuemSomos.tsx`: Mesma migração. Todos os cards de Missão/Visão/Valores usam agora o `<FeatureCard>`.
  - `DoeAgora.tsx`: Mesma migração. O bloco de impacto (`<section className="py-16 bg-primary">`) foi substituído pelo elegante `<Section bg="primary" spacing="compact">`.
  - `Voluntario.tsx`: Mesma migração de `Section` e remoção do componente legado `Card`.
- **Resultado:** Os componentes legados `Section.tsx` e `Card.tsx` deixaram de ser usados nas páginas. O código ficou mais legível e aderente ao Design System.
