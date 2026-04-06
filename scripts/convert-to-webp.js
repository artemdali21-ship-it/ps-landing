/**
 * Конвертирует JPG/PNG в public/images/ в WebP
 * Запуск: node scripts/convert-to-webp.js
 */
const sharp = require("sharp");
const { readdirSync, statSync } = require("fs");
const { join, extname, basename } = require("path");

const ROOT = join(__dirname, "../public/images");

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = walk(ROOT);
  const targets = files.filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${targets.length} files to convert`);

  for (const src of targets) {
    const ext = extname(src);
    const dest = src.replace(new RegExp(`\\${ext}$`, "i"), ".webp");
    try {
      await sharp(src).webp({ quality: 82 }).toFile(dest);
      console.log(`[ok] ${basename(src)} → ${basename(dest)}`);
    } catch (e) {
      console.error(`[err] ${basename(src)}: ${e.message}`);
    }
  }

  console.log("Done.");
}

main();
