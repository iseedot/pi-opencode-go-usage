# pi-opencode-go-usage

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A [Paseo](https://paseo.dev) plugin that adds an **OpenCode Go** usage card to Paseo's Usage view
for the subscription you use through [Pi](https://pi.dev).

## Why this exists

Paseo already ships an `opencode-go` usage source, but it reads the OpenCode CLI's login store
(`~/.local/share/opencode/auth.json`, entry `{ type: "api", key }`). Pi keeps the same provider in
its own store (`~/.pi/agent/auth.json`, entry `{ type: "api_key", key }`), which the built-in source
does not read. This plugin fills that gap.

## What it does

1. Reads the OpenCode Go API key from Pi's login store:
   `~/.pi/agent/auth.json` → `opencode-go.key`.
2. Calls `https://opencode.ai/zen/go/v1/usage` with that key.
3. Shows the **Rolling**, **Weekly** and **Monthly** quota windows in Paseo's Usage view.

The base directory can be overridden with `PI_CODING_AGENT_DIR`; otherwise it is `$HOME/.pi/agent`.

## Install

```bash
paseo plugin install https://github.com/iseedot/pi-opencode-go-usage
paseo reload
```

Requires Paseo 0.11.0+ (`server.registerUsageSource`).

## Security & privacy

- **Read-only.** It reads one file and makes one HTTPS request; nothing is written back.
- The API key is never logged, included in a report, or stored anywhere.
- Only a stable hash of the login-store path (`hashAccountKey`) is handed to the daemon as the
  account key, so the raw path stays local.
- No telemetry, no other files are touched.

## Development

```bash
npm ci
npm run typecheck
```

The plugin runs from source: point the daemon at this directory (`paseo plugin install <path>`),
then `paseo reload`.

## Files

| Path | Purpose |
| --- | --- |
| `index.server.ts` | Registers the usage source with the Paseo daemon. |
| `server/usage.ts` | Reads Pi's login store, calls the usage API, maps the windows. |
| `shared/input.ts` | The `{ path }` input the daemon hands back to `fetch()`. |

## License

[MIT](./LICENSE) © iseedot
