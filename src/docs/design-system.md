# Design System — Irmãos de Rua

> Documento **implementado e vigente**. Reflete o estado atual do código após o redesign da homepage (commit `d4fdcb0`).

---

## 0. Princípios

Três princípios que guiam todas as decisões abaixo. Quando estiver em dúvida, voltar aqui.

1. **Hierarquia de intenção do usuário.** O visitante de uma ONG quer fazer uma de três coisas: (a) entender a causa em 10 segundos, (b) doar, (c) virar voluntário. Tudo no design system privilegia essas jornadas — botões de doação têm peso visual maior, CTAs nunca competem entre si, cards são scaneáveis em 2 segundos.

2. **Calor humano sem perder seriedade.** ONG social precisa transmitir confiança (você está pedindo dinheiro/tempo) e acolhimento (a causa é humana). Isso vira: tipografia editorial nos títulos (Fraunces), neutros levemente quentes (não cinzas frios), vermelho do coração com presença mas sem agressividade.

3. **Tudo passa por tokens.** Nenhum valor arbitrário no JSX (`text-[13px]`, `bg-[#25D366]`, `py-24`). Se um valor não está no `@theme`, ele é adicionado. Isso garante que mudanças de identidade são feitas em **um lugar** e refletem em todo o site.

---

## 1. Tipografia

### Famílias

| Papel | Família | Fonte de entrega |
| --- | --- | --- |
| **Display** (títulos hero, page titles) | **DM Serif Display** | Google Fonts (via `<link>` no `index.html`) |
| **Sans** (body, navbar, botões, cards) | **Plus Jakarta Sans** | Google Fonts (via `<link>` no `index.html`) |

> **Por que DM Serif Display:** serifada editorial limpa, com eixo itálico expressivo. É usada diretamente no hero para criar contraste emocional com o sans. O itálico em amber (`color: var(--color-amber)`) é o elemento visual mais marcante da homepage.

> **Por que Plus Jakarta Sans:** sans-serif geométrica humanista com excelente legibilidade em todos os pesos. Substitui Inter e Fraunces Variable, eliminando a dependência do `@fontsource-variable`.

> **Fallbacks configurados no `@theme`:** `--font-display` cai para `'Fraunces Variable'` (ainda instalada via npm) e depois `Georgia`. `--font-sans` cai para `'Inter Variable'` e depois `sans-serif`.

### Setup no `index.css`

```css
/* DM Serif Display + Plus Jakarta Sans via Google Fonts — injetado em index.html */

@theme inline {
  --font-sans: 'Plus Jakarta Sans', 'Inter Variable', sans-serif;
  --font-display: 'DM Serif Display', 'Fraunces Variable', Georgia, serif;
}
```

### Setup no `index.html`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Escala tipográfica (modular scale 1.25 — "major third")

Substitui os valores arbitrários (`text-[13px]`, `text-[15px]`, `text-[48px]`, `text-[56px]`) por tokens consistentes.

| Token | Tamanho | Line-height | Uso |
| --- | --- | --- | --- |
| `--text-xs` | `12px` | `1.5` | Captions, labels de input, copyright |
| `--text-sm` | `14px` | `1.6` | Descrições de card, breadcrumbs, links secundários |
| `--text-base` | `16px` | `1.7` | Body padrão |
| `--text-lg` | `18px` | `1.7` | Body de destaque, parágrafos hero internos |
| `--text-xl` | `20px` | `1.5` | Subtítulos, banners de impacto |
| `--text-2xl` | `24px` | `1.3` | H3 cards principais |
| `--text-3xl` | `30px` | `1.25` | H2 mobile |
| `--text-4xl` | `36px` | `1.2` | H2 desktop, H1 mobile (páginas internas) |
| `--text-5xl` | `48px` | `1.1` | H1 desktop (páginas internas) |
| `--text-6xl` | `60px` | `1.05` | Hero H1 desktop (apenas home) |

**Regras de uso:**
- **Display (Fraunces)** a partir de `text-3xl` (30px). Cobre H2 mobile e tudo acima — garante que a fonte aparece consistentemente entre breakpoints.
- **Sans (Inter)** em tudo abaixo de `text-3xl`, e em qualquer texto de UI (botões, navbar, labels).
- Tracking negativo (`tracking-tight`) só em títulos display grandes (`text-4xl+`). Inter no body usa tracking normal.

