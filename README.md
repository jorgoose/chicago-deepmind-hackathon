# Cider

**Brew iOS apps in the cloud.**

macOS sandboxes as a service — for AI agents, for developers, for anyone. Build, compile, and test iOS apps from any machine. No Mac required.

```bash
cider google login
cider create --repo "https://github.com/you/your-app.git"
cider sbx-a1b2c3 --emulator ios
cider sbx-a1b2c3 --google
# You're building an iPhone app. From a Windows laptop. With AI.
```

---

## The Problem

AI just mass-produced keys to a locked building.

GitHub Copilot has 20M users. Cursor hit $1.2B ARR in 16 months. 84% of developers now use AI coding tools. The *skill* barrier to building software is collapsing — developers complete tasks 55% faster, AI generates 46% of their code, and PR cycle times have dropped 75%.

**The result: app development is exploding.** Monthly new iOS app launches have grown 7x since January 2022, from ~2,000/month to 14,700/month by January 2026. The steepest acceleration starts in early 2025, directly tracking the rise of AI-assisted coding.

But here's the thing nobody talks about:

**Every single one of those apps required a Mac to build.**

Xcode is macOS-only. There is no official way to compile and submit an iOS app without Apple hardware. A developer using Cursor on a $300 Windows laptop can write a complete iOS app in an afternoon — and then hit a wall. To compile it, test it, and ship it, they need a $600+ Mac Mini or a $1,099+ MacBook Air, plus a $99/year Apple Developer Program membership.

This is the hardest platform lock-in in mainstream software development, and it's gating access to a **$1.3 trillion ecosystem** with 36 million registered developers and 1.8 billion active devices.

The math:
- **47.2 million** developers worldwide
- Only **33%** use macOS professionally (Stack Overflow 2024)
- That's **~31 million developers** locked out of the most valuable app ecosystem on the planet

AI lowered the drawbridge. The moat is now the hardware.

---

## The Value Equation

People pay in proportion to:

```
            Dream Outcome  ×  Perceived Likelihood
Value  =  ——————————————————————————————————————————
              Time Delay   ×   Effort & Sacrifice
```

### Dream Outcome: Maximum

Ship an iOS app to the App Store. Reach 1.8 billion Apple devices. Participate in a $1.3 trillion economy. For indie developers, freelancers, students, and developers in emerging markets — this is a career-defining unlock.

### Perceived Likelihood: Dramatically Higher

This isn't "learn Swift and maybe figure it out." An AI agent builds the app *for you*. You describe what you want in a terminal prompt. Gemini writes the Swift, runs `xcodebuild`, reads the errors, fixes them, and keeps going until it compiles. The build-error-fix loop — the part that stops most beginners — is handled autonomously.

### Time Delay: Near Zero

No hardware to buy. No Xcode to download (40GB). No environment to configure. No Apple Developer account to wait 48 hours for approval.

`cider create`. Type a prompt. The agent builds. Minutes, not days.

### Effort & Sacrifice: Minimal

- No Mac purchase ($600-$1,300+)
- No macOS learning curve
- No Xcode learning curve
- No Swift learning curve
- No provisioning profile hell
- No "which simulator do I pick"
- No disk space management (Xcode eats 40GB+)

You bring a terminal and an idea. Cider handles the rest.

**The result: value goes to infinity.** Massive dream outcome, high likelihood of success, near-zero delay, near-zero effort. This is why the product works.

---

## How It Works

Cider has two interfaces: a **CLI** (the primary product) and a **web dashboard** (the companion). The CLI is what developers and AI agents use. The dashboard is what you look at.

### The CLI — the product

The CLI is a single Go binary. It manages sandbox lifecycle, authenticates with Gemini, boots simulators, and drops you into an agent session where you describe what to build and the AI does it.

```
cider create                         Create a new sandbox
cider create --repo <url>            Create sandbox with repo cloned
cider status                         Check sandbox connection & info
cider login                          Open dashboard login in browser
cider google login                   Authenticate with Gemini API key
cider <ID> --emulator ios            Boot iOS simulator
cider <ID> --google                  Start Gemini agent session
```

