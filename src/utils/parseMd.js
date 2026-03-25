export function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data = {}
  const lines = match[1].split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const colon = line.indexOf(':')
    if (colon === -1) { i++; continue }
    const key = line.slice(0, colon).trim()
    let val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '')
    // Handle multi-line values — CMS wraps long strings with indented continuation lines
    while (i + 1 < lines.length && lines[i + 1].match(/^\s+\S/)) {
      i++
      val += ' ' + lines[i].trim().replace(/["']$/g, '')
    }
    data[key] = val.trim()
    i++
  }
  return { data, content: match[2].trim() }
}
