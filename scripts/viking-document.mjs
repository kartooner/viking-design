#!/usr/bin/env node
/**
 * Viking Design Documenter
 * Scans code to extract design tokens and drafts a DESIGN.md.
 *
 * Usage: viking-document [folder] [--force] [--stdout]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectFiles } from './viking-detect.mjs';

export function extractTokens(content) {
  const colors = [...content.matchAll(/(--[\w-]+):\s*(#[a-fA-F0-9]{3,8})\b/g)].map(m => ({ name: m[1], value: m[2] }));
  const fonts = [...content.matchAll(/font-family:\s*([^;}"]+)/g)].map(m => m[1].trim());
  const radii = [...content.matchAll(/border-radius:\s*([^;}"]+)/g)].map(m => m[1].trim());
  return { colors, fonts, radii };
}

export function mergeTokens(list) {
  const colors = new Map();
  const fonts = new Set();
  const radii = new Set();
  for (const t of list) {
    t.colors.forEach(c => { if (!colors.has(c.name)) colors.set(c.name, c.value); });
    t.fonts.forEach(f => fonts.add(f));
    t.radii.forEach(r => radii.add(r));
  }
  return { colors, fonts: [...fonts], radii: [...radii] };
}

export function renderDesignMd(projectName, tokens, fileCount) {
  const list = items => (items.length ? items.map(i => `- \`${i}\``).join('\n') : '- None found');
  const colorYaml = [...tokens.colors].map(([name, value]) => `  ${name.replace(/^--/, '')}: "${value}"`).join('\n');
  const colorRows = [...tokens.colors].map(([name, value]) => `| \`${name}\` | \`${value}\` |`).join('\n');

  return `---
name: ${projectName}
description: Design tokens extracted from ${fileCount} file(s). Review before relying on it.
colors:
${colorYaml || '  {}'}
---

# Design System: ${projectName}

## Colors
${colorRows ? `| Token | Value |\n|---|---|\n${colorRows}` : 'No color custom properties found.'}

## Typography
${list(tokens.fonts)}

## Radii
${list(tokens.radii)}

## Notes
This is a first draft. Name the tokens by purpose (surface, text, accent), cut duplicates, and add component rules before handing it to the Flow Designer or Handoff Specialist.
`;
}

function run() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const toStdout = args.includes('--stdout');
  const target = path.resolve(args.find(a => !a.startsWith('--')) || '.');

  const files = collectFiles(target).filter(f => /\.(css|scss|less|html?)$/i.test(f));
  const tokens = mergeTokens(files.map(f => extractTokens(fs.readFileSync(f, 'utf-8'))));
  const designMd = renderDesignMd(path.basename(target), tokens, files.length);

  if (toStdout) {
    process.stdout.write(designMd);
    return;
  }

  const outPath = path.join(target, 'DESIGN.md');
  if (fs.existsSync(outPath) && !force) {
    console.error(`DESIGN.md already exists at ${outPath}. Use --force to overwrite or --stdout to preview.`);
    process.exitCode = 1;
    return;
  }

  console.log(`🛡️  Viking Documenter: Scanned ${files.length} file(s) in ${target}`);
  fs.writeFileSync(outPath, designMd);
  console.log(`✅ DESIGN.md has been forged at ${outPath}`);
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run();
}
