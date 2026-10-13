import type { PluginServerContext } from "@getpaseo/plugin/server";

import { inputSchema } from "./shared/input.js";
import { discover, fetchUsage } from "./server/usage.js";

export default function contribute(server: PluginServerContext) {
  server.registerUsageSource({
    id: "pi-opencode-go",
    label: "OpenCode Go (Pi)",
    input: inputSchema,
    // The OpenCode Go quota is account-wide, not per session, so only global discovery is needed.
    discover: (scope) => (scope.kind === "global" ? discover() : Promise.resolve([])),
    fetch: fetchUsage,
  });
  return () => {};
}
