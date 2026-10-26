#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🛡️  Viking Design Framework Installer');
console.log('------------------------------------');

const sourceDir = path.join(__dirname, '..');
const skillDir = path.join(os.homedir(), '.claude', 'skills', 'viking-design');

// Only what the skill needs at runtime. Tests, docs, and the CLI stay in the repo.
const PAYLOAD = ['SKILL.md', 'LICENSE', 'agents', 'reference', 'examples', 'scripts'];

function setup() {
  try {
    fs.mkdirSync(skillDir, { recursive: true });

    for (const item of PAYLOAD) {
      const from = path.join(sourceDir, item);
      if (!fs.existsSync(from)) continue;
      fs.cpSync(from, path.join(skillDir, item), { recursive: true, force: true });
    }

    console.log(`> Installed to: ${skillDir}`);
    console.log('\n✅ Viking Design Framework is ready!');
    console.log('Type "/viking-design" in Claude Code to begin.');
    console.log('Using Gemini CLI? Run: npx skills add kartooner/viking-design');
  } catch (err) {
    console.error('❌ Installation failed:', err.message);
    process.exitCode = 1;
  }
}

setup();
