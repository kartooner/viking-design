import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { scan, collectFiles } from '../scripts/viking-detect.mjs';
import { extractTokens, mergeTokens, renderDesignMd } from '../scripts/viking-document.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixtures = path.join(root, 'tests', 'fixtures');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf-8');
const cli = args => spawnSync(process.execPath, [path.join(root, 'bin', 'viking.js'), ...args], { encoding: 'utf-8' });

test('detector walks folders and flags every rule in every file', () => {
  const violations = scan([path.join(fixtures, 'slop')]);
  const byFile = name => violations.filter(v => v.file.endsWith(name)).map(v => v.rule).sort();

  assert.deepEqual(byFile('hero.css'), ['Excessive Inter Usage', 'Generic AI Purple Gradient', 'Gradient Text']);
  // card.css is scanned second; a stateful /g regex would miss its Gradient Text.
  assert.deepEqual(byFile('card.css'), ['Gradient Text', 'Side-Stripe Accents']);
});

test('detector passes clean files', () => {
  assert.equal(scan([path.join(fixtures, 'clean')]).length, 0);
});

test('detector skips node_modules', () => {
  const files = collectFiles(root);
  assert.ok(files.length > 0);
  assert.ok(files.every(f => !f.includes(`${path.sep}node_modules${path.sep}`)));
});

test('documenter extracts real tokens', () => {
  const css = fs.readFileSync(path.join(fixtures, 'clean', 'tokens.css'), 'utf-8');
  const tokens = mergeTokens([extractTokens(css)]);
  assert.equal(tokens.colors.get('--accent'), '#b4532a');
  assert.deepEqual(tokens.radii, ['8px']);

  const md = renderDesignMd('fixture', tokens, 1);
  assert.match(md, /`--surface` \| `#faf8f5`/);
  assert.match(md, /Geist/);
});

test('CLI prints the Discovery Map and exits 0', () => {
  const result = cli([]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Mimir/);
});

test('CLI audit exits 1 on slop and 0 on clean', () => {
  assert.equal(cli(['audit', path.join(fixtures, 'slop')]).status, 1);
  assert.equal(cli(['audit', path.join(fixtures, 'clean')]).status, 0);
});

test('CLI rejects unknown commands', () => {
  assert.equal(cli(['summon-kraken']).status, 1);
});

test('every file SKILL.md points to exists', () => {
  const skill = read('SKILL.md');
  const refs = [...skill.matchAll(/`((?:agents|reference|examples)\/[\w.-]+\.md)`/g)].map(m => m[1]);
  assert.ok(refs.length >= 7);
  for (const ref of refs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `missing ${ref}`);
  }
});

test('docs use one command name: /viking-design', () => {
  for (const file of ['SKILL.md', 'README.md', 'reference/tooling.md', 'docs/DISTRIBUTION.md']) {
    assert.doesNotMatch(read(file), /\/vikingdesign\b/, file);
  }
});

test('every SKILL.md subcommand is known to the CLI', () => {
  const commands = new Set([...read('SKILL.md').matchAll(/`\/viking-design (\w+)`/g)].map(m => m[1]));
  assert.ok(commands.size >= 9);
  for (const cmd of commands) {
    // --stdout keeps `document` from writing a DESIGN.md into the fixtures.
    const result = cli([cmd, path.join(fixtures, 'clean'), '--stdout']);
    assert.doesNotMatch(result.stderr, /Unknown Viking command/, cmd);
    assert.equal(result.status, 0, cmd);
  }
});
