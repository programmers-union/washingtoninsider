import { generate } from 'critical';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'out');

const htmlFiles = readdirSync(outDir).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  try {
    await generate({
      base: 'out/',
      src: file,
      target: { html: file },
      inline: true,
      extract: true,
      dimensions: [{ width: 1300, height: 900 }],
    });
    console.log(`✅ Inlined critical CSS into ${file}`);
  } catch (err) {
    console.error(`❌ Error inlining ${file}:`, err);
  }
}