**This is the interface that matters for agents.** An AI coding agent (Cursor, Claude Code, Copilot Workspace, or any custom agent) can call `cider create`, get a sandbox ID, and use the sandbox API to compile and test iOS code. The CLI is the programmatic entry point to Apple's build toolchain — without needing a Mac.

#### Agent flow

```
Agent calls: cider create --repo "https://github.com/..."
  → Sandbox spins up, repo cloned, returns sandbox ID

Agent calls sandbox API directly:
  POST /files/write   → write Swift files
  POST /exec          → xcodebuild, xcrun simctl install, xcrun simctl launch
  GET  /screenshot    → capture simulator screen
  POST /exec          → read build errors, iterate

Agent ships the app. User never touches Xcode.
```

#### Human flow

```bash
$ cider google login
  Enter your Gemini API key: ****
  ✓ API key saved

$ cider create
  ✓ Connected to sandbox
  ID:           sbx-k8m2q1
  macOS:        15.2
  Xcode:        Xcode 16.2
  Simulators:   none booted

$ cider sbx-k8m2q1 --emulator ios
  ✓ iPhone 16 booted

$ cider sbx-k8m2q1 --google

  🍺 Cider
  Brew iOS apps in the cloud

  Type your prompt. The agent will build your iOS app.

  > Build a tip calculator with 15%, 18%, 20%, and 25% options

  ⚡ create_xcode_project TipCalc
  ✓ done
  ⚡ list_files TipCalc
  ✓ done
  ⚡ create_file TipCalc/TipCalc/ContentView.swift
  ✓ done
  ⚡ execute_command $ xcodebuild -project TipCalc.xcodeproj -scheme TipCalc ...
  ✓ done
  ⚡ get_screenshot
  ✓ done

  Your tip calculator is running in the simulator.

  ✓ Agent finished
```

### The Dashboard — the companion

The web dashboard is a 4-panel Next.js app that gives you a visual window into what the agent is doing. It's complementary — you don't *need* it to build apps, but it makes the experience tangible.

| Panel | What It Shows |
|---|---|
| **Chat** | Prompt input + agent responses |
| **Build Log** | Streaming `xcodebuild` output — errors red, success green |
| **Agent Activity** | Timeline of every tool call with status |
| **Simulator** | Live screenshot of the app in an iPhone frame |

The dashboard connects to the same sandbox API the CLI uses. It's a viewer, not a controller. The CLI (or any agent) does the work; the dashboard shows it happening.

### The Sandbox API — the foundation

Everything runs through a FastAPI server on the Mac. Both the CLI and dashboard are clients of this API.

| Endpoint | Purpose |
|---|---|
| `GET /status` | macOS version, Xcode version, booted simulators, disk |
| `POST /exec` | Run any shell command, get stdout/stderr/exit_code |
| `POST /files/write` | Create or overwrite a file |
| `POST /files/read` | Read file contents |
| `POST /files/list` | List directory contents |
| `POST /files/mkdir` | Create directories |
| `GET /screenshot` | Capture iOS Simulator screen (PNG) |
| `POST /simulator/boot` | Boot a simulator device |
| `POST /project/create` | Copy Xcode template, rename, return path |
| `WS /ws/exec` | Stream command output line-by-line |

### The 7 Agent Tools

The Gemini agent has 7 tools, each mapped to a sandbox API call:

| Tool | Maps To |
|---|---|
| `create_xcode_project(name)` | `POST /project/create` |
| `create_file(path, content)` | `POST /files/write` |
| `read_file(path)` | `POST /files/read` |
| `list_files(path)` | `POST /files/list` |
| `execute_command(command)` | `POST /exec` |
| `get_screenshot()` | `GET /screenshot` |
| `get_sandbox_status()` | `GET /status` |

