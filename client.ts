/// <reference types "@fresh/core/client" />

import { start } from "@fresh/core/client";
import manifest from "./fresh.gen.ts";

await start(manifest);
