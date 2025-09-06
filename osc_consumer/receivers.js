export function initReceivers(nexus, osc) {
  osc.on("/*", (message) => {
    const handler = handlers[message.address];
    if (handler) handler(nexus, message);
  });
}

const handlers = {
  '/mixer/gain': handleMixerGain,
  '/autoFilter/frequency': handleAutoFilterFrequency,
};

function handleMixerGain(nexus, message) {
  nexus.modify((t) => {
    const mixer = t.entities.ofTypes("mixerOut").getOne();
    if (mixer != undefined) {
        t.update(mixer.fields.postGain, message.args[0]);
    }
  });
}

function handleAutoFilterFrequency(nexus, message) {
  nexus.modify((t) => {
    const entity = t.entities.ofTypes("autoFilter").getOne();
    if (entity != undefined) {
        t.update(entity.fields.frequencyHz, message.args[0]);
    }
  });
}
