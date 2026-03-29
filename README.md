# Omborchi veb (Supabase BOM)

Modullar roʻyxati va tanlangan modul uchun **materiallar / furnitura** (BOM) jadvali. Supabase `modules`, `module_materials`, `module_fasteners` jadvallariga ulanadi.

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

4. Deploy. Build avtomatik `npm run build` orqali `supabaseClient.js` faylini yozadi.

## Lokal tekshiruv

```bash
cp .env.example .env
# .env ichiga SUPABASE_URL va SUPABASE_ANON_KEY kiriting

npm install
npm run build
npx serve . -p 3000
```

Brauzerda `http://localhost:3000` ochiladi.

## Xavfsizlik

- `supabaseClient.js` `.gitignore` da — repoga kirmaydi.
- Anon kalit brauzerda koʻrinadi; himoya Supabase **RLS** siyosatlari orqali.