> **Sobre Fraunces em 30px:** Fraunces é variable font com eixo `opsz` (optical size). Em tamanhos menores (~30px), o navegador interpola automaticamente para uma versão da fonte com serifas mais robustas e menor contraste de traço. Ou seja, ela é **desenhada pra funcionar bem em 30px** — algo que fontes estáticas display não conseguem. Se notarmos ruído visual mesmo assim, podemos forçar `font-optical-sizing: auto` ou definir `font-variation-settings: "opsz" 30` no CSS do `text-3xl`.

### Pesos

Reduzir vocabulário para evitar inconsistência:

- **400** — body padrão
- **500** — links de navegação, ênfase leve
- **600** — botões, títulos de card, section labels
- **700** — H1 e H2 (display)
- **800-900** — não usar (display fica pesada demais)

### Section labels (mantém o padrão atual mas tokenizado)

Pequena etiqueta acima dos H2 que dá contexto da seção (ex: "Quem Somos", "Como Doar"):

**Variante padrão (fundo claro):**
```
text-xs font-semibold uppercase tracking-widest text-primary
```

**Variante invertida (fundo escuro — `surface-dark` ou `primary` como background):**
```
text-xs font-semibold uppercase tracking-widest text-primary-foreground/80
```

> Em fundo escuro, o vermelho do primary tem contraste insuficiente com o `surface-dark` (ambos são tons "carregados" — vermelho sobre quase-preto fica vibrando, fere acessibilidade). Usar branco com 80% de opacidade preserva a hierarquia (label menos enfatizada que o título) e garante legibilidade.

> Antes era `text-[13px]` arbitrário. Padronizado em `text-xs` (12px) — diferença visual desprezível, ganho semântico grande.

---

## 2. Cores

### Filosofia da paleta

- **Primary (vermelho)** = ação, doação, identidade. Aparece em CTAs principais, ícones de destaque, section labels, badges. Mantido como cor do coração da logo.
- **Neutros (warm gray)** = base de quase tudo. Usar uma escala completa de 9 tons (vs. 5 tons incompletos do projeto antigo).
- **Surface escura** = footer, hero de páginas internas. Não é "secondary", é uma escolha de superfície escura.
- **Accent (não usado por enquanto)** — removido. O `--accent: 37 91% 55%` (laranja) do projeto antigo nunca foi usado. Não definir cores sem propósito.

### Paleta primary (vermelho do coração — escala completa de 9 tons)

Base: `oklch(0.55 0.20 25)` ≈ vermelho médio caloroso (matiz próximo ao do projeto antigo `hsl(0 72% 51%)`, recalibrado em OKLCH para variações consistentes).

**Uso especial no redesign:** o `+` das métricas (`MetricsGrid`) é renderizado em `var(--color-primary)` enquanto o número em si usa `var(--color-ink)`. Gera contraste editorial sutil.

| Token | OKLCH | Uso |
| --- | --- | --- |
| `--primary-50`  | `oklch(0.97 0.02 25)` | Reserva (ver nota abaixo) |
| `--primary-100` | `oklch(0.93 0.05 25)` | Hover de fundo sutil |
| `--primary-200` | `oklch(0.86 0.10 25)` | — |
| `--primary-300` | `oklch(0.78 0.14 25)` | — |
| `--primary-400` | `oklch(0.67 0.18 25)` | — |
| `--primary-500` | `oklch(0.55 0.20 25)` | **Primary base** — botões, ícones, links, badges |
| `--primary-600` | `oklch(0.49 0.20 25)` | Hover do botão primário (era `--primary-dark`) |
| `--primary-700` | `oklch(0.42 0.18 25)` | Active / pressed |
| `--primary-800` | `oklch(0.34 0.15 25)` | — |
| `--primary-900` | `oklch(0.27 0.12 25)` | — |

