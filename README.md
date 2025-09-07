# audiotool-osc

NodeJS is required, tested on v22.19.0

Download the Audiotool JavaScript SDK from [here](https://rpc.audiotool.com/dev/nexus/audiotool-nexus-0.0.3.tgz) into `src/`

run `npm install audiotool-nexus-0.0.3.tgz`
run `npm install`

Create a `.env` file with the `API_KEY` variable set to a PAT generated [here](https://rpc.audiotool.com/dev/pats/), and the `PROJECT_URL` variable set to the project you want to use from [here](https://beta.audiotool.com/studio)

Run `node --env-file .env index.js` from inside the `src` directory

This should connect to the Audiotool API and run an OSC server on port 1130. OSC commands will be sent by this program to port 1131.

Look at `src/receivers.js` and `src/senders.js` to view the supported API endpoints/OSC commands
