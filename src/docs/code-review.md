# Code Review — boas práticas de Frontend

> Auditoria do estado atual do código para identificar erros, más práticas e oportunidades de aplicar recursos modernos do React 19 / TypeScript 6 / Vite 8 / Tailwind v4.
>
> O documento está organizado em três níveis: **🔴 Bugs / Erros** (precisam ser corrigidos), **🟡 Más práticas** (degradam manutenção/performance) e **🟢 Modernização** (recursos atuais que melhoram o código). Cada item traz **o que está acontecendo**, **por que é problema** e **como corrigir**, com referência a arquivo e linha.

---

## Sumário executivo

| Categoria | Quantidade | Impacto |
|---|---|---|
| 🔴 Bugs / Erros (lint + runtime) | 6 | médio (lint quebrado, perda de fast-refresh) |
| 🟡 Más práticas | 12 | alto (bundle inflado, duplicação, manutenção) |
| 🟢 Modernização | 8 | médio (DX, performance, acessibilidade) |
| 📦 Bundle/perf | 4 | médio (481 KB JS, 250 KB de fontes não usadas) |

**Itens com ROI mais alto:**
1. Remover `@fontsource-variable/inter` e `@fontsource-variable/fraunces` — economiza ~250 KB de fontes que já foram migradas para Google Fonts.
2. Aplicar `React.lazy` + `Suspense` nas rotas — `481 KB` em um chunk único é muito para uma SPA pequena.
3. Consolidar tokens duplicados (CSS-in-JS inline com OKLCH literal) e mover para o `@theme` — facilita troca de paleta em um lugar só.
4. Mover lógica de hover do `Index.tsx` (manipulação direta de DOM via `e.currentTarget.style`) para CSS — 100% imperativo, viola modelo declarativo do React.

---

## 🔴 Bugs / Erros

### 1. `set-state` dentro de `useEffect` na Navbar