> **Decisão sobre fundo de ícone em cards:** o projeto antigo usava `--primary-light` (rosa muito claro) como fundo de ícone. Aqui vamos usar **`--neutral-100`** (cinza quente muito claro) em vez de `--primary-50` (rosa pálido). Motivos: (1) competição visual — quando o card já está chamando atenção com conteúdo, um fundo rosa no ícone adiciona ruído cromático; (2) o ícone em si já é `text-primary`, então o contraste vermelho-sobre-cinza é mais forte e claro do que vermelho-sobre-rosa-pálido; (3) neutros criam "moldura" pra cor destacar, não "arena" onde ela disputa. O token `--primary-50` fica disponível pra casos futuros onde realmente precisemos de um banner/destaque em rosa pálido (ex: seção de alerta sutil).

### Paleta neutra (warm gray — 9 tons)

Tom levemente quente (`H ≈ 50`, próximo ao amarelo) em vez de cinza puro — comunica calor humano sem perder neutralidade.

> **Por que `H=50` e não cinza puro (`C=0`):** cinzas com chroma zero parecem "estéreis" — comunicam tecnologia, hospital, escritório corporativo. Para uma ONG social, queremos neutros que combinem com a paleta vermelha sem brigar e que sugiram acolhimento. `H=50` (amarelado bem sutil, com chroma baixíssimo entre `0.005` e `0.015`) entrega isso: o olho não percebe "amarelo" conscientemente, mas registra como mais quente que cinza puro. Mesma família de neutros usada por marcas como Notion, Linear, Stripe (todas marcam levemente "warm" ao invés de cool/blue gray).

| Token | OKLCH | Uso |
| --- | --- | --- |
| `--neutral-50`  | `oklch(0.985 0.005 50)` | Fundo de seções alternadas |
| `--neutral-100` | `oklch(0.96 0.008 50)`  | Placeholder de imagens, inputs |
| `--neutral-200` | `oklch(0.92 0.01 50)`   | Bordas de cards e inputs |
| `--neutral-300` | `oklch(0.86 0.012 50)`  | Bordas de hover, separadores fortes |
| `--neutral-400` | `oklch(0.71 0.015 50)`  | Ícones desabilitados, placeholders |
| `--neutral-500` | `oklch(0.55 0.015 50)`  | Texto de suporte (`muted-foreground`) |
| `--neutral-600` | `oklch(0.45 0.012 50)`  | Texto secundário |
| `--neutral-700` | `oklch(0.35 0.01 50)`   | Texto de corpo padrão |
| `--neutral-800` | `oklch(0.22 0.008 50)`  | Títulos, navbar text |
| `--neutral-900` | `oklch(0.13 0.005 50)`  | Surface escura (footer, hero interno) |

### Tokens semânticos (mapeamento que o shadcn/Tailwind consome)

Esses são os nomes que vão no `@theme inline` — apontam para os valores acima. **Componentes usam esses nomes, nunca os crus.**

```css
@theme inline {
  /* Surface */
  --color-background: var(--neutral-50);  /* na verdade branco puro */
  --color-foreground: var(--neutral-800);

  --color-card: oklch(1 0 0);
  --color-card-foreground: var(--neutral-800);

  --color-muted: var(--neutral-100);
  --color-muted-foreground: var(--neutral-500);

  --color-border: var(--neutral-200);
  --color-input: var(--neutral-200);

  /* Primary */
  --color-primary: var(--primary-500);
  --color-primary-foreground: oklch(1 0 0);
  --color-primary-hover: var(--primary-600);
  --color-primary-subtle: var(--primary-50);  /* fundo de ícone em card */

  /* Surface escura (footer, hero interno) */
  --color-surface-dark: var(--neutral-900);
  --color-surface-dark-foreground: oklch(1 0 0);
  --color-surface-dark-muted: oklch(1 0 0 / 0.7);

  /* Semânticas */
  --color-success: oklch(0.65 0.18 145);    /* verde */
  --color-destructive: oklch(0.55 0.22 25); /* vermelho mais escuro que primary */
  --color-destructive-foreground: oklch(1 0 0);

  /* Externo */
  --color-whatsapp: oklch(0.74 0.17 150);   /* #25D366 em OKLCH */

  /* Amber accent — itálico no hero, destaques editoriais */
  --color-amber:      oklch(0.72 0.17 55);
  --color-amber-dark: oklch(0.60 0.17 55);

  /* Surface warm — off-white quente para fundos de seção */
  --color-surface-warm: oklch(0.94 0.016 58);
  --color-bg-warm:      oklch(0.97 0.012 60);

  /* Ink scale — usada no lugar de neutral-800/900 para superfícies densas */
  --color-ink:      oklch(0.10 0.008 50);   /* quase preto — footer, logo dark mark */
  --color-ink-mid:  oklch(0.38 0.010 50);   /* texto médio */
  --color-ink-soft: oklch(0.58 0.010 50);   /* texto suave, captions */

  /* Focus ring */
  --color-ring: var(--primary-500);
}
```

