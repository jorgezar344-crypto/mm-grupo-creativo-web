import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");

const jobs = [
  { input: "hero-mm.png", name: "hero-mm", widths: [960, 1280, 1672], formats: ["avif", "webp"] },
  { input: "hero-mm-mobile.png", name: "hero-mm-mobile", widths: [480, 768, 1024], formats: ["avif", "webp"] },
  { input: "carpentry-detail.png", name: "carpentry-detail", widths: [480, 768, 1024, 1280], formats: ["webp"] },
  { input: "interior-mm.png", name: "interior-mm", widths: [640, 960, 1280, 1672], formats: ["avif", "webp"] },
  { input: "interior-feature.png", name: "interior-feature", widths: [640, 960, 1280, 1672], formats: ["webp"] },
  { input: "mm-logo.png", name: "mm-logo", widths: [96, 128], formats: ["webp"] },
];

for (const job of jobs) {
  const input = path.join(publicDir, job.input);
  for (const width of job.widths) {
    for (const format of job.formats) {
      const output = path.join(publicDir, `${job.name}-${width}.${format}`);
      let pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      pipeline = format === "avif"
        ? pipeline.avif({ quality: 58, effort: 7, chromaSubsampling: "4:4:4" })
        : pipeline.webp({ quality: 82, effort: 6, smartSubsample: true });
      await pipeline.toFile(output);
      const { size } = await stat(output);
      console.log(`${path.basename(output)}\t${size}`);
    }
  }
}
