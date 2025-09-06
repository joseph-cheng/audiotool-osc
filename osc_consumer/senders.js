import OSC from "osc-js"

export function initSenders(nexus, osc) {
  const senders = [
    {
      field: nexus.queryEntities.ofTypes("mixerOut").getOne().fields.postGain,
      handler: handleGainUpdate
    }
  ]

  for (const sender of senders) {
    if (sender.field != undefined) {
      nexus.events.onUpdate(sender.field, (newValue) => sender.handler(newValue, osc), false);
    }
  }
}

function handleGainUpdate(newValue, osc) {
  const gain = newValue;
  const msg = new OSC.Message('/mixer/gain', gain);
  osc.send(msg);
  console.log('Sent /mixer/gain = ', gain);
}