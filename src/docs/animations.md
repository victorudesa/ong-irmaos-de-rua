# Animações — Planejamento

Guia de como incorporar animações no projeto, quais bibliotecas usar e onde aplicar cada uma. Espelha a filosofia do design system: presets centralizados, nada inline.

---

## 1. Stack recomendada

Três camadas, da mais leve para a mais robusta:

| Camada | Lib | Quando usar |
|---|---|---|
| **CSS / Tailwind** | nativo | Hovers, transitions simples, micro-interações |
| **tw-animate-css** | já instalado | Entradas one-shot (fade-in, slide-in) |
| **Motion** (`motion/react`) | a instalar | Scroll reveals, stagger, layout, gestures, page transitions |
| **Lottie** (`lottie-react`) | opcional | Ilustrações complexas exportadas do After Effects |

Regra geral: **resolva com a camada mais leve possível**. Só sobe de camada quando a anterior não dá conta.

---

## 2. Motion (antigo Framer Motion)

### Por que

- Maturidade e ecossistema React 19 + TS
- API declarativa alinhada ao estilo do projeto
- Tree-shaking real via `LazyMotion` (~5kb inicial vs ~18kb full)
- Respeita `prefers-reduced-motion` por default em hovers/taps

### Instalação

```bash
npm i motion
```

Import: `import { motion, AnimatePresence } from 'motion/react'`

### Bundle: usar LazyMotion

No root do app (App.tsx), envolver com `LazyMotion + domAnimation` e usar `m.div` em vez de `motion.div`:

```tsx
import { LazyMotion, domAnimation, m } from 'motion/react'

<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```

### Presets centralizados

Criar `src/lib/motion.ts` com variants reutilizáveis. **Nunca** inline em JSX (mesmo princípio dos botões com CVA).

```ts
// src/lib/motion.ts
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, margin: '-80px' },
}

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.4 },
}

export const hoverLift = {
  whileHover: { y: -2 },
  transition: { duration: 0.15 },
}
```

### Wrappers reutilizáveis

```
src/components/motion/
  FadeUp.tsx      ← <FadeUp>{children}</FadeUp>
  Stagger.tsx     ← container que cascateia filhos
  CountUp.tsx     ← número animado ao entrar no viewport
```

---

## 3. Tokens de animação

Padronize duração e easing como tokens — igual cor e spacing.

| Token | Valor | Uso |
|---|---|---|
| `duration-hover` | 150ms | Hovers, taps |
| `duration-quick` | 200ms | Entradas curtas, toggles |
| `duration-base` | 300ms | Reveals padrão |
| `duration-slow` | 500ms | Reveals enfatizados |
| `ease-out-soft` | `[0.22, 1, 0.36, 1]` | Default para reveals |
| `ease-out` | `easeOut` | Fallback |
| `stagger-tight` | 40ms | Listas densas |
| `stagger-base` | 60-80ms | Cards, grids |

Adicionar como exports em `src/lib/motion.ts` para reuso.

---

## 4. Onde aplicar (priorizado)

### Alta prioridade

1. **MetricsGrid** — count-up animado quando entra no viewport. Alto impacto, baixo custo.
2. **HowToHelpCard** (homepage) — stagger fade-up ao scroll, 60ms entre cards.
3. **Hero (Index)** — fade-in com slight rise no h1/subtitle/CTAs ao montar (stagger 80ms).
4. **Cards de "O Que Fazemos"** — fade-up + stagger ao scroll.

### Média prioridade

5. **Ícones Lucide** — escala 1.05 + leve translação no hover do card pai (CSS basta).
6. **Page transitions** — `AnimatePresence` envolvendo o `<Outlet />` no Layout, fade entre rotas.
7. **VoluntarioForm sucesso** — animação de confirmação ao enviar (Lottie ou Motion).

### Baixa prioridade

8. **Accordion (/faq)** — Radix já anima, manter.
9. **Carrossel de ações** — layout animations no scroll horizontal.
10. **Navbar** — sombra/blur ao rolar (já é CSS).

---

## 5. Lottie

### Quando faz sentido

Reservado para 1-2 momentos cinematográficos. **Não** usar como substituto de hovers ou ícones em grids.

