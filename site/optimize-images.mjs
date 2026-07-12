import sharp from "sharp";
import { writeFileSync, readdirSync, statSync } from "fs";
import { join, extname, resolve, relative } from "path";

const PUBLIC_DIR = resolve("./public");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;

// Directories to process
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"];

let totalBefore = 0;
let totalAfter = 0;
let filesProcessed = 0;
let filesSkipped = 0;
const errors = [];

function getAllImages(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllImages(fullPath));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (IMAGE_EXTS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const origSize = statSync(filePath).size;

  try {
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    // Only resize if wider than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    let outputBuffer;

    if (ext === ".jpg" || ext === ".jpeg") {
      outputBuffer = await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
    } else if (ext === ".png") {
      // For PNG, check if it has transparency
      const hasAlpha = metadata.hasAlpha;
      if (!hasAlpha) {
        // No transparency - convert to JPEG for massive savings
        outputBuffer = await pipeline
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer();
        // But we keep .png extension... actually let's keep PNG for non-alpha
        // Let user know this could be converted
        outputBuffer = await pipeline
          .png({ quality: PNG_QUALITY, compressionLevel: 9 })
          .toBuffer();
      } else {
        outputBuffer = await pipeline
          .png({ quality: PNG_QUALITY, compressionLevel: 9 })
          .toBuffer();
      }
    } else if (ext === ".webp") {
      outputBuffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    }

    const newSize = outputBuffer.length;
    const savings = origSize - newSize;
    const pct = ((savings / origSize) * 100).toFixed(1);

    // Only overwrite if we actually saved space
    if (savings > 0) {
      writeFileSync(filePath, outputBuffer);
      console.log(
        `✅ ${(savings / 1024 / 1024).toFixed(2)}MB saved (${pct}%) — ${relative(PUBLIC_DIR, filePath)}`,
      );
    } else {
      console.log(
        `⏭️  Skipped (no savings) — ${relative(PUBLIC_DIR, filePath)}`,
      );
      filesSkipped++;
      return;
    }

    totalBefore += origSize;
    totalAfter += newSize;
    filesProcessed++;
  } catch (err) {
    errors.push({ file: filePath, error: err.message });
    console.error(
      `❌ Error: ${relative(PUBLIC_DIR, filePath)} — ${err.message}`,
    );
  }
}

async function main() {
  console.log("🔍 Scanning for images...\n");
  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images\n`);

  for (const img of images) {
    await optimizeImage(img);
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));
  console.log(`Files processed: ${filesProcessed}`);
  console.log(`Files skipped:   ${filesSkipped}`);
  console.log(`Errors:          ${errors.length}`);
  console.log(`Size before:     ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Size after:      ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `Total saved:     ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`,
  );

  if (errors.length > 0) {
    console.log("\n❌ Errors:");
    errors.forEach((e) => console.log(`   ${e.file}: ${e.error}`));
  }
}

main().catch(console.error);
