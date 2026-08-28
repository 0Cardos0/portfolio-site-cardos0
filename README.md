# Portfólio Cardos0

Site de portfólio construído com [Astro](https://astro.build). Gera HTML 100%
estático — pode ser hospedado de graça em Netlify, Vercel, Cloudflare Pages ou
GitHub Pages.

---

## 1. Pré-requisitos

Esta máquina **não tem Node.js instalado**. Instale antes de continuar:

- **Node.js 20 LTS** — <https://nodejs.org> (instalador `.msi` para Windows).
  Depois de instalar, feche e reabra o terminal e confirme:

  ```powershell
  node --version   # deve mostrar v20.x
  npm --version
  ```

- (Opcional) **Git** — <https://git-scm.com/download/win> — para versionar e
  publicar o código.

---

## 2. Instalar e rodar

Dentro da pasta do projeto:

```powershell
npm install          # baixa as dependências (uma vez)
npm run dev          # servidor local em http://localhost:4321
```

Outros comandos:

| Comando           | O que faz                                             |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Ambiente de desenvolvimento com recarga automática. |
| `npm run build`   | Gera o site final em `dist/`.                        |
| `npm run preview` | Serve o conteúdo de `dist/` para conferência.        |
| `npm run icons`   | Regera os PNGs de favicon a partir de `public/favicon.svg`. |
| `npm run shot`    | Captura a screenshot de um site (ver "Adicionar a screenshot"). |
| `npm run admin:local` | Sobe o painel `/admin` em modo local (ver `ADMIN.md`). |

---

## 3. Estrutura

```
portfolio-site/
├─ astro.config.mjs          # configuração do Astro (URL do site, sitemap)
├─ package.json
├─ ADMIN.md                  # como ligar o painel /admin (GitHub + login)
├─ public/
│  ├─ admin/                 # painel Decap CMS (index.html + config.yml)
│  ├─ uploads/               # ⭐ imagens enviadas pelo painel (foto, screenshots)
│  └─ favicon.svg, robots.txt, site.webmanifest ...
├─ src/
│  ├─ data/site.json         # ⭐ todos os textos, seções, contatos (o painel edita este)
│  ├─ config/site.ts         # tipos + carregamento do site.json (não precisa mexer)
│  ├─ content.config.ts      # schema (campos) dos projetos
│  ├─ content/projetos/      # ⭐ um arquivo .md por projeto
│  ├─ layouts/BaseLayout.astro   # <head>, SEO, tema, header/footer
│  ├─ components/            # About, Services, Process, ProjectsSection, ProjectCard, Contact...
│  ├─ lib/projects.ts        # leitura e ordenação dos projetos
│  ├─ pages/
│  │  ├─ index.astro         # apresentação + serviços + metodologia + projetos + contato
│  │  ├─ projetos/[slug].astro   # página de detalhe gerada para cada projeto
│  │  └─ 404.astro
│  └─ styles/                # tokens.css (cores/tema) + global.css (base)
└─ _legacy/                  # versão HTML/CSS/JS original (referência, não usada no build)
```

Os itens marcados com ⭐ são os que você edita no dia a dia — pelo **painel
`/admin`** (veja `ADMIN.md`) ou direto nos arquivos.

---

## 4. Tarefas comuns

> Tudo abaixo também pode ser feito pelo **painel `/admin`** depois de configurá-lo
> (`ADMIN.md`). O que segue é a via "editando arquivos".

### Alterar textos, contatos, serviços, metodologia

Edite **`src/data/site.json`**. Tudo que aparece fora dos projetos (menu, topo,
hero, Serviços, Metodologia, Sobre, Contato, redes, analytics) vem desse arquivo.

Nos títulos, use `{palavra}` para destacar um termo com a cor de acento:

```json
"heading": "Sites sob medida, do {design} à {publicação}."
```

### Adicionar um projeto

1. Crie um arquivo em `src/content/projetos/`, por exemplo `meu-projeto.md`.
2. Preencha o frontmatter (campos entre `---`):

   ```markdown
   ---
   title: Nome do Projeto
   description: Uma frase sobre o que é o site.
   category: institucional        # institucional | comunidade | landing
   tags: [Responsivo, WhatsApp]
   url: https://site-do-cliente.com      # opcional
   client: Nome do Cliente               # opcional
   year: 2026                            # opcional
   date: 2026-08-27                      # usado para ordenar (empate da "order")
   featured: true                        # opcional
   order: 0                              # menor aparece primeiro
   draft: false                          # true = não publica em produção
   thumb: /uploads/meu-projeto.jpg       # opcional (screenshot)
   thumbAlt: Página inicial do site      # opcional
   ---

   ## Contexto

   Texto livre em Markdown que vira a página de detalhe do projeto.
   ```

3. Salve. O card aparece na home e a página `/projetos/meu-projeto/` é gerada
   automaticamente no build.

### Adicionar a screenshot de um projeto

Coloque o arquivo em **`public/uploads/`** e aponte no frontmatter com
`thumb: /uploads/nome-do-arquivo.jpg`. Sem `thumb`, o card mostra "Screenshot em
breve".

Para capturar a tela de um site automaticamente:

```powershell
npm run shot -- https://site-do-cliente.com/ public/uploads/meu-projeto.jpg
```

### Nova categoria de filtro

Edite `projectCategories` em `src/config/site.ts`, a lista `category` em
`src/content.config.ts` (o `z.enum([...])`) **e** as `options` da categoria em
`public/admin/config.yml`.

### Cores e tema

Ajuste as variáveis em `src/styles/tokens.css` (`:root` = tema escuro,
`[data-theme="light"]` = tema claro).

---

## 5. Antes de publicar

- URL do site: `https://cardos0.com.br` (já aplicada em: `astro.config.mjs`,
  `src/data/site.json` (`url`), `public/robots.txt` e `public/admin/config.yml`
  (`site_url` / `display_url`). Isso alimenta canonical, sitemap, Open Graph e o
  JSON-LD.
- Adicione uma imagem `public/og.png` (1200×630) para o compartilhamento em
  redes sociais.
- Preencha o e-mail real em `src/data/site.json` (`contact.links`).
- Para ligar o painel `/admin`, siga o **`ADMIN.md`**.

### Analytics (opcional, sem cookies)

Depois de publicar com domínio próprio, em `src/data/site.json`:

```json
"analytics": { "plausibleDomain": "seudominio.com.br" }
```

O script do [Plausible](https://plausible.io) só é injetado no build de produção
e não usa cookies (dispensa banner). Para uma instância self-hosted, informe
também `plausibleSrc`. Alternativa equivalente: [Umami](https://umami.is).

### Favicon

O ícone vem de `public/favicon.svg`. Se editar, rode `npm run icons` para
regerar os PNGs (`favicon-32/192/512`, `apple-touch-icon`, `favicon-maskable`).

---

## 6. Deploy

**Netlify / Vercel / Cloudflare Pages:** conecte o repositório. O `netlify.toml`
já traz `build = "npm run build"` e `publish = "dist"`. Nas outras plataformas use
os mesmos valores.

**GitHub Pages:** o workflow em `.github/workflows/deploy.yml` faz o build e
publica a cada push na branch `main` (ative Pages → Source: GitHub Actions nas
configurações do repositório). Se o site ficar em `usuario.github.io/repo`,
defina `base: '/repo'` em `astro.config.mjs`.

**Sem Git:** rode `npm run build` e faça upload manual da pasta `dist/` no painel
da hospedagem.

---

## 7. Versão original

O HTML/CSS/JS estático de onde este projeto partiu está preservado em `_legacy/`.
Não é usado no build e pode ser removido quando você quiser.
