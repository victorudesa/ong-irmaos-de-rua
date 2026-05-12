# Assets Guide — Irmãos de Rua

Referência prática de tamanhos, formatos e boas práticas para assets do projeto.
Baseado em MDN, web.dev e padrões de mercado.

---

## 1. Imagens — Regras Gerais

### Formato
- **WebP** sempre que possível — melhor compressão, qualidade igual ou superior ao JPEG
- **PNG** com transparência quando necessário (logos, ícones)
- Nunca use JPEG para logos (não suporta transparência e comprime com artefatos)

### Tamanho de arquivo alvo
- Hero / banners: **< 300 KB**
- Cards e fotos de seção: **< 150 KB**
- Ícones e fotos de perfil: **< 50 KB**

### Ferramenta de compressão recomendada
[Squoosh](https://squoosh.app/) — gratuito, no browser, do Google
- Converta para WebP
- Qualidade entre **80–85%**
- Redimensione para o tamanho alvo antes de comprimir

### Gradientes
**Nunca exporte imagens com gradiente embutido.** O código já aplica gradientes via CSS
(`linear-gradient`), o que permite ajuste de cor e intensidade sem re-exportar a foto.

---

## 2. Hero Banner (Homepage)

```
Tamanho:   1920 × 1080 px
Ratio:     16:9
Formato:   WebP (< 300 KB)
Arquivo:   src/assets/hero-bg.jpg (já existente — troque pelo WebP quando tiver)
```

**Por que 16:9?**
Alinha com padrão de monitores modernos. O CSS usa `object-cover` + `100svh`,
então a imagem preenche a tela em qualquer resolução sem distorcer.

**Boas práticas no `<img>` do hero:**
```html
<img
  src={heroBg}
  alt="Voluntários ajudando pessoas em situação de rua"
  fetchpriority="high"   {/* LCP — carrega com prioridade máxima */}
/>
```
> Nunca use `loading="lazy"` no hero — ele é sempre visível no carregamento.

---

## 3. PageHero com foto (ex: página Voluntário)

```
Tamanho:   1920 × 600 px
Ratio:     16:5 (banner cinematográfico)
Formato:   WebP (< 200 KB)
```

**Por que mais baixo que o hero principal?**
O `PageHero` com `photoVariant` usa `minHeight: clamp(360px, 52vh, 600px)` —
não ocupa a tela toda, então uma imagem mais larga e baixa é suficiente.

---

## 4. Homepage — Todos os slots de imagem

| Slot | Frame (Figma) | Ratio | Qtd | Arquivo sugerido |
|------|--------------|-------|-----|-----------------|
| Hero principal | `1920 × 1080` | 16:9 | 1 | `hero-bg.webp` |
| Foto "Quem Somos" | `800 × 600` | 4:3 | 1 | `quem-somos.webp` |
| Cards carousel (cada) | `720 × 400` | 16:9 | 5 | `acao-marmita.webp` etc. |
| Galeria masonry | largura `1200` | variado | 6 | `masonry-01.webp` etc. |

**Total homepage: 13 fotos**

### Nomes sugeridos para os cards do carousel
```
src/assets/acoes/
  acao-marmitas.webp
  acao-cafe.webp
  acao-acolhimento.webp
  acao-roupas.webp
  acao-semanais.webp
```

### Galeria masonry

Use todas com largura próxima de **1200 px** e varie a altura para criar o efeito masonry:

```
src/assets/images/sections/masonry/
  masonry-01.jpg   1200 x 1600
  masonry-02.jpg   1200 x 900
  masonry-03.jpg   1201 x 1200
  masonry-04.jpg   1201 x 1500
  masonry-05.jpg   1201 x 800
  masonry-06.jpg   1201 x 1350
```

As imagens e legendas são cadastradas em `src/lib/gallery.ts`.
O componente `src/components/GalleryMasonry.tsx` monta o masonry e abre o lightbox ao clicar.

---

## 5. Logo — Versões e Uso

### Versões disponíveis
```
src/assets/logo/
  horizontal-navbar.png     → Navbar
  padrao.png                → Footer (vertical com texto)
  quadrado.png              → Uso futuro (redes sociais, ícone)
```

### Onde cada versão é usada
| Versão | Componente | Tamanho renderizado |
|--------|------------|-------------------|
| Horizontal | `Navbar.tsx` | `h-10` (40px altura) |
| Padrão (vertical) | `Footer.tsx` | `h-24` (96px altura) |
| Quadrado (ícone) | — | Futuro |

### ⚠️ Problema atual: fundo branco
Os logos atuais têm **fundo branco**, o que causa problema no footer escuro.

**Solução no Figma:**
1. Selecione o frame do logo
2. Remova o fill de fundo do frame (deixe transparente)
3. Exporte como **PNG** — o fundo ficará transparente automaticamente

Após corrigir, substitua os arquivos em `src/assets/logo/` — o código já está correto.

---

## 6. Favicon

### Arquivos gerados (via realfavicongenerator.net)
```
public/favicon/
  favicon.ico              → Fallback universal (contém 16×16 e 32×32 internamente)
  favicon.svg              → Browsers modernos (preferência)
  favicon-96x96.png        → PNG fallback
  apple-touch-icon.png     → iOS (180×180) — tela de início do iPhone
  web-app-manifest-192x192.png
  web-app-manifest-512x512.png
  site.webmanifest
```

### Por que em `public/favicon/` e não em `src/assets/`?
- `public/` é servido diretamente na raiz da URL pelo Vite (`/favicon/favicon.ico`)
- `src/assets/` é processado pelo bundler — o nome do arquivo muda e o browser não consegue encontrar o favicon automaticamente

### Links no `index.html` (Vite — sem `%PUBLIC_URL%`)
```html
<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
<link rel="shortcut icon" href="/favicon/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Irmãos de Rua" />
<link rel="manifest" href="/favicon/site.webmanifest" />
```

> `%PUBLIC_URL%` é variável do Create React App — **não funciona no Vite**.
> No Vite, use caminhos absolutos com `/`.

### Como o browser escolhe qual usar
```
Chrome/Firefox/Edge  → prefere SVG → cai no PNG → cai no .ico
Safari iOS           → ignora rel="icon" → usa apple-touch-icon
Browsers antigos     → só lê .ico
```
Cada dispositivo baixa **apenas o arquivo que vai usar** — não há desperdício.

---

## 7. Boas Práticas Gerais (MDN + web.dev)

### Performance (Core Web Vitals)
- Defina sempre `width` e `height` na tag `<img>` — evita **CLS** (Layout Shift)
- Use `fetchpriority="high"` no hero (maior imagem visível = LCP)
- Use `loading="lazy"` em imagens **abaixo da dobra** (cards, grid, fotos de seção)
- Use `<picture>` para servir imagens diferentes por breakpoint

### Acessibilidade
- `alt` sempre descritivo: `alt="Voluntários distribuindo marmitas nas ruas do ABC"`
- Imagem puramente decorativa: `alt=""` (string vazia — screen reader ignora)
- Nunca "queime" texto dentro da imagem — use CSS overlay

### Exemplo de `<picture>` responsivo
```html
<picture>
  <source media="(max-width: 768px)" srcset="hero-mobile.webp" type="image/webp" />
  <source media="(min-width: 769px)" srcset="hero-desktop.webp" type="image/webp" />
  <img src="hero-desktop.jpg" alt="Descrição" width="1920" height="1080" />
</picture>
```

### CSS — `aspect-ratio` para evitar layout shift
```css
.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

---

## 8. Fluxo de exportação (Figma → Projeto)

```
1. No Figma
   └── Crie frame com as dimensões da tabela acima
   └── Remova fill de fundo do frame (transparência para logos)
   └── Exporte como PNG @1x

2. No Squoosh (squoosh.app)
   └── Converta para WebP
   └── Qualidade: 80–85%
   └── Redimensione se necessário

3. No projeto
   └── src/assets/  → imagens usadas em componentes React
   └── public/      → arquivos servidos diretamente (favicon, webmanifest)
```

---

## Referências
- [MDN — aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [MDN — Responsive Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
- [web.dev — Cumulative Layout Shift](https://web.dev/articles/cls)
- [web.dev — Largest Contentful Paint](https://web.dev/articles/lcp)
- [realfavicongenerator.net](https://realfavicongenerator.net)
- [Squoosh](https://squoosh.app)
