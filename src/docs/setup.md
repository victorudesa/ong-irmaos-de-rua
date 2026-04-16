# Setup Guide — ong-irmaos-de-rua

Walkthrough completo de como este projeto foi montado do zero. Serve para revisar o que foi feito e reproduzir em projetos futuros.

---

## Pré-requisitos

- **Node.js** instalado — vem com o `npm` embutido
- **Git** instalado e autenticado com o GitHub (credenciais salvas no Windows Credential Manager)
- **VS Code** com a extensão **Tailwind CSS IntelliSense** instalada

---

## 1. Criar o projeto Vite

```powershell
npm create vite@latest .
```

O `.` instala na pasta atual em vez de criar uma subpasta.

Perguntas do assistente:
- Framework: **React**
- Variant: **TypeScript** (não TypeScript + React Compiler — é experimental)
- Package name: qualquer nome, só identificador interno

O Vite gera a estrutura base e roda `npm install` automaticamente.

---

## 2. Limpar arquivos de exemplo

O Vite cria arquivos de exemplo que não são usados. Deletar:

- `src/App.css`
- `src/assets/react.svg`
- `public/vite.svg`

O `src/App.tsx` foi deletado acidentalmente — recriar com o mínimo para não quebrar o `main.tsx`:

```tsx
const App = () => {
  return <div>App</div>
}

export default App
```

---

## 3. Git — inicializar e conectar ao remoto

```powershell
git init
git remote add origin https://github.com/seu-usuario/nome-do-repo.git
```

Verificar se o remote foi conectado:
```powershell
git remote -v
```

Primeiro commit:
```powershell
git add .
git commit -m "init: projeto Vite zerado e limpo"
git push -u origin main
```

> O `-u origin main` só é necessário no primeiro push — vincula a branch local à remota. Nos próximos basta `git push`.

---

## 4. Tailwind CSS

### Por que Tailwind

Estilo utilitário direto nas classes do JSX. Padrão da indústria com React + Vite. Necessário para o shadcn/ui funcionar.

### Instalação

```powershell
npm install -D tailwindcss @tailwindcss/vite
```

`-D` porque são ferramentas de build — não vão para o bundle final.

- `tailwindcss` — o Tailwind em si
- `@tailwindcss/vite` — plugin que integra o Tailwind ao Vite

### Configuração

**`vite.config.ts`** — adicionar o plugin:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

**`src/index.css`** — substituir todo o conteúdo por:

```css
@import "tailwindcss";
```

### Commit

```powershell
git add .
git commit -m "install: tailwindcss"
git push
```

---

## 5. React Router DOM

### Por que React Router

Permite navegar entre páginas sem recarregar o navegador — essencial para SPA (Single Page Application).

### Instalação

```powershell
npm install react-router-dom
```

Sem `-D` — é uma dependência de produção, vai para o bundle final.

### Configuração básica no `App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### Commit

```powershell
git add .
git commit -m "install: react-router-dom"
git push
```

---

## 6. Lucide React

### Por que Lucide

Biblioteca de ícones SVG como componentes React. Usada internamente pelo shadcn/ui — manter consistência visual.

### Instalação

```powershell
npm install lucide-react
```

### Uso

```tsx
import { Heart, Menu } from 'lucide-react'

<Heart className="w-6 h-6 text-red-500" />
```

### Commit

```powershell
git add .
git commit -m "install: lucide-react"
git push
```

---

## 7. shadcn/ui

### O que é

Biblioteca de componentes de UI diferente das tradicionais — em vez de ficar no `node_modules`, **copia o código do componente diretamente para `src/components/ui/`**. Você tem controle total do código.

Depende internamente de:
- **Radix UI** — lógica acessível dos componentes
- **Tailwind CSS** — estilo
- **class-variance-authority** — variantes de componentes
- **clsx + tailwind-merge** — utilitários de classes

### Pré-requisito — alias `@`

O shadcn exige o alias `@` configurado para imports. Requer dois arquivos e um pacote auxiliar.

**Instalar `@types/node`** (tipos do Node.js para o TypeScript reconhecer `path` e `__dirname`):

```powershell
npm install -D @types/node
```

**`tsconfig.json`** — adicionar `compilerOptions`:

```json
{
  "files": [],
  "references": [...],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`tsconfig.app.json`** — adicionar dentro de `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**`vite.config.ts`** — adicionar o alias para o Vite também:

```ts
import path from 'path'

resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

> TypeScript e Vite são ferramentas separadas — o alias precisa ser configurado nos dois.

### Inicialização

```powershell
npx shadcn@latest init
```

`npx` executa sem instalar permanentemente — é uma ferramenta de CLI, não uma dependência do projeto.

Perguntas do assistente:
- Component library: **Radix**
- Preset: qualquer um (as cores são editadas depois no `index.css`)

O `init` cria:
- `components.json` — configuração do shadcn
- `src/lib/utils.ts` — utilitário `cn()` para combinar classes
- Popula o `src/index.css` com variáveis CSS de cores e estilos base

### Adicionar componentes

Componentes são adicionados individualmente conforme necessidade:

```powershell
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
```

Cada comando copia o componente para `src/components/ui/`.

### Commit

```powershell
git add .
git commit -m "install: shadcn/ui"
git push
```

---

## Estrutura atual do projeto

```
src/
├── components/
│   ├── ui/          ← componentes do shadcn (não editar diretamente)
├── lib/
│   └── utils.ts     ← utilitário cn()
├── docs/
│   └── setup.md     ← este arquivo
├── App.tsx          ← raiz da aplicação, define rotas
├── main.tsx         ← ponto de entrada, monta o React no DOM
└── index.css        ← estilos globais + variáveis do shadcn + Tailwind
```

---

## Próximos passos

- Configurar as cores da ONG nas variáveis CSS do `index.css`
- Criar a pasta `src/pages/` e as páginas da aplicação
- Copiar e adaptar componentes do projeto original (`irmaos-de-rua-oficial`)
- Adicionar componentes do shadcn conforme necessidade