**Onde:** [src/components/Navbar.tsx:22-24](../components/Navbar.tsx#L22-L24)

```tsx
useEffect(() => {
  setMobileOpen(false)
}, [location])
```

**Problema:** O ESLint `react-hooks/set-state-in-effect` falha aqui. O efeito dispara um re-render adicional toda vez que a rota muda, mesmo quando o menu já estava fechado. Em React 19, isso causa cascading renders. Em rotas que não disparam o menu mobile (a maioria), é trabalho à toa.

**Por que é problema:**
- Performance: roda em **toda** mudança de rota (mesmo sem menu aberto).
- Modelo mental: efeitos servem para sincronizar com **sistemas externos**, não com props/state do próprio React.
- Documentação oficial: <https://react.dev/learn/you-might-not-need-an-effect>

**Correção:** Fechar o menu no `onClick` dos links (evento de usuário, não efeito).

```tsx
const handleNavClick = () => setMobileOpen(false)

<Link to={link.to} onClick={handleNavClick}>...</Link>
```

Ou, mais limpo, derivar o estado do `location.pathname`:

```tsx
const location = useLocation()
const [openedAt, setOpenedAt] = useState<string | null>(null)
const isOpen = mobileOpen && openedAt === location.pathname
```

---

### 2. Parâmetro não usado no submit do formulário

**Onde:** [src/components/forms/VoluntarioForm.tsx:44](../components/forms/VoluntarioForm.tsx#L44)

```tsx
const onSubmit = async (_data: VoluntarioFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  setSuccess(true)
}
```

**Problema:** O parâmetro `_data` é declarado mas não consumido — o ESLint reclama mesmo com o prefixo `_` porque a regra `@typescript-eslint/no-unused-vars` no projeto não foi configurada com `argsIgnorePattern: "^_"`. Além disso, simular um POST com `setTimeout` mascara que o formulário **não envia para lugar nenhum**.

**Correção curta (silencia o lint):** ajustar `eslint.config.js`:
```js
'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
```

**Correção real:** wirear um endpoint (Resend, Formspree, Supabase Function, etc.). Para deixar claro que isso ainda é placeholder, melhor já comentar a intenção:

```tsx
const onSubmit = async (data: VoluntarioFormData) => {
  // TODO: integrar com endpoint real (Resend / Supabase Edge Function)
  console.log('voluntario:', data)
  await new Promise(r => setTimeout(r, 800))
  setSuccess(true)
}
```

---

### 3. Componentes com export adicional quebram React Fast Refresh

**Onde:**
- [src/components/ui/button.tsx:67](../components/ui/button.tsx#L67) — exporta `buttonVariants` junto do componente
- [src/components/ui/heading.tsx:47](../components/ui/heading.tsx#L47) — exporta `headingVariants`
- [src/components/ui/section-label.tsx:33](../components/ui/section-label.tsx#L33) — exporta `sectionLabelVariants`
- [src/components/layout/section.tsx:87](../components/layout/section.tsx#L87) — exporta `sectionVariants`

**Problema:** O `eslint-plugin-react-refresh` exige que arquivos de componentes só exportem componentes — caso contrário o HMR (hot module reload) recarrega a página inteira em vez de só atualizar o componente. Em projetos shadcn isso é comum, e é tolerável, mas o fix é simples.

**Correção:** Criar `*.variants.ts` ao lado de cada componente e mover a constante CVA para lá.

```ts
// button.variants.ts
import { cva } from "class-variance-authority"
export const buttonVariants = cva(...)

// button.tsx
import { buttonVariants } from "./button.variants"
```

Também resolve o problema de "circular import" se outro componente quiser usar o `buttonVariants` sem puxar o JSX inteiro.

---

### 4. `key={index}` em listas

**Onde:**
- [src/components/MetricsGrid.tsx:17](../components/MetricsGrid.tsx#L17)
- [src/pages/Index.tsx:502](../pages/Index.tsx#L502) — `Array.from({length: 4})` placeholder
- [src/pages/DoeAgora.tsx:259](../pages/DoeAgora.tsx#L259) — `key={i}` no FAQ
- [src/pages/Voluntario.tsx:288](../pages/Voluntario.tsx#L288) — `key={i}` no FAQ

**Problema:** `key={index}` quebra a reconciliação do React quando a lista é reordenada/filtrada. Para listas estáticas funciona, mas:
1. Os FAQs já têm `q` único — usar `key={faq.q}` é grátis e correto.
2. O placeholder Instagram usa `Array.from({length:4}).map((_, i) => …)` — quando virar lista real de posts, o índice vai virar bug.

**Correção:**
```tsx
{faqs.map(faq => <AccordionItem key={faq.q} ...>)}
{metrics.map(m => <div key={m.label} ...>)}
```

---

### 5. Botão sem `type="button"` em formulário

**Onde:** [src/components/forms/VoluntarioForm.tsx:166](../components/forms/VoluntarioForm.tsx#L166) (chips de disponibilidade) e [src/components/forms/VoluntarioForm.tsx:66](../components/forms/VoluntarioForm.tsx#L66) ("Enviar outro cadastro")

**Status:** o chip já tem `type="button"`, mas o "Enviar outro" não — ele está fora do `<form>`, então não dispara submit, mas é boa prática explicitar sempre.

**Por que importa:** o tipo padrão de `<button>` é `"submit"`. Se um dia o botão entrar dentro do `<form>` (refactor), ele dispara o submit e dá comportamento inesperado.

**Correção:** todos os `<button>` que **não** são submit devem ter `type="button"`.

---

### 6. `target="_blank"` em alguns lugares sem `rel="noopener noreferrer"` consistente

**Status:** revisado — todos os `target="_blank"` do projeto têm `rel="noopener noreferrer"`. ✅ Manter como regra: PRs com `target="_blank"` sem `rel` devem ser bloqueados.

---

## 🟡 Más práticas

### 7. Fontes duplicadas no bundle (~250 KB desperdiçados)

**Onde:** [src/index.css:4-5](../index.css#L4-L5)

```css
@import "@fontsource-variable/inter";
@import "@fontsource-variable/fraunces";
```

**Problema:** O projeto migrou para **DM Serif Display + Plus Jakarta Sans** via Google Fonts (linkado no `index.html`). Mas os pacotes `@fontsource-variable/inter` e `@fontsource-variable/fraunces` continuam importados no `index.css`, e o `package.json` lista ambos como dependência. Resultado: **Inter (8 woff2 = ~218 KB)** e **Fraunces (3 woff2 = ~82 KB)** estão sendo emitidos no `dist/assets/` mesmo nunca sendo usadas.

**Correção:**
```bash
npm uninstall @fontsource-variable/inter @fontsource-variable/fraunces
```

E remover os 2 `@import` do `index.css`. As fontes do Google Fonts já cobrem 100% dos casos.

**Impacto:** -300 KB no `dist/` (não no JS bundle, mas no payload total servido).

---

### 8. Tokens hardcoded em `style={{ … }}` em vez de CSS variables

**Onde:** Praticamente **todos** os arquivos. Exemplos:

- [src/components/Navbar.tsx:31](../components/Navbar.tsx#L31) — `background: 'oklch(0.97 0.012 60 / 0.92)'`
- [src/components/Footer.tsx:23](../components/Footer.tsx#L23) — `color: 'rgba(255,255,255,0.45)'` (literal)
- [src/components/Footer.tsx:99](../components/Footer.tsx#L99) — `borderTop: '1px solid rgba(255,255,255,0.08)'`
- [src/pages/Index.tsx:142](../pages/Index.tsx#L142) — `oklch(0.82 0.016 58)` em gradient repetido em 3 lugares
- [src/pages/DoeAgora.tsx:80](../pages/DoeAgora.tsx#L80) — `borderColor: 'oklch(0.10 0.008 50 / 0.09)'` repetido **15+ vezes** no projeto
- Vários `style={{ background: 'oklch(0.96 0.04 25)' }}` — variante "primary-50" não tokenizada

**Problema:** O design system foi cuidadosamente desenhado em [src/index.css](../index.css) (`--color-ink`, `--color-amber`, etc.), mas grande parte do código bypassa os tokens e escreve OKLCH literal. Isso:
1. Dificulta troca de paleta — para mudar a "borda padrão" preciso fazer find/replace em 15 arquivos.
2. Quebra a promessa do princípio "Tudo passa por tokens" do próprio design-system.md.
3. Polui a leitura do JSX com strings de cor.

**Correção:** Adicionar ao `index.css`:

```css
@theme inline {
  --color-border-subtle: oklch(0.10 0.008 50 / 0.09);
  --color-border-faint:  oklch(0.10 0.008 50 / 0.07);
  --color-overlay-warm:  oklch(0.96 0.04 25);
  --color-white-soft-45: oklch(1 0 0 / 0.45);
  --color-white-soft-35: oklch(1 0 0 / 0.35);
  /* etc */
}
```

E usar no JSX:
```tsx
style={{ borderColor: 'var(--color-border-subtle)' }}
// ou melhor, virar utility:
className="border-border-subtle"
```

Tailwind v4 transforma `--color-*` em utilities (`bg-*`, `border-*`, `text-*`) automaticamente. **Não precisa criar utilities manualmente.**

---

### 9. `style={{ … }}` inline em vez de classes Tailwind

**Onde:** Quase todo `Index.tsx`, `DoeAgora.tsx`, `Voluntario.tsx`.

**Exemplos típicos:**
```tsx
style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', textWrap: 'balance' } as React.CSSProperties}
```

**Problema:**
1. **Cada `style={{}}` cria um novo objeto a cada render** → React vê como prop diferente → re-render do filho. Em listas longas isso pesa.
2. Tailwind v4 já suporta `text-balance` como utility, e arbitrary values cobrem `clamp` (`text-[clamp(48px,6.5vw,96px)]`).
3. CSS-in-JS inline não suporta media queries, hover, focus — força você a usar `onMouseEnter`/`onMouseLeave` (próximo item).

**Correção:** Migrar valores estáticos para classes Tailwind. `style` fica reservado para valores **dinâmicos** (animações, posição calculada em JS).

```tsx
// antes
<h1 style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', textWrap: 'balance' }}>
// depois
<h1 className="text-[clamp(48px,6.5vw,96px)] text-balance">
```

---

### 10. **Manipulação imperativa de DOM no React** (anti-pattern crítico)

**Onde:** [src/pages/Index.tsx:135-136](../pages/Index.tsx#L135-L136) e [src/pages/Index.tsx:199-208](../pages/Index.tsx#L199-L208)

```tsx
onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 40px oklch(0 0 0 / 0.10)')}
onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}

// Pior ainda — query DOM filho e muta:
onMouseEnter={e => {
  e.currentTarget.style.boxShadow = '...'
  const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement
  if (arrow) { arrow.style.background = 'var(--color-primary)'; arrow.style.transform = 'translateX(3px)' }
}}
```

**Problema:** Isso é jQuery dentro do React. Você está:
1. Mutando DOM diretamente (perde sincronização com o virtual DOM).
2. Fazendo `querySelector` filho (acoplamento frágil — qualquer refactor quebra).
3. Reescrevendo `:hover` que o CSS já faz nativamente, melhor e mais rápido.

**Correção:** CSS faz isso de graça com `:hover` e `group-hover:` do Tailwind:

```tsx
<Link className="group hover:shadow-[0_16px_40px_oklch(0_0_0/0.10)]">
  <div className="bg-ink group-hover:bg-primary group-hover:translate-x-[3px] transition" />
</Link>
```

**Por que importa:** Performance (CSS hover é GPU, JS é main thread), acessibilidade (`:focus-visible` funciona automaticamente com CSS), e código declarativo.

---

### 11. SVG inline com path duplicado (logo do coração + WhatsApp)

**Onde:**
- Logo coração: [Navbar.tsx:39-41](../components/Navbar.tsx#L39-L41), [Footer.tsx:15-17](../components/Footer.tsx#L15-L17), [Index.tsx:305](../pages/Index.tsx#L305), [DoeAgora.tsx:236-238](../pages/DoeAgora.tsx#L236-L238) — 4 cópias do mesmo SVG path
- WhatsApp: [WhatsAppButton.tsx:14-16](../components/WhatsAppButton.tsx#L14-L16), [Voluntario.tsx:74](../pages/Voluntario.tsx#L74) — 2 cópias

**Problema:** Path SVG é uma string ilegível (`M12 21.35l-1.45-1.32...`) repetida no JSX. Se quiser trocar o ícone, edita em 4 lugares.

**Correção:** Criar `src/components/icons/HeartIcon.tsx` (e `WhatsAppIcon.tsx`) componentes mínimos:

```tsx
export const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36..." />
  </svg>
)
```

Ou usar `lucide-react` (já no projeto): `<Heart fill="currentColor" />` cobre 90% dos casos.

---

### 12. CSS resetado por `style` quando deveria estar no `@layer base`

**Onde:** [src/components/CtaBanner.tsx:31](../components/CtaBanner.tsx#L31), [Index.tsx:163](../pages/Index.tsx#L163), múltiplos `Link` com `textDecoration: 'none'`.

**Problema:** Toda `<a>` precisa ser resetada à mão com `style={{ textDecoration: 'none' }}` ou `className="no-underline"`. Isso polui todo `Link`.

**Correção:** Adicionar ao `@layer base` no `index.css`:
```css
@layer base {
  a { text-decoration: none; color: inherit; }
}
```

---

### 13. Repetição de "container" em todas as seções

**Onde:** Quase todo `<section>` de `Index.tsx`, `DoeAgora.tsx`, `Voluntario.tsx`:

```tsx
<div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
```

**Problema:** Esse markup aparece **20+ vezes** no projeto. O componente [src/components/layout/section.tsx](../components/layout/section.tsx) já existe para isso, mas só é usado em `SobreNos.tsx`. As páginas redesenhadas (Index/DoeAgora/Voluntario) reescrevem o boilerplate manualmente.

**Correção:** Padronizar uso do `<Section>` (extrair `container` como CSS class no `index.css` se preferir):

```css
@layer components {
  .container-page { @apply container mx-auto px-6 md:px-8 max-w-[1200px]; }
}
```

---

### 14. `textWrap: 'balance'` com cast `as React.CSSProperties` repetido

**Onde:** [Index.tsx:284](../pages/Index.tsx#L284), [Index.tsx:345](../pages/Index.tsx#L345), [DoeAgora.tsx:226](../pages/DoeAgora.tsx#L226), [PageHero.tsx:51](../components/PageHero.tsx#L51).

**Problema:** `textWrap` é CSS válido desde 2023, suportado por TS 6.0 — o cast não é mais necessário.

**Correção:** Atualizar `@types/react` ou simplesmente usar a classe Tailwind `text-balance` (já suportada nativamente no Tailwind v4):

```tsx
<h1 className="text-balance">
```

---

### 15. `Section` legacy + `Section` novo coexistindo

**Onde:**
- `Section` novo (com CVA): [src/components/layout/section.tsx](../components/layout/section.tsx) — usado **apenas** em `SobreNos.tsx`
- Markup manual de section em `Index.tsx`, `DoeAgora.tsx`, `Voluntario.tsx`

**Problema:** Você tem um componente `Section` que **ninguém usa** (exceto SobreNos). Cada página redesenhada reinventa: `<section className="py-[var(--section-y)] ..."> <div className="container ...">`.

**Decisão a tomar:**
- Caminho A: padronizar tudo no `<Section>` novo, deletar boilerplate.
- Caminho B: aceitar que o redesign não cabe no `<Section>` original (porque usa fontSize com `clamp`, fundos com OKLCH literal etc.) e expandir o componente para suportar esses casos.

Recomendado: **Caminho B**. Adicionar ao `<Section>`:
- prop `bg` aceita string custom (não só os 4 tokens)
- prop `headingSize` aceita `'fluid'` para usar `clamp`

---

### 16. `<style>{`@keyframes spin`}</style>` injetado no botão de submit

**Onde:** [src/components/forms/VoluntarioForm.tsx:275](../components/forms/VoluntarioForm.tsx#L275)

```tsx
<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
```

**Problema:** Injetar `<style>` dentro de um botão é hack. O Tailwind já fornece `animate-spin` como utility — também presente no `tw-animate-css` que está no projeto.

**Correção:**
```tsx
<svg className="animate-spin" />
```

E remover o `<style>` inline.

---

### 17. `_data: VoluntarioFormData` cobre o lint mas não envia nada

**Onde:** [VoluntarioForm.tsx:44-47](../components/forms/VoluntarioForm.tsx#L44-L47)

Já comentado no item 2. **O formulário não envia nada para lugar nenhum.** Isso é uma má prática de produto, não só de código — o usuário acredita que se cadastrou e a equipe não recebe nada.

---

### 18. Footer com `rgba()` em vez de OKLCH

**Onde:** [src/components/Footer.tsx:23,29,42,57…](../components/Footer.tsx) (15+ ocorrências)

```tsx
style={{ color: 'rgba(255,255,255,0.45)' }}
```

**Problema:** Mistura de espaços de cor. O resto do projeto está em OKLCH; o Footer usa `rgba()`. Não é bug, mas:
1. **Quebra consistência** — qualquer copy-paste de outra parte do projeto vai entregar OKLCH; o Footer não casa.
2. `rgba()` com branco é menos legível em fundo escuro do que OKLCH com chroma alto. Diferença mínima visualmente, mas existe.

**Correção:** Trocar por `oklch(1 0 0 / 0.45)` ou criar tokens `--color-on-dark-*`.

---

## 🟢 Modernização — recursos atuais sub-utilizados

### 19. Code splitting / `React.lazy` nas rotas

**Onde:** [src/App.tsx](../App.tsx) — todas as rotas importadas estaticamente.

**Estado atual:** bundle único de **481 KB** (gzip 145 KB). Para uma SPA com 5 páginas, todo visitante baixa todas as páginas imediatamente.

**Correção:**
```tsx
import { lazy, Suspense } from 'react'
const Index = lazy(() => import('@/pages/Index'))
const DoeAgora = lazy(() => import('@/pages/DoeAgora'))
// ...

<Suspense fallback={<div>Carregando...</div>}>
  <Routes>
    <Route path="/" element={<Index />} />
  </Routes>
</Suspense>
```

**Por que vale:** Time to Interactive cai significativamente em mobile 3G. A homepage carrega só seu chunk; rotas internas baixam sob demanda.

---

### 20. React Router v7 — usar `createBrowserRouter` em vez de `BrowserRouter` JSX

**Onde:** [src/App.tsx](../App.tsx)

**Estado atual:** API antiga com `<BrowserRouter><Routes><Route /></Routes></BrowserRouter>`.

**Por que mudar:** O React Router v7 (que está no projeto) tem `createBrowserRouter` com **data routers** — habilita `loader`, `action`, `errorElement`, `lazy()` por rota. É a API recomendada pelo time do React Router desde 2023.

```tsx
const router = createBrowserRouter([
  { path: '/', lazy: () => import('@/pages/Index') },
  { path: '/sobre', lazy: () => import('@/pages/SobreNos') },
  { path: '*', Component: NotFound },
])

<RouterProvider router={router} />
```

Bonus: `lazy:` substitui a necessidade de `React.lazy` + `Suspense` manual.

---

### 21. View Transitions API (CSS nativo)

**Onde:** Transições de rota / abertura de menu.

**Estado atual:** transições com `transition-all duration-200`.

**Por que mudar:** Em 2025 navegadores Chromium e Safari suportam `@view-transition` nativamente. O `react-router-dom` v7 tem `viewTransition` por rota. Ganho: cross-fade automático entre páginas, sem libs.

```tsx
<Link to="/sobre" viewTransition>Sobre</Link>
```

Mais info: <https://reactrouter.com/start/framework/navigating#view-transitions>

---

### 22. `<form action={…}>` do React 19 e `useActionState`

**Onde:** [src/components/forms/VoluntarioForm.tsx](../components/forms/VoluntarioForm.tsx)

**Estado atual:** `react-hook-form` + `useState(success)`. Funciona, mas o React 19 tem suporte nativo a actions assíncronas em forms:

```tsx
import { useActionState } from 'react'

function VoluntarioForm() {
  const [state, formAction, pending] = useActionState(submitVoluntario, null)

  return (
    <form action={formAction}>
      <input name="nome" />
      <button disabled={pending}>{pending ? 'Enviando...' : 'Enviar'}</button>
    </form>
  )
}
```

**Por que pensar nisso:** Para formulários simples, `useActionState` substitui `react-hook-form` + `useState(isSubmitting)` + `useState(success)` com 3x menos código. **Mas:** o formulário atual usa validação Zod com mensagens campo-a-campo, e `useActionState` não cobre isso elegantemente. **Recomendação:** **manter `react-hook-form`** (foi a escolha certa para esse caso), mas saber que existe a alternativa para formulários mais simples.

---

### 23. `useDeferredValue` / `useTransition` para o ActionsCarousel

**Onde:** [src/pages/Index.tsx:76-103](../pages/Index.tsx#L76-L103)

**Estado atual:** Cada scroll dispara `updateBtns` que faz `setState` síncrono.

**Por que mudar:** Em scroll rápido, isso pode bloquear o frame. `startTransition` marca o update como interruptible:

```tsx
const updateBtns = () => {
  const el = carouselRef.current
  if (!el) return
  startTransition(() => {
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  })
}
```

**Custo/benefício:** Carrossel pequeno, 5 cards — provavelmente nem nota a diferença. Mas é a forma idiomática React 19 para state derivado de scroll.

---

### 24. CSS `@container` queries em vez de breakpoints fixos

**Onde:** Cards do `HowToHelpCard`, `FeatureCard` — atualmente mudam de tamanho com breakpoint da **viewport**, não do **container**.

**Por que mudar:** `@container` é suportado em todos os browsers desde 2023. Permite que um card mude layout baseado no espaço **dele** — útil quando o mesmo card aparece em coluna única (mobile) e em grid (desktop) com largura variável.

```css
.card { container-type: inline-size; }
.card h3 { font-size: 1.25rem; }
@container (min-width: 400px) {
  .card h3 { font-size: 1.5rem; }
}
```

**Custo/benefício:** Marginal aqui, valeria mais em design systems. Anotado para conhecimento.

---

### 25. `@theme inline` está bem usado, mas falta `--breakpoint-*`

**Onde:** [src/index.css](../index.css) — só define cores e espaçamentos.

**Por que adicionar:** Tailwind v4 permite definir breakpoints como CSS vars. Hoje você usa `md:` (768px padrão Tailwind) — se quiser customizar:

```css
@theme inline {
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

Não é urgente, mas torna o tema 100% controlável via CSS.

---

### 26. Imagens sem `loading="lazy"` e sem `srcSet`

**Onde:** [src/pages/Index.tsx:265](../pages/Index.tsx#L265) — `heroBg` é a única imagem real do projeto

```tsx
<img src={heroBg} alt="..." className="absolute inset-0 w-full h-full object-cover" />
```

**Problemas:**
1. Sem `srcSet` / `<picture>` — usuário mobile baixa a imagem desktop full-resolution (236 KB).
2. Sem `loading="eager"` explícito (essa é hero — quer eager). Outras imagens (quando vierem) deveriam ter `loading="lazy"`.
3. Sem `width` / `height` — causa layout shift.

**Correção:** Migrar para `<picture>` com WebP/AVIF + `srcSet`:

```tsx
<picture>
  <source srcSet="/hero-mobile.avif" media="(max-width:768px)" type="image/avif" />
  <source srcSet="/hero-desktop.avif" type="image/avif" />
  <img src="/hero-desktop.jpg" alt="..." width={1920} height={1080} loading="eager" fetchPriority="high" />
</picture>
```

Vite v8 + plugin `vite-imagetools` automatiza isso (`?w=400;800;1200&format=avif;webp`).

---

## 📦 Bundle / performance

### 27. Bundle único de 481 KB

Já coberto no item 19. Resumo:
- `react-dom`: ~140 KB
- `react-hook-form` + `zod`: ~50 KB (carregado em **toda** rota, mas só usado em `/voluntario`)
- `lucide-react`: ~30 KB (tree-shaking funciona — só ícones usados)
- `radix-ui` (accordion): ~25 KB

**Ação:** code-splitting por rota carrega `react-hook-form` + `zod` só em `/voluntario`.

### 28. Sonner carregado mas não usado

**Onde:** [src/main.tsx:3,10](../main.tsx#L3) — `<Toaster />` montado globalmente

**Estado:** O `DoeAgora` foi reescrito sem sonner (toast de PIX virou JSX inline). Nenhum lugar do projeto chama `toast(...)`. Mas o `<Toaster />` continua no `main.tsx` e o pacote `sonner` ainda é importado.

**Correção:** Remover `<Toaster />` e `import { Toaster } from '@/components/ui/sonner'`. Se quiser manter o componente para uso futuro, tudo bem — mas tirar do `main.tsx` para não inflar o bundle global.

```bash
# se decidir remover de vez:
npm uninstall sonner next-themes  # next-themes só serve para o Toaster
rm src/components/ui/sonner.tsx
```

`next-themes` é dependência **só** do `<Toaster />`. Se sonner sai, ele sai junto.

### 29. CSS bundle 48 KB — Tailwind v4 está OK

`dist/assets/index-…css` está em 48 KB / 9.4 KB gzip. Razoável para um app com OKLCH custom + tw-animate-css. Não é prioridade.

### 30. Imagens placeholder usando CSS gradients

Várias seções usam `repeating-linear-gradient` para "placeholder de foto". Bom para preview, mas:
- **Não estão lazy** (são CSS, sempre renderizam).
- Confunde teste E2E (não dá para snapshot a "foto real").

**Ação:** Criar componente `<PhotoPlaceholder>` reaproveitável e marcar com `data-testid="photo-placeholder"` para facilitar substituição quando vierem fotos reais.

---

## Acessibilidade — checklist rápido

| Item | Status |
|---|---|
| `lang="pt-BR"` no `<html>` | ✅ |
| `alt` em imagens | ✅ (hero) |
| `aria-label` em botões só com ícone | ✅ |
| `target="_blank"` + `rel="noopener noreferrer"` | ✅ |
| Skip link "Pular para conteúdo" | ❌ falta |
| Foco visível em todos os interativos | ⚠️ verificar — `focus-visible:ring-3` só nos shadcn buttons; `<a>` custom (Index/DoeAgora) não tem ring |
| Ordem de foco no menu mobile | ⚠️ usar `<Sheet />` do shadcn resolve |
| Contraste `rgba(255,255,255,0.25)` no copyright do Footer | ❌ contraste insuficiente WCAG AA — está em 1.7:1 sobre `--color-ink` |
| Heading hierarchy (h1→h2→h3) | ✅ |
| Form labels associados | ✅ (shadcn `<Label htmlFor>`) |

**Ações prioritárias:**
1. Aumentar opacidade do copyright para `0.45` no mínimo (item 11 da lista de cores Footer).
2. Adicionar skip link no `<Layout>`:
   ```tsx
   <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
     Pular para conteúdo
   </a>
   <main id="main">...</main>
   ```
3. Adicionar `focus-visible` ring nos `<a>` e `<button>` custom (Index, DoeAgora).

---

## TypeScript — pontos a melhorar

### 31. `as React.CSSProperties` cast espalhado

Já mencionado (item 14). Atualizar `@types/react` para a última versão para o suporte a `text-wrap`/`textWrap`.

### 32. `as HTMLElement` em `querySelector`

**Onde:** [Index.tsx:99,201,206](../pages/Index.tsx#L99)

```tsx
const card = el.querySelector('[data-card]') as HTMLElement
```

**Problema:** Cast cego — se `data-card` sumir do HTML, o cast não pega o erro, vira `null` em runtime.

**Correção:** Idealmente, **eliminar a query DOM** (vide item 10). Se for inevitável:

```tsx
const card = el.querySelector<HTMLElement>('[data-card]')
if (!card) return
```

`querySelector<HTMLElement>(...)` retorna `HTMLElement | null` corretamente, sem cast.

### 33. `arr.map((_, i) => …)` com placeholder de Instagram

**Onde:** [Index.tsx:500](../pages/Index.tsx#L500)

```tsx
{Array.from({ length: 4 }).map((_, i) => (...))}
```

OK como placeholder. Quando virar dados reais, mudar para `instagramPosts.map(post => …)`.

---

## Plano de ação sugerido (ordem de prioridade)

### Fase 1 — Quick wins (1h)
1. ✅ Remover `@fontsource-variable/inter` e `@fontsource-variable/fraunces` (item 7)
2. ✅ Remover `<Toaster />` e `sonner`/`next-themes` se não forem usados (item 28)
3. ✅ Trocar `key={index}` por `key={item.id|item.q|item.label}` (item 4)
4. ✅ Corrigir o set-state no useEffect da Navbar (item 1)
5. ✅ Configurar `argsIgnorePattern: '^_'` no eslint (item 2)
6. ✅ Trocar `<style>{spin}</style>` por `animate-spin` (item 16)

### Fase 2 — Refactor estrutural (3-4h)
7. Mover `*Variants` para arquivos `.variants.ts` (item 3)
8. Tokenizar bordas/overlays repetidos (item 8)
9. Migrar `style={{}}` estáticos para classes Tailwind (item 9)
10. **Remover toda manipulação imperativa de DOM** — converter para CSS hover/group-hover (item 10)
11. Criar `<HeartIcon />` e `<WhatsAppIcon />` (item 11)
12. Padronizar uso do `<Section>` em vez de boilerplate manual (item 13, 15)

### Fase 3 — Modernização (2-3h)
13. Code-splitting com `React.lazy` ou `createBrowserRouter` + `lazy:` (itens 19, 20)
14. Skip link de acessibilidade
15. Aumentar contraste do Footer
16. Imagem hero com `<picture>` + AVIF/WebP (item 26)

### Fase 4 — Wirear o formulário (depende do backend)
17. Conectar `VoluntarioForm` a um endpoint real (item 17). Sugestões: Resend (transactional email), Formspree (sem servidor), ou Supabase Edge Function.

---

## Resumo: justificativas para a chefe / time

Se precisar **defender as escolhas**, esses são os princípios que orientam a revisão:

1. **"Single source of truth" para tokens** — design system funciona se ninguém bypassa. Cada `oklch(...)` literal no JSX é um pequeno furo no contrato.
2. **Declarativo > imperativo no React** — `onMouseEnter` mutando DOM é jQuery dentro do React. CSS hover/group-hover é a forma certa, mais rápida, e acessível por padrão.
3. **Bundle splitting é grátis** — `React.lazy` por rota custa 5 minutos e melhora TTI mensurável em mobile 3G.
4. **Acessibilidade não é opcional** — skip link, contraste WCAG AA, focus-visible são baseline; ONG social atinge público diverso, incluindo idosos e leitores de tela.
5. **Progressive enhancement** — usar APIs nativas (`<picture>`, `text-wrap: balance`, `@view-transition`) antes de libs JS.
6. **Lint/TS strict como rede de segurança** — os 6 erros de lint atuais são pequenos, mas indicam que o pipeline não está sendo respeitado. Resolver e travar o CI para não passar PR com erros.
