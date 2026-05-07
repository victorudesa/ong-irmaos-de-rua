# Button Design System

Este projeto segue um design system moderno para botões, inspirado em Material Design e boas práticas de UX.

## Componentes

### Button
Componente base para botões nativos HTML (`<button>`).

```tsx
import { Button } from '@/components/ui/button'

<Button variant="default" size="lg">
  Doe Agora
</Button>
```

### LinkButton
Componente para Links do React Router (usa `<Link>` internamente).

```tsx
import { LinkButton } from '@/components/ui/link-button'

<LinkButton to="/doe-agora" variant="default" size="lg">
  Doe Agora
</LinkButton>
```

## Variantes

### Filled (preenchido)

- **`default`** — Fundo colorido, texto branco. Ação principal/CTA.
  - Hover: opacidade reduzida, translação para cima (-1px)
  - Usado: hero section, CTAs, ações primárias

### Outline (contorno)

- **`outline`** — Sem fundo, borda + cor do texto (primária por padrão). Ação secundária de contraste.
  - Hover: fundo leve (primary/5)
  - Usado: botões secundários em seções claras (Index, DoeAgora)

- **`outline-light`** — Sem fundo, borda branca, texto branco. Ação secundária em fundos escuros.
  - Hover: bg-white/10
  - Usado: hero section, seções escuras (CtaBanner)

### Outros

- **`inverted`** — Fundo branco, texto colorido. Ação principal em fundos primários.
  - Usado: CtaBanner
  
- **`secondary`** — Fundo cinza, texto escuro.
  - Usado: raramente; considerado para futuras expansões
  
- **`ghost`** — Sem estilos visíveis, apenas hover.
  - Usado: ícone de copiar em DoeAgora
  
- **`link`** — Texto colorido com underline em hover.
  - Usado: links informativos

- **`destructive`** — Fundo vermelho (ainda não usado).

## Tamanhos

| Size | Height | Padding X | Font | Uso |
|------|--------|-----------|------|-----|
| `xs` | 24px | 10px | 12px | badges, etiquetas |
| `sm` | 32px | 12px | 14px | botões pequenos, forms |
| `default` | 36px | 16px | 14px | botões padrão |
| `lg` | 40px | 24px | 16px | CTAs principais, hero |
| `xl` | 44px | 28px | 16px | (reservado para futuro) |
| `icon` | 36px | 0 | — | ícones |
| `icon-sm` | 32px | 0 | — | ícones pequenos |
| `icon-lg` | 40px | 0 | — | ícones grandes |

## Estados

Todos os botões suportam:

- **`disabled`** — reduz opacidade, desativa pointer events
- **`hover`** — efeito visual (translação, opacity, background)
- **`focus-visible`** — outline e ring para acessibilidade

## Como escolher variante + tamanho

| Contexto | Variante | Tamanho | Exemplo |
|----------|----------|---------|---------|
| CTA principal em hero | `default` | `lg` | "Doe Agora" |
| CTA secundário em hero | `outline-light` | `lg` | "Seja Voluntário" |
| Botão primário em seção clara | `default` | `default` | "Nossa história" |
| Botão secundário em seção clara | `outline` | `default` | "Ver ações" |
| CTA no banner (fundo primário) | `inverted` | `lg` | "Fazer doação" |
| CTA secundário no banner | `outline-light` | `lg` | "Via PIX ou TED" |
| Submit em form | `default` | `lg` | "Quero Ser Voluntário" |
| Ícone de copiar | `ghost` | `icon-sm` | Copy/Check icon |

## Token de estilos

### Cores
- Primary: `var(--color-primary)` (vermelho #E53935 ou similar)
- Text: `white`, `var(--color-ink)`, `var(--color-ink-mid)`

### Spacing & Radius
- `rounded-[10px]` — radius padrão (aplicado em button.variants.ts)
- `gap-1.5`, `gap-2`, `gap-2.5` — entre ícone e texto

### Transições
- `duration-150` — padrão para hover
- `hover:-translate-y-px` — efeito de pressão (filled)
- `hover:opacity-90` — fade suave (alternativa)

## Boas práticas

1. **Sempre use Button/LinkButton** — nunca coloque estilos inline em `<button>` ou `<a>`
2. **Uma ação, um botão** — se há múltiplas ações, use variantes diferentes (default + outline)
3. **Respeite a hierarquia**:
   - Ação primária: `default` (filled)
   - Ação secundária: `outline` ou `outline-light` (contorno)
   - Ações terciárias: `ghost` ou `link`
4. **Acessibilidade**:
   - Use `aria-label` em ícones
   - Garanta suficiente contraste de cores
   - Sempre inclua `:disabled` para estados inválidos
5. **Iconografia**:
   - Icons à esquerda (default) ou direita (icon-end)
   - Tamanho: `size-4` para buttons default/sm, `size-5` para lg

## Mudanças futuras

Quando o projeto crescer, considere adicionar:

- Variante `loading` (com spinner)
- Variante `success` (com checkmark animado)
- Estados de erro mais explícitos
- Animações de feedback (ripple, pulse)
- Suporte a tooltips

## Referência no código

- Definições: [src/components/ui/button.variants.ts](src/components/ui/button.variants.ts)
- Componente: [src/components/ui/button.tsx](src/components/ui/button.tsx)
- LinkButton: [src/components/ui/link-button.tsx](src/components/ui/link-button.tsx)
