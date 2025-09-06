export const handlers = {
  '/masterGain': handleMasterGain,
};

function handleMasterGain(nexus, message) {
  nexus.modify((t) => {
  const mixer = t.entities.ofTypes("mixerOut").getOne()
    if (mixer != undefined) {
        t.update(mixer.fields.postGain, message.args[0]);
    }
  });
}