# OpenCode Go usage (Pi)

Adds an **OpenCode Go** account card to Paseo's Usage view for the subscription you use through
[Pi](https://pi.dev). Paseo already ships an `opencode-go` source, but that one reads the OpenCode
CLI's login store (`~/.local/share/opencode/auth.json`, entry `{ type: "api", key }`). Pi keeps the
same provider in its own store (`~/.pi/agent/auth.json`, entry `{ type: "api_key", key }`), which the
built-in source does not read. This plugin fills that gap.

## What it reads

`~/.pi/agent/auth.json` → `opencode-go.key` (override the base directory with `PI_CODING_AGENT_DIR`), then
calls `https://opencode.ai/zen/go/v1/usage` and shows the **Rolling**, **Weekly** and **Monthly**
windows. The key is never logged, stored in a report, or written back to the file.

## Install

```bash
paseo plugin install /path/to/pi-opencode-go-usage
```

Needs Paseo 0.11.0+ (`server.registerUsageSource`).
