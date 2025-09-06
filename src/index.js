import * as OSC from "osc-js";
import { createAudiotoolClient } from "@audiotool/nexus"
import { initReceivers } from "./receivers.js"
import { initSenders } from "./senders.js"

const osc = new OSC.default({plugin: new OSC.default.DatagramPlugin({ send: { port: 1131, host: '127.0.0.1' } })});
const client = await createAudiotoolClient({pat: process.env.API_KEY });

const nexus = await client.createSyncedDocument({
  mode: "online",
  project: process.env.PROJECT_URL,
});

await nexus.start();

osc.open({ port: 1130 });

osc.on("open", () => {
  console.log("OSC connection opened");
  initReceivers(nexus, osc);
  initSenders(nexus, osc);
});