# Cider Host Setup Guide

Your laptop will host the iOS sandbox environment. Here's the step-by-step setup:

## ✅ Completed

- [x] Python dependencies installed → `server/venv/`
- [x] CLI built → `cli/cider`
- [x] Tart base image available → `sandbox-base`

## 📋 Remaining Setup

### 1. Rename or Configure Base Image

**Option A (Recommended): Rename the base image**
```bash
tart rename sandbox-base cider-base
```

**Option B: Use environment variable (if you prefer to keep sandbox-base)**
```bash
export CIDER_TART_BASE_IMAGE=sandbox-base
```

### 2. Create Required Directories

The server expects these directories for Xcode templates and projects:

```bash
mkdir -p ~/CiderTemplate
mkdir -p ~/CiderProjects
mkdir -p ~/.cider
```

### 3. Install Tailscale (for networking to other machines)

If you'll be running the CLI from a different machine:

```bash
# Install Tailscale
brew install tailscale

# Start Tailscale
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
```

Then on other machines, use: `export CIDER_API_URL=http://<tailscale-ip>:8000`

### 4. Start the Host Server

From the Cider root directory:

```bash
source server/venv/bin/activate
cd server
uvicorn main:app --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 5. Verify Server is Running

In another terminal:

```bash
curl http://localhost:8000/sandboxes
# Should return: []
```

### 6. Build and Test the CLI

```bash
export CIDER_API_URL=http://localhost:8000
cd cli
./cider status
# Should show "Connected"
```

## 🚀 Quick Start (Once Setup Complete)

```bash
# Create a sandbox
./cider create
# Note the ID (e.g., sbx-xyz123)

# Boot iOS simulator
./cider sbx-xyz123 --emulator ios

# Start building with AI (requires GEMINI_API_KEY)
./cider sbx-xyz123 --google

# Stop and clean up
./cider stop sbx-xyz123
```

## 🔧 Environment Variables Reference

```bash
# Base image to clone from (default: cider-base)
export CIDER_TART_BASE_IMAGE=cider-base

# Project root for Xcode projects (default: ~/CiderProjects)
export CIDER_PROJECT_ROOT=~/CiderProjects

# Xcode template path (default: ~/CiderTemplate/CiderTemplate.xcodeproj/..)
export CIDER_TEMPLATE_PATH=~/CiderTemplate

# Server config
export CIDER_HOST=0.0.0.0
export CIDER_PORT=8000

# Timeout for VM commands (seconds, default: 120)
export CIDER_VM_BOOT_TIMEOUT=120
export CIDER_EXEC_TIMEOUT=120

# API endpoints
export CIDER_API_URL=http://localhost:8000  # Change for remote hosts
export GEMINI_API_KEY=your-key-here
```

## ⚠️ Troubleshooting

**"No IP address found"** when creating sandbox
- Make sure sandbox-base is properly configured
- Try: `tart run sandbox-base --no-graphics` manually to test

**"Failed to connect to host server"**
- Check that server is running: `curl http://localhost:8000/sandboxes`
- Verify `CIDER_API_URL` is set correctly

**Tailscale connection issues**
- Ensure both machines are in the same Tailscale network
- Use `tailscale status` to verify connectivity

**Import "cider-base" not found**
- Rename sandbox-base or set `CIDER_TART_BASE_IMAGE=sandbox-base`
