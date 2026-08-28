# Painel de administração (`/admin`)

O site usa o **Decap CMS**: uma página protegida em `/admin/` com formulários
para editar textos, seções, contatos e projetos. Ao salvar, o painel faz um
**commit no repositório do GitHub** e a hospedagem reconstrói o site sozinha
(~30 s a 1 min).

O que dá para editar pelo painel:

| Item | Arquivo por trás |
| --- | --- |
| Textos, menu, hero, Serviços, Metodologia, Sobre, Contato, redes, analytics | `src/data/site.json` |
| Projetos (criar / editar / excluir, com screenshot) | `src/content/projetos/*.md` |
| Imagens enviadas | `public/uploads/` |

---

## Pré-requisitos

1. Código versionado no **GitHub** (repositório privado ou público).
2. Site **publicado** (Vercel, Cloudflare Pages ou GitHub Pages).
3. Um **proxy de login OAuth** (abaixo) — necessário porque o backend é GitHub e
   não Netlify.

---

## 1. Subir para o GitHub

```powershell
# instale o Git antes: https://git-scm.com/download/win
git init
git add .
git commit -m "Site + painel"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

## 2. Publicar

Qualquer uma serve (build `npm run build`, saída `dist`):

- **Cloudflare Pages** — conecta o repo, framework preset "Astro".
- **Vercel** — importa o repo, detecta Astro sozinho.
- **GitHub Pages** — o workflow em `.github/workflows/deploy.yml` já faz isso.

## 3. Criar o GitHub OAuth App

GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*:

- **Application name:** Painel Cardos0
- **Homepage URL:** `https://SEU-DOMINIO`
- **Authorization callback URL:** `https://SEU-PROXY.workers.dev/callback`
  (o valor exato sai do passo 4)

Guarde o **Client ID** e gere um **Client Secret**.

## 4. Subir o proxy de login (Cloudflare Worker)

Use o **`sveltia-cms-auth`** (compatível com o Decap), deploy em ~2 min:

1. <https://github.com/sveltia/sveltia-cms-auth> → botão **Deploy to Cloudflare**.
2. Nas *Settings → Variables* do Worker, defina:
   - `GITHUB_CLIENT_ID` = client id do passo 3
   - `GITHUB_CLIENT_SECRET` = client secret do passo 3
   - `ALLOWED_DOMAINS` = `SEU-DOMINIO` (e `*.pages.dev` / `*.vercel.app` se for testar por lá)
3. A URL final fica algo como `https://sveltia-cms-auth.SEU-SUBDOMINIO.workers.dev`.
4. Volte ao passo 3 e confirme o *callback* como `.../callback`.

> Alternativa: qualquer implementação de "Netlify/Decap OAuth provider" serve
> (há versões para Vercel, Deno Deploy, etc.). O que importa é o `base_url`.

## 5. Apontar o `config.yml`

Edite **`public/admin/config.yml`**:

```yaml
backend:
  name: github
  repo: SEU-USUARIO/SEU-REPOSITORIO
  branch: main
  base_url: https://sveltia-cms-auth.SEU-SUBDOMINIO.workers.dev

site_url: https://SEU-DOMINIO
display_url: https://SEU-DOMINIO
```

Commit e push. Pronto: acesse **`https://SEU-DOMINIO/admin/`** e clique em
*Login with GitHub*.

---

## Editar sem internet / sem GitHub (modo local)

Para mexer no conteúdo enquanto desenvolve, sem tocar no GitHub:

```powershell
# terminal 1
npm run admin:local     # sobe o proxy local (decap-server)

# terminal 2
npm run dev
```

Abra <http://localhost:4321/admin/>. Nesse modo o painel grava direto nos
arquivos do projeto (`local_backend: true` já está no `config.yml`). Rode
`npm run build` depois para conferir.

---

## Dicas

- **Convidar mais editores:** adicione a pessoa como colaboradora do repositório
  no GitHub. Quem tem acesso de escrita ao repo consegue usar o painel.
- **Revisar antes de publicar:** troque `publish_mode: simple` por
  `publish_mode: editorial_workflow` no `config.yml` — aí cada alteração vira um
  Pull Request em vez de ir direto para o ar.
- **Segurança:** `/admin/` é público mas inútil sem login do GitHub autorizado.
  Ele está com `noindex` e bloqueado no `robots.txt`.
- **Subir a versão do Decap:** número no fim de `public/admin/index.html`.
