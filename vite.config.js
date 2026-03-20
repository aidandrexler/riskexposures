import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readdirSync, readFileSync, writeFileSync } from 'fs'

// Auto-generate sitemap from markdown files at build time
function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const blogDir = resolve(__dirname, 'content/blog')
      const today = new Date().toISOString().split('T')[0]

      let slugs = []
      try {
        slugs = readdirSync(blogDir)
          .filter(f => f.endsWith('.md'))
          .map(f => f.replace('.md', ''))
      } catch(e) {}

      const staticPages = [
        { loc: 'https://riskexposures.com/', priority: '1.0', changefreq: 'weekly' },
        { loc: 'https://riskexposures.com/diagnostic', priority: '0.9', changefreq: 'monthly' },
        { loc: 'https://riskexposures.com/blog', priority: '0.8', changefreq: 'weekly' },
      ]

      const blogPages = slugs.map(slug => ({
        loc: `https://riskexposures.com/blog/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
      }))

      const allPages = [...staticPages, ...blogPages]

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

      writeFileSync(resolve(__dirname, 'dist/sitemap.xml'), xml)
      console.log(`✓ sitemap.xml generated with ${allPages.length} URLs`)
    }
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  build: {
    outDir: 'dist'
  }
})
