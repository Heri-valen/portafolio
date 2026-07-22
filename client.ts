/// <reference types "@fresh/core/server" />

import { start } from "@fresh/core/client";
import manifest from "./fresh.gen.ts";

await start(manifest);
