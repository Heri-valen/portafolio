import { App, staticFiles } from "fresh";
import { Builder } from "fresh/dev";

const builder = new Builder({});

await builder.listen(() =>
  import("./app.ts") as Promise<{ app: App }>
);
