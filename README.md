# Omborchi Pro (Supabase + Vite)

Ushbu loyiha ombor modullari va ularning BOM (materiallar / furnituralar) ro'yxatini real vaqtda kuzatish uchun mo'ljallangan modernizatsiya qilingan tizimdir.

## Texnologik stek
- **Front-end**: Vanilla JS (ES Modules)
- **Styling**: Vanilla CSS (Modern Design System)
- **Database**: Supabase
- **Build Tool**: Vite
- **Deployment**: Vercel

## Lokal ishga tushirish
1. `.env` faylini yaratish (`VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` bilan).
2. `npm install`
3. `npm run dev`

## GitHub -> Vercel Chain
Loyiha har bir `push`da Vercel'da avtomatik ravishda `vite build` qilinadi va `dist/` papkasidan ko'rsatiladi.

**Muhim:** Vercel'da `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` environment o'zgaruvchilarini sozlashni unutmang.
