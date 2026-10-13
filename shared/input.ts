import { z } from "zod";

/**
 * The daemon stores this on discovery and hands it back to `fetch()`. It is the only input the
 * source has: the path to Pi's login store on the daemon host.
 */
export const inputSchema = z.object({ path: z.string().min(1) }).strict();
export type Input = z.infer<typeof inputSchema>;
