const OSC = require("osc-js");

const osc = new OSC({plugin: new OSC.DatagramPlugin()});

osc.on('*', message => {
  console.log(message.args);
});

osc.open({ port: 1130 });
console.log(osc);
