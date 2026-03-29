import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dist = path.join(root, 'dist')

if (!process.env.VERCEL) {
  await import('dotenv/config')
}

const url = process.env.SUPABASE_URL?.trim()
const key = process.env.SUPABASE_ANON_KEY?.trim()

if (!url || !key) {
  console.error(
    'Xatolik: SUPABASE_URL va SUPABASE_ANON_KEY oʻrnatilmagan.\n' +
      '  Lokal: ombor-web/.env faylida yozing (`.env.example` dan nusxa).\n' +
      '  Vercel: Project → Settings → Environment Variables.',
  )
  process.exit(1)
}

fs.mkdirSync(dist, { recursive: true })

const client = `import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = ${JSON.stringify(url)}
const supabaseKey = ${JSON.stringify(key)}

export const supabase = createClient(supabaseUrl, supabaseKey)
`

fs.writeFileSync(path.join(dist, 'supabaseClient.js'), client, 'utf8')
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'))
console.log('dist/ tayyor: index.html + supabaseClient.js')
