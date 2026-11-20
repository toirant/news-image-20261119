// news-image-20261119 — round-2 refresh (full-day coverage).
// Copies the front-page image (entry.png) to the output directory and
// self-verifies it: PNG signature, 1024x1024 dimensions, the 1 MiB size
// cap, and a sha256 match between the source and the written copy.
// Both runs write exactly the same bytes, because the file is copied,
// not redrawn. Runs with plain `node main.ts` (Node 22, stdlib only).

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1048576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

const repoDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(repoDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function pngDimensions(bytes: Buffer): { width: number; height: number } {
  if (bytes.length < 33 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("entry.png is not a PNG file");
  }
  // The IHDR chunk must be first: 4-byte length (13), then "IHDR".
  if (bytes.readUInt32BE(8) !== 13 || bytes.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("entry.png has no IHDR chunk where it should be");
  }
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  return { width, height };
}

function pngIsWhole(bytes: Buffer): boolean {
  // A whole PNG ends with the IEND chunk: length 0, type "IEND", CRC.
  const tail = bytes.subarray(bytes.length - 12);
  return tail.readUInt32BE(0) === 0 && tail.toString("ascii", 4, 8) === "IEND";
}

const source = readFileSync(sourcePath);
const { width, height } = pngDimensions(source);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
if (source.length > MAX_BYTES) {
  throw new Error(`entry.png is ${source.length} bytes, over the 1 MiB cap`);
}
if (!pngIsWhole(source)) {
  throw new Error("entry.png is truncated: no IEND chunk at the end");
}
const sourceHash = sha256(source);

// Create the output directory if needed; never delete it (the grader's
// /output is a mount, and removing it fails).
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, outputPath);

const written = readFileSync(outputPath);
const writtenHash = sha256(written);
if (writtenHash !== sourceHash) {
  throw new Error(`output sha256 ${writtenHash} != source sha256 ${sourceHash}`);
}
const writtenSize = statSync(outputPath).size;
if (writtenSize !== source.length) {
  throw new Error(`output is ${writtenSize} bytes, source is ${source.length}`);
}

console.log(
  `entry.png verified: ${width}x${height}, ${source.length} bytes, sha256 ${sourceHash}`
);
console.log(`wrote ${outputPath}`);