> **Por que `--color-ink` em vez de `--color-surface-dark`:** `surface-dark` (`neutral-900`) é `oklch(0.13 0.005 50)`. O `ink` é ainda mais escuro (`oklch(0.10 0.008 50)`) e ligeiramente mais cromático. Usado no logo mark do Navbar (fundo do box do coração) e no Footer para um preto mais rico que o neutro puro.

> **Por que `--color-amber`:** o hero usa `<em style={{ color: 'var(--color-amber)' }}>vidas</em>` em itálico para criar o ponto focal emocional da página. Amber foi escolhido por complementar o vermelho primário sem competir com ele (hue distante, H=55 vs H=25).
```

> **Observação sobre `secondary`:** o projeto antigo usava `--secondary: 0 0% 13%` para texto escuro **e** para fundo escuro. Isso é confuso — uma cor não deveria servir como "fundo do hero" e "cor do título" simultaneamente. Aqui separamos: títulos usam `--color-foreground` (`neutral-800`), e superfícies escuras usam `--color-surface-dark` (`neutral-900`). Mais explícito.

### Contraste e acessibilidade

Todas as combinações abaixo passam **WCAG AA** (4.5:1 para texto normal, 3:1 para texto grande):

- `foreground` sobre `background` ✓ AAA
- `muted-foreground` sobre `background` ✓ AA
- `primary-foreground` sobre `primary` ✓ AAA
- `surface-dark-foreground` sobre `surface-dark` ✓ AAA
- `surface-dark-muted` sobre `surface-dark` ✓ AA (verificar antes de produção)

---

## 3. Espaçamento

Tailwind v4 já usa escala de 4px. Padronizar **dois tokens semânticos** para ritmo vertical de seção, em vez de `py-24`/`py-20`/`py-16` espalhados:

```css
@theme inline {
  --section-y: 6rem;          /* 96px — padrão (substitui py-24) */
  --section-y-md: 7rem;       /* 112px — md+ (substitui md:py-28) */
  --section-y-compact: 4rem;  /* 64px — compact (substitui py-16) */
  --section-y-compact-md: 5rem; /* 80px md+ */
}
```

**Uso em componentes:**
- Seção padrão: `py-[var(--section-y)] md:py-[var(--section-y-md)]`
- Seção compacta (métricas, banner de impacto): `py-[var(--section-y-compact)] md:py-[var(--section-y-compact-md)]`
- Hero principal (home): mantém `h-[85vh] min-h-[600px]`
- Hero de página interna: `py-20 md:py-24` — virar `py-[var(--section-y-compact-md)] md:py-[var(--section-y)]`

### Container

```
max-width: 1200px (mantido)
padding horizontal: px-6 md:px-8 (mantido)
```

Centralizar como classe de utilitário (`.container-page` ou variant do shadcn) para não repetir em toda seção.

### Grid padrão

| Layout | Classes |
| --- | --- |
| Texto + imagem (2 col) | `grid md:grid-cols-2 gap-10 md:gap-16 items-center` |
| Cards (3 col) | `grid md:grid-cols-3 gap-6` |
| Métricas / equipe (4 col) | `grid grid-cols-2 md:grid-cols-4 gap-6` |

---

## 4. Bordas, raios e sombras

### Raios

Tailwind v4 já gera `rounded-sm/md/lg/xl/2xl` baseados em `--radius`. Definir base:

```css
@theme inline {
  --radius: 0.625rem; /* 10px — vem do shadcn padrão */
}
```

| Classe | Valor | Uso |
| --- | --- | --- |
| `rounded-md` | `8px` | Botões, inputs, ícones em card |
| `rounded-lg` | `10px` | Cards pequenos, badges |
| `rounded-xl` | `14px` | Cards principais, imagens, seções |
| `rounded-full` | — | Numeração de steps, avatares |

### Sombras

```css
@theme inline {
  --shadow-card: 0 1px 3px 0 oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.04);
  --shadow-card-hover: 0 10px 30px -10px oklch(0 0 0 / 0.10), 0 4px 6px -4px oklch(0 0 0 / 0.06);
}
```

Gera utilitárias `shadow-card` e `shadow-card-hover` automaticamente. Substitui as sombras customizadas do `tailwind.config.ts` antigo.

---

## 5. Botões

Todo botão do projeto passa por dois componentes — nunca estilos inline em `<button>` ou `<a>`.

| Componente | Quando usar |
| --- | --- |
| `<Button>` | Ação nativa HTML: submit de form, `onClick`, reload |
| `<LinkButton>` | Navegação interna via React Router (`<Link>`) |
| `<a href>` | Links externos (fora do React Router) |

Implementação em CVA: [src/components/ui/button.variants.ts](../components/ui/button.variants.ts).

### Variantes

| Variante | Aparência | Quando usar |
| --- | --- | --- |
| `default` | Fundo `--color-primary`, texto branco | CTA principal em qualquer fundo |
| `outline` | Sem fundo, borda + texto primary | Ação secundária em fundos claros |
| `outline-light` | Sem fundo, borda + texto branco | Ação secundária em fundos escuros (hero, CtaBanner) |
| `inverted` | Fundo branco, texto primary | Ação principal sobre fundo primary (CtaBanner) |
| `secondary` | Fundo `neutral-100`, texto escuro | Ações terciárias; raramente usado |
| `ghost` | Sem estilos, apenas hover sutil | Botões de ícone (copiar PIX, ações discretas) |
| `link` | Texto primary, underline no hover | Links informativos em linha |

### Tamanhos

| Size | Altura | Padding X | Font | Uso |
| --- | --- | --- | --- | --- |
| `xs` | 24px | 10px | 12px | Badges, etiquetas |
| `sm` | 32px | 12px | 14px | Botões pequenos, formulários secundários |
| `default` | 36px | 16px | 14px | Botão padrão |
| `lg` | 40px | 24px | 16px | CTAs principais, hero |
| `xl` | 44px | 28px | 16px | Reservado para uso futuro |
| `icon` | 36×36px | — | — | Ícone isolado |
| `icon-sm` | 32×32px | — | — | Ícone pequeno (copiar) |
| `icon-lg` | 40×40px | — | — | Ícone grande |

### Referência rápida por contexto

| Contexto | Componente | Variante | Size |
| --- | --- | --- | --- |
| CTA principal hero / seção clara | `LinkButton` | `default` | `lg` |
| CTA secundário em fundo escuro | `LinkButton` | `outline-light` | `lg` |
| CTA secundário em fundo claro | `LinkButton` | `outline` | `default` |
| Ação principal sobre fundo primary | `LinkButton` | `inverted` | `lg` |
| Submit de formulário | `Button` | `default` | `lg` |
| Botão de ícone (copiar, fechar) | `Button` | `ghost` | `icon-sm` |

### Hover e estados

- **`default` / `inverted`** — `hover:-translate-y-px hover:opacity-90` + `shadow-sm`
- **`outline`** — `hover:bg-primary/5`
- **`outline-light`** — `hover:bg-white/10`
- **`disabled`** — `opacity-50 pointer-events-none` (todos)
- **`focus-visible`** — ring via shadcn base (todos)

### Regras

1. Nunca estilize botões inline — sempre use `variant` + `size`
2. Navegação interna → `<LinkButton to="...">`, nunca `<Button onClick={() => navigate(...)}`
3. Links externos → `<a href target="_blank" rel="noopener noreferrer">` (não existe `LinkButton` para external)
4. Ícones dentro do botão usam `size-4` (default/sm) ou `size-5` (lg/xl); SVGs sem classe `size-*` recebem `size-4` automaticamente via CVA base
5. Adicione nova variante apenas se o comportamento não couber nas existentes — documente aqui e no `CLAUDE.md`

---

## 6. Organismos compartilhados (Atomic Design — camada de organismos)

Componentes que aparecem em múltiplas páginas.

### `<Layout />`
Envolve toda página com Navbar + Footer + WhatsAppButton + `<main>` com padding-top do navbar fixo.

```tsx
<Layout>
  <PageContent />
