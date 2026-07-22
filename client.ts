/// <reference types "$fresh/src/server/client.ts" />

import { start } from "$fresh/client.ts";
import manifest from "./fresh.gen.ts";

await start(manifest);
