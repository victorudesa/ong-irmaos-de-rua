# Galeria

Seção de mídia na homepage + página dedicada em `/galeria`.

---

## Estado atual

- Homepage usa um teaser com 6 imagens em masonry.
- Página `/galeria` usa o mesmo masonry com todas as mídias cadastradas.
- Clique em qualquer imagem abre fullscreen com `yet-another-react-lightbox`.
- Captions simples aparecem centralizadas no lightbox.
- Por enquanto a galeria tem apenas fotos; vídeos do YouTube entram depois.

---

## Arquivos principais

```
src/components/GalleryMasonry.tsx       Componente masonry + lightbox
src/lib/gallery.ts                      Dados das imagens e captions
src/pages/Galeria.tsx                   Página /galeria
src/pages/Index.tsx                     Seção "Galeria" na homepage
src/App.tsx                            Registro da rota /galeria
```

---

## Estrutura de arquivos

```
src/assets/images/sections/masonry/
  masonry-01.jpg
  masonry-02.jpg
  masonry-03.jpg
  masonry-04.jpg
  masonry-05.jpg
  masonry-06.jpg
```

---

## Estrutura de dados atual

```ts
type GalleryItem = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}
```

Para trocar uma legenda, edite `caption` em `src/lib/gallery.ts`.
Para trocar o texto acessível, edite `alt`.

---

## Tamanhos recomendados

- Use fotos com cerca de **1200 px de largura**.
- Varie a altura para o efeito masonry ficar natural.
- Peso ideal: **200 KB a 500 KB** por imagem.
- Formatos: JPG ou WebP.

Fotos atuais:

| Arquivo | Dimensão |
|---|---:|
| `masonry-01.jpg` | 1200 x 1600 |
| `masonry-02.jpg` | 1200 x 900 |
| `masonry-03.jpg` | 1201 x 1200 |
| `masonry-04.jpg` | 1201 x 1500 |
| `masonry-05.jpg` | 1201 x 800 |
| `masonry-06.jpg` | 1201 x 1350 |

---

## Decisões técnicas

- **Masonry via CSS columns**: 2 colunas mobile, 3 desktop.
- **Sem cards, bordas ou sombra**: só imagem, raio e gap uniforme.
- **Lightbox**: `yet-another-react-lightbox`.
- **Captions**: plugin `Captions` do próprio pacote, sem dependência extra.
- **Botão da home**: fica abaixo das fotos e linka para `/galeria`.

---

## Futuro: vídeos do YouTube

- Subir vídeos no YouTube, de preferência como `unlisted` se não quiser exposição no canal.
- Thumbnail pode vir direto do YouTube:
  `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
- No grid, vídeo deve aparecer como thumbnail com ícone de play.
- Clique pode abrir YouTube em nova aba ou usar plugin de vídeo do lightbox depois.
