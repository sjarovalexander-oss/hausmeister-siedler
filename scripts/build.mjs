// Vercel-Build: Seite nach dist/ kopieren, Higgsfield-Videos laden und fürs Web komprimieren.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';

const OUT = 'dist';
const COPY = ['index.html', 'karriere.html', 'kontakt.html', 'ueber-uns.html', 'kostenrechner.html', 'impressum.html', 'datenschutz.html', 'css', 'js', 'assets'];
fs.rmSync(OUT, { recursive: true, force: true });
for (const f of COPY) fs.cpSync(f, path.join(OUT, f), { recursive: true });

// Unterseiten je Leistung: /leistungen/<kürzel>
const { SERVICES, slug } = await import('../js/config.js');
const tpl = fs.readFileSync('leistung.html', 'utf8');
fs.mkdirSync(path.join(OUT, 'leistungen'), { recursive: true });
const esc = (x) => x.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const s of SERVICES) {
  const html = tpl.replace('<title>Leistung · Hausmeisterservice Siedler GmbH</title>', `<title>${esc(s.title)} · Hausmeisterservice Siedler GmbH</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(s.short + ' ' + s.long.split('. ')[0] + '.')}">`)
    .replace('data-id=""', `data-id="${s.id}"`);
  fs.writeFileSync(path.join(OUT, 'leistungen', `${slug(s)}.html`), html);
}
fs.copyFileSync('leistungen.html', path.join(OUT, 'leistungen', 'index.html'));
console.log('✓', SERVICES.length, 'Leistungsseiten');

const media = JSON.parse(fs.readFileSync('media.json', 'utf8'));
const dir = path.join(OUT, 'assets/media'); fs.mkdirSync(dir, { recursive: true });
let ffmpeg = null;
try { ffmpeg = (await import('ffmpeg-static')).default; } catch { console.warn('ffmpeg-static fehlt – Videos werden unverändert übernommen'); }

async function get(url, file) {
  const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
}
await Promise.all(Object.entries(media).map(async ([name, m]) => {
  try {
    if (m.image) {
      const src = path.join(dir, `${name}.src.png`); await get(m.image, src);
      if (ffmpeg) execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src, '-vf', `scale=${m.w || 1920}:-2`, '-q:v', '4', path.join(dir, `${name}.jpg`)]);
      else fs.copyFileSync(src, path.join(dir, `${name}.jpg`));
      fs.rmSync(src);
    }
    if (m.video) {
      const src = path.join(dir, `${name}.src.mp4`); await get(m.video, src);
      if (ffmpeg) execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src, '-an', '-vf', 'scale=1600:-2,fps=30', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(dir, `${name}.mp4`)]);
      else fs.copyFileSync(src, path.join(dir, `${name}.mp4`));
      fs.rmSync(src);
    }
    console.log('✓', name, fs.readdirSync(dir).filter((f) => f.startsWith(name)).map((f) => `${f} ${(fs.statSync(path.join(dir, f)).size / 1e6).toFixed(1)}MB`).join(', '));
  } catch (e) { console.warn('✗', name, e.message); }
}));
