# Viking Design Framework: GitHub Distribution Guide

To make the Viking Design Framework "installable" like Design with Intent or Impeccably, you need to structure it as a distributable package.

## 1. Preparation for GitHub

Structure your repository like this:

```text
viking-design-framework/
├── SKILL.md                 # Core framework instructions
├── AGENTS.md                # Global agent instructions
├── reference/               # Detailed methodology guides
│   ├── gate.md
│   ├── map.md
│   └── skill-chain.md
├── agents/                  # Specialized agent profiles
│   ├── viking-director.md
│   └── viking-architect.md
├── scripts/                 # (Optional) Automation scripts
└── package.json             # Necessary for npm distribution
```

## 2. The "NPM Install" Experience

To allow users to install it via `npm` or `npx`, you have two main paths:

### Path A: The `npx` Skill Adder (Recommended)
You can create a small script that clones your repo directly into the user's `.gemini/extensions` or `.claude/skills` folder.

**Command Example:**
`npx viking-design add`

### Path B: Global Skill Registration
If you want it to work exactly like Impeccably, your `package.json` should define a binary that copies the files to the local machine's skill directory.

**Example `package.json` snippet:**
```json
{
  "name": "@yourname/viking-design",
  "version": "1.0.0",
  "bin": {
    "viking-design": "./bin/install.js"
  }
}
```

## 3. How to Use (User Instructions)

Include this in your `README.md` so people know how to evoke it:

### Installation
```bash
npm install -g @yourname/viking-design
# or
npx @yourname/viking-design setup
```

### Usage in Gemini CLI / Claude Code
Once installed, you can evoke the framework using:

**1. The Hub:**
`> /vikingdesign`
*Displays the command menu and guides you through the process.*

**2. The 5 Gates:**
`> /vikingdesign gate`
*Starts the interview to determine if your project actually needs AI.*

**3. System Mapping:**
`> /vikingdesign map`
*Activates the Viking Architect to map Things, States, and Rules.*

**4. The Skill Chain:**
`> /vikingdesign chain`
*Hands off the project through the specialized agent roles (Director -> Strategist -> Architect).*

---

## 4. Final Polish for Public Release
1. **License**: Add an MIT license file.
2. **Credits**: Ensure the `SKILL.md` footer explicitly credits Impeccably and Design with Intent.
3. **Screenshots/Examples**: Add a `docs/` folder with examples of a "Viking-styled" `DESIGN.md` output.
