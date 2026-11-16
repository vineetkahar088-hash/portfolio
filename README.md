# Vineet Kahar — Portfolio

Personal portfolio of Vineet Kahar, a full-stack developer from Indore.
Built with Astro, GSAP, Lenis and Three.js.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs ./dist
npm run preview   # serve the production build
```

Node.js 22.12 or newer is required.

## Structure

```
src/
  pages/index.astro        home page
  pages/work/[slug].astro  one case-study page per project
  layouts/SiteLayout.astro page shell: header, menu, footer, loader
  components/              loader, project card and project illustrations
  data/site.js             name, links, about text, skills, journey, education
  data/projects.js         the projects shown on the site
  scripts/                 animations (scroll, hero scene, tools sphere, route map)
  styles/                  site stylesheets
  assets/                  portrait photo
public/
  Vineet-Kahar-Resume.pdf  resume (download button)
  images/                  project logos
```

## Editing the content

- **Profile, skills, journey, education:** `src/data/site.js`
- **Projects:** `src/data/projects.js`. Each project gets its own page at `/work/<slug>/`.
- **Portrait photo:** replace `src/assets/vineet-portrait-bw.png`
- **Resume:** replace `public/Vineet-Kahar-Resume.pdf` (keep the same file name)

## Deploying

`dist/` is plain static files. On Vercel, Netlify or Cloudflare Pages use
build command `npm run build` and output directory `dist`. Use Node.js 22.x.
Set `site` in `astro.config.mjs` once the production URL is known.