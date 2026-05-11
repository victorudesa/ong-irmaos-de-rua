# Galeria — Planejamento

Seção de mídia na homepage + página dedicada com fotos e vídeos.

---

## Decisões

- **Masonry via CSS columns** — sem lib, zero bundle, suporte universal
- **Vídeos no YouTube** — gratuito, ilimitado, CDN global; usar `unlisted` se não quiser exposição no canal
- **Vídeo no grid** — thumbnail + ícone de play, clique abre YouTube em nova aba (sem embed, sem cookies)
- **Thumbnail de vídeo** — gerada automaticamente pelo YouTube: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
- **Sem card/borda/sombra** — só a mídia com `gap` uniforme entre itens

---

## Estrutura de dados

```ts
type MediaItem =
  | { type: 'photo'; src: string; alt: string }
  | { type: 'video'; thumb: string; alt: string; url: string }
```

---

## Estrutura de arquivos

```
src/assets/images/sections/galeria/
  foto-01.jpg
  foto-02.jpg
  foto-03.jpg
  foto-04.jpg
  foto-05.jpg
  foto-06.jpg
  thumb-video-01.jpg   ← ou usar URL do YouTube diretamente
```

---

## Etapas

### 1 — Conteúdo (você)
- Separar 6 fotos para o teaser da homepage
- Subir vídeos no YouTube (pode ser `unlisted`)
- Copiar as URLs dos vídeos

### 2 — Seção na homepage
- Adicionar seção "Galeria" em `src/pages/Index.tsx` substituindo a seção Instagram
- Grid masonry CSS columns (2 colunas mobile, 3 desktop)
- 6 itens (mix de fotos e vídeos)
- Botão "Ver toda a galeria →" linkando pra `/galeria`

### 3 — Página `/galeria`
- Criar `src/pages/Galeria.tsx` (lazy-loaded, mesmo padrão das outras páginas)
- Grid maior com todas as mídias
- Registrar rota em `src/App.tsx`

### 4 — Navegação (opcional)
- Adicionar link "Galeria" na Navbar se fizer sentido

---

## Notas futuras

- Adicionar nova mídia = adicionar arquivo na pasta + entrada no array, sem mexer no componente
- Lightbox (abrir foto em fullscreen no próprio site) pode ser adicionado depois com `yet-another-react-lightbox` — pequena, moderna, sem overhead
