import { createAudiotoolClient } from "@audiotool/nexus"
import OSC from "osc-js"

// --- OSC setup ---
const osc = new OSC({ plugin: new OSC.DatagramPlugin({ send: { port: 1130, host: '127.0.0.1' } }) })
osc.open()

// --- Audiotool setup ---
const client = await createAudiotoolClient({
  pat: 'at_pat_45fUqIdJoOSRGrsqLdYq_3mpOkn_2ZTCC5e5eAAVrqg'
})

const nexus = await client.createSyncedDocument({
  mode: "online",
  project: 'https://beta.audiotool.com/studio?project=13a3dd1d-570c-4fc2-86c8-edd201b137e2',
})

await nexus.start()

// --- Grab mixer and send its postGain every second ---
nexus.modify((t) => {
  const mixer = t.entities.ofTypes("mixerOut").getOne()

  setInterval(() => {
    const gain = mixer.fields.postGain.value
    const msg = new OSC.Message('/postGain', gain)
    osc.send(msg)
    console.log('Sent postGain =', gain)
  }, 1000)
})


