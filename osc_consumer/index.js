import * as OSC from "osc-js";
import { createAudiotoolClient } from "@audiotool/nexus"

const osc = new OSC.default({plugin: new OSC.default.DatagramPlugin()});
const client = await createAudiotoolClient({pat: process.env.API_KEY });

const nexus = await client.createSyncedDocument({
  mode: "online",
  project: process.env.PROJECT_URL,
});

await nexus.start();

nexus.modify((t) => {
  const mixer = t.entities.ofTypes("mixerOut").getOne()
  if (mixer != undefined) {
    t.update(mixer.fields.postGain, 0.5)
  }
})

osc.on('*', message => {
  console.log(message.args);
});

osc.open({ port: 1130 });
