#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');

// Each Council step, in chain order. `command` matches the /viking-design subcommand.
const COUNCIL = [
  { step: 1, name: 'Odin', role: 'Creative Director', command: 'chain', file: 'agents/viking-director.md', does: 'Full chain, strategy to handoff (starts here)' },
  { step: 2, name: 'Mimir', role: 'UX Researcher', command: 'gate', file: 'agents/viking-researcher.md', does: 'The 5 Gates: is AI the right tool?' },
  { step: 3, name: 'Tyr', role: 'Creative Strategist', command: 'frame', file: 'agents/viking-strategist.md', does: 'Design brief, user hats, opportunity sizing' },
  { step: 4, name: 'Heimdall', role: 'Systems Architect', command: 'map', file: 'agents/viking-architect.md', does: 'Things, States, and Rules' },
  { step: 5, name: 'Loki', role: 'Flow Designer', command: 'shape', file: 'agents/viking-flow-designer.md', does: 'Task flows and UI recipes' },
  { step: 6, name: 'Bragi', role: 'Content Designer', command: 'content', file: 'agents/viking-content-designer.md', does: 'UX copy with the Sandwich Pattern' },
  { step: 7, name: 'Thor', role: 'Handoff Specialist', command: 'craft', file: 'agents/viking-handoff-specialist.md', does: 'Component contracts and QA checklists' }
];

const ALIASES = { polish: 'audit', help: '', '--help': '', '-h': '' };

function help() {
  const rows = COUNCIL.map(c => `  ${c.command.padEnd(9)} ${c.step}. ${`${c.name} (${c.role})`.padEnd(32)} ${c.does}`);
  console.log(`
Viking Design Framework
-----------------------
In Claude Code or Gemini CLI, type /viking-design <command>.
From a terminal, run viking-design <command>.

The Council:
${rows.join('\n')}

Tools:
  audit     1. Odin: AI Slop Test. Runs the slop detector on [path] (default: .)
  document  Draft a DESIGN.md from [path]'s tokens (default: .)

Worked example: ${path.join(root, 'examples', 'expense-receipts.md')}
`);
}

function runScript(script, args) {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', script), ...args], { stdio: 'inherit' });
  if (result.error) {
    console.error(`❌ Error: ${result.error.message}`);
    return 1;
  }
  return result.status ?? 1;
}

function main(argv) {
  let cmd = (argv[0] || '').toLowerCase();
  if (cmd in ALIASES) cmd = ALIASES[cmd];
  const rest = argv.slice(1);

  if (!cmd) {
    help();
    return 0;
  }

  if (cmd === 'audit') {
    console.log('🛡️  Activating Eye of Mimir (deterministic slop detection)...\n');
    const status = runScript('viking-detect.mjs', rest.length ? rest : ['.']);
    console.log('\nNext: run /viking-design audit in your AI tool for 1. Odin\'s full critique.');
    return status;
  }

  if (cmd === 'document') {
    console.log('🛡️  Activating Viking Documenter...');
    return runScript('viking-document.mjs', rest);
  }

  const member = COUNCIL.find(c => c.command === cmd);
  if (member) {
    if (cmd === 'chain') {
      console.log(`Activating the full Council: ${COUNCIL.map(c => `${c.step}. ${c.name}`).join(' -> ')}`);
    } else {
      console.log(`Invoking ${member.step}. ${member.name} (${member.role})...`);
    }
    console.log(`Profile: ${path.join(root, member.file)}`);
    console.log(`Run /viking-design ${cmd} in Claude Code or Gemini CLI to start this step.`);
    return 0;
  }

  console.error(`Unknown Viking command: ${cmd}`);
  help();
  return 1;
}

process.exitCode = main(process.argv.slice(2));
