import * as OSC from "osc-js";
import { createAudiotoolClient } from "@audiotool/nexus"
import { handlers } from "./handlers.js"

const osc = new OSC.default({plugin: new OSC.default.DatagramPlugin()});
const client = await createAudiotoolClient({pat: process.env.API_KEY });

const nexus = await client.createSyncedDocument({
  mode: "online",
  project: process.env.PROJECT_URL,
});

await nexus.start();

osc.on("/*", (message) => {
  const handler = handlers[message.address];
  if (handler) handler(nexus, message);
});

osc.open({ port: 1130 });
