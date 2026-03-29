# Omborchi veb (Supabase BOM)

Ombor nazoratini real vaqtda yuritish — modullar roʻyxati va tanlangan modul uchun **materiallar / furnitura** (BOM) jadvali. Supabase `modules`, `module_materials`, `module_fasteners` jadvallariga ulanadi.

## GitHub

```bash
cd ombor-web
git init
git add .
git commit -m "Initial ombor web"
```

GitHubʼda yangi repozitoriy yarating, keyin:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git branch -M main
git push -u origin main
```

## Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → GitHub reponi tanlang.
2. **Root Directory**: `ombor-web` (agar monorepo boʻlsa) yoki faqat shu repodagi loyiha ildizi.
3. **Environment Variables** (Production / Preview):

   - `SUPABASE_URL` — Supabase loyiha URL
   - `SUPABASE_ANON_KEY` — anon (public) API kalit

4. **Build va chiqish**: `npm run build` → chiqish papkasi **`public`** (Vercel standartiga mos).
5. Deploy.

### 404 yoki build xatosi

- GitHub repoda **oxirgi kod** borligini tekshiring: `vercel.json`, `package.json`, `index.html`, `scripts/` koʻrinishi kerak.
- **Install** xatosi: `package.json` va `package-lock.json` birga push qiling; `npm install` ni faqat `git` orqali yangilang (upload chalkashtirmasin).
- Vercel **Deployments** → oxirgi deploy **Building** logida `public/ tayyor` qatori chiqishi kerak.

## Lokal tekshiruv

```bash
cp .env.example .env
# .env ichiga SUPABASE_URL va SUPABASE_ANON_KEY kiriting

npm install
npm run build
npx serve public -p 3000
```

Brauzerda `http://localhost:3000` ochiladi.

## Xavfsizlik

- `supabaseClient.js` `.gitignore` da — repoga kirmaydi.
- Anon kalit brauzerda koʻrinadi; himoya Supabase **RLS** siyosatlari orqali.