</Layout>
```

Substitui o padrão `<Navbar /> <main>...</main> <Footer /> <WhatsAppButton />` repetido em todas as páginas atuais.

### `<Navbar />`
Já bem definida. Migrar do projeto antigo praticamente igual, mas tokenizar tamanhos (`text-sm` em vez de `text-[15px]`).

### `<Footer />`
Mesma coisa. Tokenizar e remover `text-[#9CA3AF]` hardcoded — usar `text-surface-dark-muted`.

### `<PageHero title="..." breadcrumb="..." subtitle="..." />`
Hero padrão das páginas internas (`/quem-somos`, `/voluntario`, `/doe-agora`). Hoje é copiado e colado nas três.

```tsx
<PageHero
  title="Doe Agora"
  breadcrumb="Doe Agora"
  subtitle="Sua contribuição chega diretamente a quem mais precisa"
/>
```

### `<HomeHero />`
Hero da home (com imagem de fundo + dois CTAs). Específico, não compartilhado, mas isolado como organismo próprio.

### `<Section label="..." title="..." centered={boolean}>{children}</Section>`
Wrapper que aplica:
- Padding vertical padrão (`section-y`)
- Container 1200px com padding horizontal
- Section label + H2 (com tipografia display correta)
- Slot para conteúdo

Hoje cada `AboutSection`, `HowToHelp`, `WhyDonate` repete a mesma estrutura. Resolve isso.

### `<Card icon={Icon} title="..." description="..." />`
Card padrão com ícone em fundo `primary-subtle`, título e descrição. Usado em "Por Que Doar", "Nossa Missão", "Como Ajudar".

### `<CtaBanner ... />`
Banner de chamada à ação em fundo primary. **Interface dual:** aceita `quote`/`quoteEm` (layout editorial left-aligned, usado na home) OU `title`/`subtitle` (layout centered, usado nas páginas internas). O componente detecta o modo pelo prop `quote`.

```tsx
// Modo editorial (home):
<CtaBanner
  quote="Com R$30 você garante 10 marmitas para quem vive nas ruas."
  primaryAction={{ label: 'Fazer uma doação', to: '/doe-agora' }}
  secondaryAction={{ label: 'Via PIX ou TED', to: '/doe-agora' }}
/>

// Modo centered (páginas internas):
<CtaBanner
  title="Faça parte desta história"
  subtitle="..."
  primaryAction={{ label: 'Inscreva-se', to: '/voluntario' }}
/>
```

Contém overlay de gradiente radial: `radial-gradient(circle at 80% 50%, oklch(0.65 0.20 25) 0%, transparent 60%)`.

### `<MetricsGrid metrics={[{number, label}]} />`
Grade de métricas de impacto. Usada na home.

### `<WhatsAppButton />`
Botão circular fixo (`bottom-7 right-7 z-50`). Usa `var(--color-whatsapp)` com glow shadow: `0 4px 20px oklch(0.74 0.17 150 / 0.4)`.

---

## 7. Componentes shadcn necessários

Lista do que adicionar com `npx shadcn@latest add <nome>`, conforme as páginas evoluírem:

| Componente | Onde será usado |
| --- | --- |
| `button` | já adicionado |
| `accordion` | FAQ na página `/doe-agora` |
| `card` | possível, mas o `<Card />` próprio (organismo) cobre o uso atual |
| `input` | formulário de voluntário |
| `textarea` | formulário de voluntário |
| `label` | formulário de voluntário |
| `form` | formulário de voluntário (com react-hook-form + zod) |
| `sheet` | menu mobile (substitui o toggle hambúrguer manual atual) |
| `sonner` | toast de "PIX copiado" |

---

## 8. Animações e transições

| Elemento | Comportamento | Duração |
| --- | --- | --- |
| Links de cor | `transition-colors` | `200ms` |
| Botão primário hover | `scale-[1.02]` + cor | `200ms` |
| Card hover | `-translate-y-0.5` + sombra | `200ms` |
| WhatsApp button hover | `scale-105` | `200ms` |
| Navbar shadow | `transition-shadow` no scroll | `200ms` |

**Padrão único de duração: 200ms.** Animações de página/transição (se forem adicionadas depois) usam `300-400ms`.

---

## 9. Acessibilidade — checklist mínimo

Manter o que o projeto antigo já fazia bem, e cobrir os gaps:

- [x] `aria-label` em botões só com ícone (WhatsApp, menu mobile, copiar PIX)
- [x] `focus-visible` em todos os interativos (vem do shadcn)
- [x] `rel="noopener noreferrer"` em links externos
- [x] `alt` em todas as imagens (não só placeholder)
- [ ] Verificar contraste de `surface-dark-muted` (texto branco com 70% opacity sobre `neutral-900`)
- [ ] Ordem de foco lógica no menu mobile (resolve com `<Sheet />` do shadcn)
- [ ] `lang="pt-BR"` no `<html>` (verificar `index.html`)
- [ ] Skip link "Pular para conteúdo" no topo (acessibilidade WCAG)

---

## 10. Histórico de mudanças do design system

### v1 → v2 (design system base)

| Aspecto | Antes | Agora | Por quê |
| --- | --- | --- | --- |
| Espaço de cor | HSL | OKLCH | Variações consistentes (clarear/escurecer mantém saturação real) |
| Paleta primary | 3 tons (`--primary`, `-dark`, `-light`) | 9 tons (`50`-`900`) | Mais flexibilidade pra estados, fundos, badges |
| Paleta neutra | 5 tons incompletos (`50, 100, 200, 600, 900`) | 9 tons completos (`50`-`900`) com tom levemente quente | Cobertura completa + calor visual |
| Tipografia display | Inter para tudo | Fraunces nos títulos display, Inter no resto | Personalidade editorial sem perder legibilidade |
| Tamanhos de fonte | Mistura de tokens e arbitrários (`text-[13px]`, `text-[56px]`) | Escala modular 1.25 com 10 tokens | Consistência + manutenção em um lugar |
| `secondary` | Usado para texto E para fundo escuro | Separado: `foreground` (texto) e `surface-dark` (fundo) | Semântica clara, sem cor "polivalente" confusa |
| `accent` | Definido mas não usado | Removido | Não definir cores sem propósito |
| WhatsApp `#25D366` | Hardcoded em 2+ lugares | Token `--color-whatsapp` | Mudança em um lugar |
| Espaçamento de seção | `py-24`, `py-20`, `py-16` ad-hoc | 2 tokens semânticos (`section-y`, `section-y-compact`) | Ritmo previsível |
| Cores `text-[#9CA3AF]` no footer | Hardcoded | Token `surface-dark-muted` | Consistência |
| Estrutura de páginas | Markup duplicado (Navbar/Footer/Hero) | Organismos compartilhados (`Layout`, `PageHero`, `Section`) | DRY + facilita mudanças globais |

### v2 → v3 (redesign homepage — commit `d4fdcb0`)

| Aspecto | Antes | Agora | Por quê |
| --- | --- | --- | --- |
| Fonte display | Fraunces Variable (npm) | DM Serif Display (Google Fonts) | Visual mais limpo, itálico mais expressivo no hero |
| Fonte sans | Inter Variable (npm) | Plus Jakarta Sans (Google Fonts) | Mais quente e amigável, melhor pra causa social |
| Cor amber | Não existia | `--color-amber` + `--color-amber-dark` | Acento editorial no hero (itálico "vidas") |
| Ink scale | Usava `neutral-800/900` | Tokens `--color-ink`, `--color-ink-mid`, `--color-ink-soft` | Preto mais rico e semântica mais explícita |
| Surface warm | Não existia | `--color-surface-warm` + `--color-bg-warm` | Fundos de seção com tom quente consistente |
| Logo mark Navbar | Caixa vermelha | Caixa ink (quase preta) | Menos impacto visual competindo com o CTA |
| MetricsGrid | Layout genérico | Strip branca, números display grandes, `+` em primary | Impacto imediato nas métricas |
| CtaBanner | Apenas layout centered | Dual: editorial left-aligned + centered (backwards-compatible) | Homepage usa layout editorial; páginas internas mantêm centered |
| Homepage (Index.tsx) | Layout sem identidade visual forte | Hero 2-col com tipografia fluida, CarouselActions, grid assimétrico, 2×2 Instagram | Implementação do redesign do Claude Design handoff |

---

## 11. Estado de implementação

### Implementado ✅

1. **`src/index.css`** — paleta OKLCH completa (primary, neutral, ink, amber, surface-warm), tokens semânticos, tipografia (DM Serif Display + Plus Jakarta Sans), sombras, raios, espaçamentos
2. **`index.html`** — Google Fonts preconnect + link, `lang="pt-BR"`, título atualizado
3. **Organismos compartilhados** — `Layout`, `Section`, `PageHero`, `CtaBanner` (dual-mode), `MetricsGrid`, `WhatsAppButton`
4. **Navbar** — logo mark ink, fundo off-white quente
5. **Footer** — fundo ink, logo mark vermelho, colunas tokenizadas
6. **Homepage (`Index.tsx`)** — redesign completo: hero 2-col fluido, ActionsCarousel, HowToHelpGrid assimétrico, seção "Sobre", grid Instagram 2×2
7. **Componentes shadcn instalados** — `button`, `input`, `label`, `textarea`, `accordion`
8. **Formulário de voluntário** — `react-hook-form` + Zod, componente `VoluntarioForm`
9. **Página Doe Agora** — redesign completo: hero photo-variant, impacto cards, PIX card dark, TED card, impact strip, FAQ accordion
10. **Navbar** — link "Parceiros" removido temporariamente (aguarda alinhamento com chefe); arquivos da página preservados

### Pendente 🔲

| Etapa | O que fazer | Prioridade |
|---|---|---|
| **Menu mobile** | Substituir toggle hambúrguer manual da Navbar por `<Sheet />` do shadcn. Melhora acessibilidade de foco. | Média |
| **Acessibilidade** | Verificar contraste `surface-dark-muted`; skip link "Pular para conteúdo". | Média |
| **Redesign páginas internas** | Aplicar mesma linguagem visual do redesign em `QuemSomos` e `Voluntario`. (`DoeAgora` já concluída.) | Futura |
| **Parceiros** | Reativar link "Parceiros" na Navbar após alinhamento com a chefe. Arquivos da página preservados. | Aguardando |
| **Badge** | Criar `badge.tsx` com variantes `default`, `primary`, `success`, `warning`, `destructive`. | Futura |
| **Deploy** | Configurar Vercel/Netlify com CI/CD no push da `main`. | Futura |

---

## 12. Decisões registradas

1. **Fundo de ícone em card → `neutral-100`**, não `primary-50`. Vermelho sobre cinza tem contraste mais forte que vermelho sobre rosa pálido.
2. **Tom dos neutros → `H = 50` (warm gray sutil)**. Cinzas frios comunicam "hospital/tech"; H=50 transmite acolhimento sem parecer "amarelo".
3. **Section label tem variante invertida** para fundos escuros (texto branco/70% opacity em vez de vermelho, que briga com o fundo escuro).
4. **`<Card />` próprio**, não `<Card>` do shadcn. Cobre 100% do uso atual.
5. **Display a partir de `text-3xl` (30px)** — consistência mobile/desktop nos H2.
6. **DM Serif Display em vez de Fraunces** — itálico mais expressivo, entrega via Google Fonts elimina dependência npm. (Fraunces permanece como fallback no `@theme`.)
7. **CtaBanner dual-mode** — `quote` ativa layout editorial; ausência de `quote` mantém layout centered legado. Solução backwards-compatible que não quebrou `Voluntario.tsx`.
8. **Grid assimétrico do HowToHelp** — card "01" usa `grid-row: 1 / 3` para span duplo no desktop. No mobile, renderiza um layout separado `flex flex-col md:hidden` porque `grid-row` não funciona em coluna única.
