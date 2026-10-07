// Run with Node and sharp available (NODE_PATH can point to the bundled runtime).
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const source = path.join(__dirname, '../public/images/works');
  const target = path.join(source, 'previews');
  await fs.mkdir(target, { recursive: true });
  const names = (await fs.readdir(source)).filter((name) => name.endsWith('.webp'));
  let original = 0;
  let optimized = 0;
  for (const name of names) {
    original += (await fs.stat(path.join(source, name))).size;
    for (const width of [360, 640]) {
      const result = await sharp(path.join(source, name))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(path.join(target, name.replace('.webp', `-${width}.webp`)));
      if (width === 640) optimized += result.size;
    }
  }
  console.log(JSON.stringify({ images: names.length, originalBytes: original, preview640Bytes: optimized }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
