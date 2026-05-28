# Serena — Guia de Deploy
## Supabase + GitHub + Cloudflare Pages

---

## 1. SUPABASE

### 1.1 Criar projeto
1. supabase.com → New Project
2. Nome: `serena` | Região: South America (São Paulo)

### 1.2 Rodar o schema
SQL Editor → cole o conteúdo de `supabase-schema.sql` → Execute

### 1.3 Credenciais
Settings → API → copie Project URL e anon public key.

Cole em `src/lib/supabase.js`:
```js
const SUPABASE_URL = 'https://xyzxyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
```

### 1.4 Auth
Authentication → Providers → Email → Enable

---

## 2. GITHUB

```bash
git init
git add .
git commit -m "feat: Serena — initial commit"
git remote add origin https://github.com/SEU-USUARIO/serena.git
git branch -M main
git push -u origin main
```

---

## 3. CLOUDFLARE PAGES

1. dash.cloudflare.com → Pages → Create a project
2. Connect to Git → GitHub → selecione `serena`
3. Framework preset: None | Build command: (vazio) | Output dir: /
4. Save and Deploy

---

## 4. ESTRUTURA

```
serena/
├── index.html
├── src/lib/
│   ├── supabase.js
│   └── biomarkers.js
├── supabase-schema.sql
└── DEPLOY.md
```

---

## 5. UPDATES

```bash
git add . && git commit -m "feat: ..." && git push
```
Cloudflare redeploya em ~30s.

---

## 6. APÓS DEPLOY

Atualize o campo Acesso na entrada do Notion (Apps & Ferramentas → Serena).
