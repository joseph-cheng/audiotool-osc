import * as OSC from "osc-js";
import { createAudiotoolClient } from "@audiotool/nexus"

const osc = new OSC.default({plugin: new OSC.default.DatagramPlugin()});
const client = await createAudiotoolClient({pat: process.env.API_KEY });

const nexus = await client.createSyncedDocument({
  mode: "online",
  project: process.env.PROJECT_URL,
});

await nexus.start();

osc.on('/mixer_gain',message =>{
nexus.modify((t) => {
  const mixer = t.entities.ofTypes("mixerOut").getOne()
  if (mixer != undefined) {
    t.update(mixer.fields.postGain, message.args[0])
  }
})
})
// osc.on('/mixer_gain', message => {
//   console.log(message);
// });

osc.open({ port: 1130 });
