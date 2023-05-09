import { serve } from "./deps.ts";
import { config } from "./config/dev.ts";

const s = serve(`0.0.0.0:${config.port}`);
const body = new TextEncoder().encode("Hello World\n");

console.log(`Server started on port ${config.port}`);
for await (const req of s) {
  req.respond({ body });
}
