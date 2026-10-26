#!/usr/bin/env node
/**
 * Eye of Mimir: Viking Design Slop Detector
 * Deterministic detection of design anti-patterns.
 *
 * Usage: viking-detect <file-or-folder> [...more]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// No /g flag: these are only used with .test(), and a global regex keeps
// lastIndex between calls, which silently skips matches in later files.
export const RULES = [
  {
    name: 'Generic AI Purple Gradient',
    regex: /linear-gradient\(.*#(?:8b5cf6|a855f7|d946ef).*#(?:3b82f6|6366f1).*\)/i,
    message: 'REJECT: Found generic AI-marketing purple/blue gradient. Use functional, brand-aware colors instead.'
  },
  {
    name: 'Bouncy Animation',
    regex: /transition:.*(?:bounce|elastic|cubic-bezier\(.*0\..*1\..*\))/i,
    message: 'REJECT: Viking law forbids bouncy easing. Use exponential ease-out (ease-out-expo) for resilient motion.'
  },
  {
    name: 'Side-Stripe Accents',
    regex: /border-(?:left|right):\s*[2-9]px/i,
    message: 'REJECT: Side-stripe borders > 1px are banned. Use full borders or background tints.'
  },
  {
    name: 'Gradient Text',
    regex: /background-clip:\s*text/i,
    message: 'REJECT: Gradient text is decorative slop. Use single solid colors and font-weight for emphasis.'
  },
  {
    name: 'Excessive Inter Usage',
    regex: /font-family:.*['"]?Inter['"]?/i,
    message: 'NOTICE: Overused font "Inter" detected. Verify if "Geist" or a high-character alternative is more Viking-appropriate.'
  }
];

export const SCAN_EXTENSIONS = ['.css', '.scss', '.less', '.html', '.htm', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'];
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage']);

export function collectFiles(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  if (!stat.isDirectory()) return [];

  const files = [];
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    const abs = path.join(target, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...collectFiles(abs));
    } else if (SCAN_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(abs);
    }
  }
  return files;
}

export function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return RULES
    .filter(rule => rule.regex.test(content))
    .map(rule => ({ file: filePath, rule: rule.name, message: rule.message }));
}

export function scan(targets) {
  return targets.flatMap(collectFiles).flatMap(scanFile);
}

function run() {
  const targets = process.argv.slice(2);
  if (targets.length === 0) targets.push('.');

  const files = targets.flatMap(collectFiles);
  const violations = files.flatMap(scanFile);

  if (violations.length > 0) {
    console.log('🛡️  EYE OF MIMIR: Design Slop Detected');
    console.log('------------------------------------');
    violations.forEach(v => {
      console.log(`[${v.rule}] ${v.file}: ${v.message}`);
    });
    process.exitCode = 1;
  } else {
    console.log(`✅ No design slop detected in ${files.length} file(s). The Council is pleased.`);
  }
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run();
}
