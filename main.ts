import { App } from "fresh";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

const app = new App(manifest, config);
app.listen();