Bons usos:
- Confirmação pós-formulário (ex: doação enviada com check animado)
- Ilustração no hero ou página /sobre
- Empty states ilustrados
- Loading spinner customizado da marca

Maus usos:
- Substituir Lucide em listas
- Hovers de botão
- Qualquer coisa que CSS resolva

### Instalação

```bash
npm i lottie-react
# ou, para .lottie comprimido (~70% menor):
npm i @lottiefiles/dotlottie-react
```

### Estrutura

```
src/
  assets/
    lottie/
      success.json
      heart-beat.json
  components/
    motion/
      LottieIcon.tsx   ← wrapper com lazy load
```

### Considerações

1. **Origem** — designer com AE+Bodymovin, ou [LottieFiles](https://lottiefiles.com) (cuidado com licença)
2. **Performance** — máximo 2-3 ativos simultâneos por view
3. **Cor** — JSON tem cores embutidas; mudar tema = re-exportar. Para ícones que herdam cor do tema, **use SVG + Motion**, não Lottie
4. **Lazy load** — sempre carregar via `lazy()` + `Suspense`, são 30-60kb por animação
5. **Acessibilidade** — `aria-hidden="true"` + checar `prefers-reduced-motion` antes de tocar

---

## 6. Acessibilidade

Não negociável.

```tsx
import { useReducedMotion } from 'motion/react'

const reduce = useReducedMotion()
// Se reduce === true: desabilitar transforms, manter opacity ou não animar
```

Regras:
- `prefers-reduced-motion: reduce` → sem transform/scale/rotate; opacity opcional
- Nunca atrasar conteúdo essencial (texto que demora a aparecer prejudica leitura)
- Duração ≤ 500ms em reveals; ≤ 200ms em hovers
- Nada de auto-play infinito ou parallax pesado
- Lottie: pausar via prop quando `reduce === true`

---

## 7. Princípios para "sutil"

1. **Distância pequena** — 12-20px de translação. Nunca 50px+
2. **Easing suave** — `[0.22, 1, 0.36, 1]` ou `easeOut`. Evitar bounce/spring exagerado
3. **Duração curta** — 300-500ms reveals, 150-200ms hovers
4. **Stagger leve** — 40-80ms entre itens
5. **Once-only** — `viewport={{ once: true }}` em todo scroll reveal
6. **Sem competição** — uma animação principal por viewport. Não animar tudo ao mesmo tempo

---

## 8. Anti-padrões

- ❌ Variants/transitions inline em JSX (sempre via preset em `lib/motion.ts`)
- ❌ Animar mais de 3-4 elementos simultaneamente sem stagger
- ❌ Reanimar ao re-entrar no viewport (sempre `once: true`)
- ❌ Usar Lottie para substituir CSS hover
- ❌ Importar `motion` direto sem `LazyMotion` em componentes profundos
- ❌ Animar `width`/`height`/`top`/`left` (use `transform` e `opacity`)
- ❌ Duração > 600ms em reveals padrão
- ❌ Page transition que atrapalha navegação (max 200-300ms)

---

## 9. Roadmap de implementação

### Fase 1 — Fundação
1. `npm i motion`
2. Criar `src/lib/motion.ts` com presets base (`fadeUp`, `stagger`, `fadeIn`, tokens)
3. Criar `src/components/motion/FadeUp.tsx` e `Stagger.tsx`
4. Envolver App em `<LazyMotion features={domAnimation}>`

### Fase 2 — Aplicação principal
5. MetricsGrid com count-up
6. HowToHelpCard com stagger
7. Hero com entrada cascata
8. Cards "O Que Fazemos" com fade-up

### Fase 3 — Refinamentos
9. Page transitions com `AnimatePresence` no Layout
10. Hover micro-interações nos ícones
11. Avaliar 1-2 oportunidades de Lottie (sucesso de form, hero)

### Fase 4 — Polimento
12. `prefers-reduced-motion` audit em todos os pontos
13. Atualizar [design-system.md](./design-system.md) referenciando este doc
14. Lighthouse / performance audit (CLS, INP)

---

## 10. Referências cruzadas

- [design-system.md](./design-system.md) — tokens visuais, botões, tipografia
- [src/lib/motion.ts](../lib/motion.ts) — presets (a criar)
- [src/components/motion/](../components/motion/) — wrappers reutilizáveis (a criar)
