import * as OSC from "osc-js";
import { createAudiotoolClient } from "@audiotool/nexus"
import { handlers } from "./handlers.js"

const osc = new OSC.default({plugin: new OSC.default.DatagramPlugin()});
const client = await createAudiotoolClient({pat: "at_pat_4lAaFOoUp_0prSg1TyxV-AEuSzlL0u-GzbQ4VnT2UWs" });

const nexus = await client.createSyncedDocument({
  mode: "online",
  project: "https://beta.audiotool.com/studio?project=dc2ab279-d4ee-436b-9635-091caa5d7423",
});

await nexus.start();

osc.on("/*", (message) => {
  const handler = handlers[message.address];
  if (handler) handler(nexus, message);
});

osc.open({ port: 1130 });
