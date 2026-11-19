// news-image-20261119 — entry program for make.fun
//
// The entry is a newspaper front page, "THE WORLD IN ONE DAY —
// THURSDAY 19 NOVEMBER 2026", summing up the real world news of
// Thursday 19 November 2026 as reported by early that day (UTC):
// the first-ever U.S.–China–Russia summit in Shenzhen, the mine
// strikes on tankers off the Strait of Hormuz, the World Court's
// ruling on Myanmar's alleged Rohingya genocide, Israeli tanks
// crossing the Gaza ceasefire line, the worldwide launch of GTA VI,
// a record $190.4M Van Gogh sale, and Cyclone Akvan bearing down
// on India — plus a short strip of the day's other stories.
//
// The image itself lives in this repository as entry.png (1024x1024,
// under 1 MiB). This program does the only thing the run needs:
// it copies that image to the output directory make.fun hands it,
// as entry.png, byte for byte. It uses no network and writes the
// same bytes on every run.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The image this repository ships, next to this program.
const IMAGE_NAME = "entry.png";

// The environment variable make.fun sets to the output directory.
const OUTPUT_DIR_ENV = "MAKEFUN_OUTPUT_DIR";

function repoRoot(): string {
  return dirname(fileURLToPath(import.meta.url));
}

function main(): void {
  const outDir = process.env[OUTPUT_DIR_ENV];
  if (!outDir) {
    throw new Error(`${OUTPUT_DIR_ENV} is not set`);
  }
  const source = join(repoRoot(), IMAGE_NAME);
  if (!existsSync(source)) {
    throw new Error(`missing ${IMAGE_NAME} in ${repoRoot()}`);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, IMAGE_NAME);
  copyFileSync(source, target);
  // Confirm the copy landed whole before we report success.
  const written = statSync(target);
  const shipped = statSync(source);
  if (written.size !== shipped.size) {
    throw new Error(`short write: ${written.size} of ${shipped.size} bytes`);
  }
  console.log(`wrote ${target} (${written.size} bytes)`);
}

main();
