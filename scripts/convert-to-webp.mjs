/**
 * Конвертирует все JPG/PNG в public/images/ в WebP
 * Запуск: node scripts/convert-to-webp.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const ROOT = new URL("../public/images", import.meta.url).pathname;

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(ROOT);
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
