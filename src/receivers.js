// receivers.js

// Initialize OSC → Audiotool routing
export function initReceivers(nexus, osc) {
  // Explicit routes (most reliable)
  osc.on('/mixer/gain', (message) => handleMixerGain(nexus, message))
  osc.on('/mixeraux/roomsize', (message) => handleReverbRoomSize(nexus, message))
  osc.on('/autoFilter/frequency', (message) => handleAutoFilterFrequency(nexus, message))

  // Optional: deep wildcard to log *everything* you receive (great for debugging)
  // Comment out if too chatty.
  osc.on('/**', (m) => {
    // console.log('[OSC]', m.address, m.args)
  })
}

// Handlers

function handleReverbRoomSize(nexus, message) {
  nexus.modify((t) => {
    const entity = t.entities.ofTypes('mixerReverbAux').getOne()
    if (entity) {
      // roomSizeFactor expects a float in its valid range
      t.update(entity.fields.roomSizeFactor, message.args[0])
    }
  })
}

function handleMixerGain(nexus, message) {
  nexus.modify((t) => {
    const mixer = t.entities.ofTypes('mixerOut').getOne()
    if (mixer) {
      // postGain expects the mixer output gain value
      t.update(mixer.fields.postGain, message.args[0])
    }
  })
}

function handleAutoFilterFrequency(nexus, message) {
  nexus.modify((t) => {
    const entity = t.entities.ofTypes('autoFilter').getOne()
    if (entity) {
      // frequencyHz expects a number (Hz)
      t.update(entity.fields.frequencyHz, message.args[0])
    }
  })
}
