import { supabase } from './supabase'

const elements = {
  modulesList: document.getElementById('modules-list'),
  moduleCount: document.getElementById('module-count'),
  welcomeScreen: document.getElementById('welcome-screen'),
  bomDashboard: document.getElementById('bom-dashboard'),
  activeName: document.getElementById('active-module-name'),
  activeArtikul: document.getElementById('active-module-artikul'),
  activeSegment: document.getElementById('active-module-segment'),
  tblMaterials: document.querySelector('#tbl-materials tbody'),
  tblFasteners: document.querySelector('#tbl-fasteners tbody'),
  searchInput: document.getElementById('search-input'),
  syncStatus: document.getElementById('sync-status')
}

let allModules = []

async function init() {
  setSyncStatus('Yuklanmoqda...', 'wait')
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Xatolik:', error.message)
    elements.modulesList.innerHTML = `<div class="loader" style="color:red">Ulanishda xato: ${error.message}</div>`
    setSyncStatus('Xatolik', 'error')
    return
  }

  allModules = data || []
  renderModules(allModules)
  elements.moduleCount.textContent = allModules.length
  setSyncStatus('Bog\'langan', 'ok')
}

function renderModules(modules) {
  elements.modulesList.innerHTML = ''
  if (modules.length === 0) {
    elements.modulesList.innerHTML = '<div class="loader">Hozircha hech narsa yo\'q</div>'
    return
  }

  modules.forEach(m => {
    const div = document.createElement('div')
    div.className = 'module-item'
    div.id = `module-${m.id}`
    div.innerHTML = `
      <span class="name">${m.name || 'Nomsiz'}</span>
      <span class="art">${m.artikul || '-'}</span>
    `
    div.onclick = () => selectModule(m)
    elements.modulesList.appendChild(div)
  })
}

async function selectModule(module) {
  // UI update
  document.querySelectorAll('.module-item').forEach(el => el.classList.remove('active'))
  document.getElementById(`module-${module.id}`)?.classList.add('active')
  
  elements.welcomeScreen.style.display = 'none'
  elements.bomDashboard.style.display = 'block'
  
  elements.activeName.textContent = module.name || 'Nomsiz'
  elements.activeArtikul.textContent = module.artikul || '-'
  elements.activeSegment.textContent = module.segment || '-'
  elements.activeSegment.style.display = module.segment ? 'block' : 'none'

  // Loading state for tables
  const loadingHtml = '<tr><td colspan="2"><div class="loader">Yuklanmoqda...</div></td></tr>'
  elements.tblMaterials.innerHTML = loadingHtml
  elements.tblFasteners.innerHTML = loadingHtml

  try {
    const [matsRes, fursRes] = await Promise.all([
      supabase.from('module_materials').select('quantity, materials(name)').eq('module_id', module.id),
      supabase.from('module_fasteners').select('quantity, fasteners(name)').eq('module_id', module.id)
    ])

    // Render Materials
    elements.tblMaterials.innerHTML = matsRes.data?.length 
      ? matsRes.data.map(m => `<tr><td>${m.materials?.name || '?'}</td><td class="text-right">${m.quantity}</td></tr>`).join('')
      : '<tr><td colspan="2"><div class="loader">Materiallar mavjud emas</div></td></tr>'

    // Render Fasteners
    elements.tblFasteners.innerHTML = fursRes.data?.length 
      ? fursRes.data.map(f => `<tr><td>${f.fasteners?.name || '?'}</td><td class="text-right">${f.quantity}</td></tr>`).join('')
      : '<tr><td colspan="2"><div class="loader">Furnituralar mavjud emas</div></td></tr>'

  } catch (e) {
    console.error(e)
    elements.tblMaterials.innerHTML = '<tr><td colspan="2" style="color:red">Yuklashda xato</td></tr>'
  }
}

function setSyncStatus(text, type) {
  elements.syncStatus.textContent = text
  elements.syncStatus.style.opacity = type === 'wait' ? '0.5' : '1'
}

// Search Logic
elements.searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase()
  const filtered = allModules.filter(m => 
    (m.name?.toLowerCase().includes(term)) || 
    (m.artikul?.toLowerCase().includes(term))
  )
  renderModules(filtered)
})

init()