The agent loops up to 20 iterations: Gemini decides what to do, we execute the tool on the Mac, return the result, Gemini continues. Build fails? It reads the errors, fixes the code, rebuilds.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Any Machine (Windows, Linux, Mac)                           │
│                                                              │
│  ┌──────────────────────┐    ┌───────────────────────────┐  │
│  │  CLI (Go binary)     │    │  Dashboard (Next.js)      │  │
│  │                      │    │                           │  │
│  │  cider create        │    │  ┌──────┐ ┌───────────┐  │  │
│  │  cider <ID> --google │    │  │ Chat │ │ Build Log │  │  │
│  │                      │    │  └──────┘ └───────────┘  │  │
│  │  Gemini agent loop   │    │  ┌──────┐ ┌───────────┐  │  │
│  │  (7 tools, 20 iter)  │    │  │Agent │ │ Simulator │  │  │
│  └──────────┬───────────┘    │  │ Log  │ │ Screenshot│  │  │
│             │                │  └──────┘ └───────────┘  │  │
│             │                └─────────────┬─────────────┘  │
│             │                              │                │
│             └──────────┬───────────────────┘                │
│                        │  HTTP / WebSocket                  │
└────────────────────────┼────────────────────────────────────┘
                         │  Tailscale (peer-to-peer)
┌────────────────────────┼────────────────────────────────────┐
│  Mac Sandbox           │                                    │
│                        ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FastAPI (port 8000)                                 │  │
│  │                                                      │  │
│  │  /exec, /files/*, /project/create, /screenshot,      │  │
│  │  /simulator/boot, /status, /ws/exec                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  Xcode 16 · iOS Simulator · SwiftUI Template               │
└────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Mac (sandbox server)

```bash
cd server
pip install -r requirements.txt

# Create the Xcode template project
# Open Xcode → New Project → iOS App → SwiftUI → name it "CiderTemplate" → save to ~/CiderTemplate

# Boot a simulator
xcrun simctl boot "iPhone 16"
open -a Simulator

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 2. Any machine (CLI)

```bash
cd cli
go build -o cider .

# Authenticate
./cider google login

# Set sandbox URL (Tailscale IP of the Mac)
export CIDER_API_URL=http://<tailscale-ip>:8000

# Create sandbox and start building
./cider create
./cider <ID> --emulator ios
./cider <ID> --google
```

### 3. Optional: Dashboard

```bash
cd client
echo 'SANDBOX_URL=http://<tailscale-ip>:8000' > .env.local
echo 'GEMINI_API_KEY=<your-key>' >> .env.local
npm install && npm run dev
```

Open `http://localhost:3000` to watch the agent work visually.

---

## The Bigger Picture

Cloud Mac services already exist (MacStadium, MacinCloud, AWS EC2 Mac). Their entire business model validates the premise: developers need Mac access but don't own Macs.

But those services sell raw VMs. You still need to know Xcode, Swift, provisioning profiles, simulator management, and the full iOS toolchain. They're infrastructure for DevOps teams, not products for developers.

Cider is the layer above. The CLI is the product. The Mac is invisible infrastructure. You don't SSH into a Mac or remote-desktop into Xcode — you run `cider create` and talk to an AI agent that happens to have a Mac behind it.

**For agents**, the sandbox API is a tool. Cursor, Claude Code, or any custom agent can call it programmatically to compile and test iOS code as part of a larger workflow.

**For humans**, the CLI + dashboard makes the whole thing feel like magic. You type what you want, watch it build, and see the app running on a simulated iPhone.

**AI collapsed the skill barrier. Cider collapses the hardware barrier. What's left is just the idea.**

---

## Tech Stack

| Component | Technology |
|---|---|
| CLI | Go (single binary, zero dependencies) |
| Sandbox server | Python, FastAPI, uvicorn |
| Dashboard | Next.js 16, React 19, Tailwind CSS 4 |
| AI agent | Gemini 2.5 Pro (function calling) |
| Networking | Tailscale (peer-to-peer WireGuard) |
| iOS toolchain | Xcode 16, xcrun simctl, xcodebuild |

---

*Built for the Google DeepMind Hackathon 2025 in Chicago.*
