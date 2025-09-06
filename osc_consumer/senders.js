import OSC from "osc-js"

export function initSenders(nexus, osc) {
  nexus.events.onUpdate(nexus.queryEntities.ofTypes("mixerOut").getOne().fields.postGain, (newValue) => handleGainUpdate(newValue, osc), false);
}

function handleGainUpdate(newValue, osc) {
  const gain = newValue;
  const msg = new OSC.Message('/mixer/gain', gain);
  osc.send(msg);
  console.log('Sent /mixer/gain = ', gain);
}