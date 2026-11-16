import {
  siReact, siJavascript, siHtml5, siCss, siTailwindcss, siBootstrap,
  siNodedotjs, siExpress, siPostman, siJsonwebtokens,
  siMongodb, siMysql, siPython, siPandas, siNumpy, siJupyter,
  siCplusplus,
  siGit, siGithub, siRender, siNetlify, siAstro, siGsap,
} from 'simple-icons'

/*
  Tech stack on a wireframe sphere. Every tool and note here is
  from Vineet's resume, plus the two tools this page is built with.
*/

export const GROUPS = { front: 'Frontend', back: 'Backend', data: 'Data', lang: 'Languages', ops: 'Tooling' }

const TOOLS = [
  [siReact, 'front', 'Default for product UI: reusable components, hooks and the Context API.'],
  [siHtml5, 'front', 'Semantic structure first, with accessibility in mind.'],
  [siCss, 'front', 'Responsive layouts that hold up from phone to desktop.'],
  [siTailwindcss, 'front', 'Consistent, responsive UI built quickly. Used at Elevare Technology.'],
  [siBootstrap, 'front', 'Mobile-first layouts. Used at Dr. Reddy’s Foundation.'],
  [siNodedotjs, 'back', 'The runtime behind the APIs in every project on this page.'],
  [siExpress, 'back', 'Routing, middleware and validation for REST APIs.'],
  [siJsonwebtokens, 'back', 'Access and refresh tokens for authentication.'],
  [siPostman, 'back', 'Testing every endpoint before it ships.'],
  [siMongodb, 'data', 'The main database: schema design, indexing and CRUD with Mongoose.'],
  [siMysql, 'data', 'Relational data and SQL queries.'],
  [siPandas, 'data', 'Cleaning and exploring tabular data.'],
  [siNumpy, 'data', 'Numerical work for data analysis.'],
  [siJupyter, 'data', 'Notebooks for exploring data step by step.'],
  [siJavascript, 'lang', 'The language under every interface and service I ship, ES6+.'],
  [siPython, 'lang', 'Scripting and data analysis with Pandas, NumPy and Jupyter.'],
  [siCplusplus, 'lang', 'Used for daily data structures and algorithms practice.'],
  [siGit, 'ops', 'Version control, branching and pull requests on everything.'],
  [siGithub, 'ops', 'Code, reviews and every project on this page.'],
  [siRender, 'ops', 'Hosting for Node.js services.'],
  [siNetlify, 'ops', 'Deploying React front ends with CI/CD.'],
  [siAstro, 'ops', 'The framework this portfolio is built with.'],
  [siGsap, 'ops', 'Every scroll animation on this page.'],
]

export function initOrbit(root, { onTool, reducedMotion = false }) {
  const stage = root.querySelector('.orbit__stage')
  const wire = document.createElement('canvas')
  wire.className = 'orbit__wire'
  wire.setAttribute('aria-hidden', 'true')
  root.prepend(wire)
  const ctx = wire.getContext('2d')
  let filter = null

  const items = TOOLS.map(([icon, group, use], i) => {
    const el = document.createElement('button')
    el.type = 'button'
    el.className = 'orbit__item'
    el.dataset.group = group
    el.setAttribute('aria-label', `${icon.title}: ${use}`)
    el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon.path}"/></svg>`
    stage.appendChild(el)
    const n = TOOLS.length
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = Math.PI * (3 - Math.sqrt(5)) * i
    const item = { el, icon, group, use, p: [Math.cos(th) * r, y, Math.sin(th) * r], hover: false }
    const show = () => onTool?.(icon.title, use, GROUPS[group])
    el.addEventListener('pointerenter', () => { item.hover = true; show() })
    el.addEventListener('pointerleave', () => { item.hover = false })
    el.addEventListener('focus', () => { item.hover = true; show() })
    el.addEventListener('blur', () => { item.hover = false })
    el.addEventListener('click', show)
    return item
  })

  let ax = -0.35, ay = 0, vx = 0, vy = 0.004
  let drag = null
  let R = 200, W = 0, H = 0, dpr = 1
  const resize = () => {
    const r = root.getBoundingClientRect()
    W = r.width; H = r.height
    R = Math.min(W, H) * 0.38
    dpr = Math.min(devicePixelRatio, 2)
    wire.width = W * dpr; wire.height = H * dpr
    wire.style.width = W + 'px'; wire.style.height = H + 'px'
  }
  resize()
  addEventListener('resize', resize)

  root.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.orbit__item')) return
    drag = { x: e.clientX, y: e.clientY }
    root.setPointerCapture?.(e.pointerId)
    root.classList.add('is-dragging')
  })
  root.addEventListener('pointermove', (e) => {
    if (!drag) return
    vy = (e.clientX - drag.x) * 0.006
    vx = -(e.clientY - drag.y) * 0.006
    drag = { x: e.clientX, y: e.clientY }
  })
  const up = () => { drag = null; root.classList.remove('is-dragging') }
  root.addEventListener('pointerup', up)
  root.addEventListener('pointercancel', up)

  const rot = (p) => {
    const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax)
    const x1 = p[0] * cy + p[2] * sy
    const z1 = -p[0] * sy + p[2] * cy
    return [x1, p[1] * cx - z1 * sx, p[1] * sx + z1 * cx]
  }
  const F = 3.2
  const project = (q) => {
    const s = F / (F - q[2])
    return [W / 2 + q[0] * R * s, H / 2 - q[1] * R * s, s, q[2]]
  }

  let visible = false
  // A fast scroll can deliver several entries in one callback; only the newest says where the globe is now.
  new IntersectionObserver((entries) => (visible = entries[entries.length - 1].isIntersecting)).observe(root)

  function update() {
    if (!visible) return
    if (!reducedMotion || drag) { ay += vy; ax += vx }
    if (!drag && !reducedMotion) {
      vy += (0.0032 - vy) * 0.02
      vx *= 0.94
      ax += (-0.35 - ax) * 0.01
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.lineWidth = 1
    const drawLine = (pts) => {
      for (let k = 1; k < pts.length; k++) {
        const a = pts[k - 1], b = pts[k]
        const front = (a[3] + b[3]) / 2
        ctx.strokeStyle = `rgba(247,243,233,${0.1 + Math.max(0, front) * 0.22})`
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
      }
    }
    for (let m = 0; m < 12; m++) {
      const lon = (m / 12) * Math.PI
      const pts = []
      for (let k = 0; k <= 48; k++) {
        const lat = (k / 48) * Math.PI * 2
        pts.push(project(rot([Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)])))
      }
      drawLine(pts)
    }
    for (let l = 1; l < 6; l++) {
      const lat = -Math.PI / 2 + (l / 6) * Math.PI
      const pts = []
      for (let k = 0; k <= 64; k++) {
        const lon = (k / 64) * Math.PI * 2
        pts.push(project(rot([Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)])))
      }
      drawLine(pts)
    }

    for (const it of items) {
      const [x, y, s, z] = project(rot(it.p))
      const front = z * 0.5 + 0.5
      const picked = !filter || it.group === filter
      const scale = s * (0.7 + front * 0.5) * (it.hover ? 1.32 : 1) * (filter && picked ? 1.12 : 1)
      it.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      it.el.style.opacity = ((0.16 + front * 0.84) * (picked ? 1 : 0.18)).toFixed(3)
      it.el.style.zIndex = String(Math.round(front * 100))
      it.el.style.pointerEvents = front > 0.45 ? 'auto' : 'none'
      it.el.classList.toggle('is-picked', !!filter && picked)
    }
  }

  return {
    update,
    setFilter(g) { filter = g || null },
  }
}
