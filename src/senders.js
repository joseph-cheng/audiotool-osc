import OSC from "osc-js"

export function initSenders(nexus, osc) {
  const mixer = nexus.queryEntities.ofTypes("mixerOut").getOne();
  if (mixer) {
    nexus.events.onUpdate(mixer.fields.postGain, (newValue) => handleGainUpdate(newValue, osc), false);
  }

  initTonematrixSenders(nexus, osc);
  initStompboxDelaySenders(nexus, osc);
}

function initTonematrixSenders(nexus, osc) {
  // Helper to subscribe to one Tonematrix
  function subscribeTM(tm) {
    const id = tm.location.entityId;
    nexus.events.onUpdate(tm.fields.patternIndex, (newPattern) => {
      handleTMPatternUpdate(id, newPattern, osc);
    }, false);
  }

  // Existing tonematrices
  nexus.queryEntities.ofTypes("tonematrix").get().forEach(subscribeTM);

  // New tonematrices
  nexus.events.onCreate("tonematrix", subscribeTM);
}

function initStompboxDelaySenders(nexus, osc) {
  function subscribeSBD(sbd) {
    const id = sbd.location.entityId;
    nexus.events.onUpdate(sbd.fields.feedbackFactor, (newFeedback) => {
      handleSBDFeedbackUpdate(id, newFeedback, osc);
    }, false);
  } 

  // Existing delay devices
  nexus.queryEntities.ofTypes("stompboxDelay").get().forEach(subscribeSBD);

  // New delay devices
  nexus.events.onCreate("stompboxDelay", subscribeSBD);
}


function handleGainUpdate(newValue, osc) {
  const gain = newValue;
  const msg = new OSC.Message('/mixer/gain', gain);
  osc.send(msg);
  // console.log('Sent /mixer/gain = ', gain);
}

function handleTMPatternUpdate(id, newPattern, osc) {
  const address = `/tonematrix/${id}/pattern`;
  const msg = new OSC.Message(address, newPattern);
  osc.send(msg);
  // console.log(`Sent ${address} =`, newPattern);
}

function handleSBDFeedbackUpdate(id, feedback, osc) {
  const address = `/delay/${id}/feedback`;
  const msg = new OSC.Message(address, feedback);
  osc.send(msg);
  // console.log(`Sent ${address} =`, feedback);
}
