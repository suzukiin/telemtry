const db = require('./db/database');
const server = require('./web/server');
const snmp = require('./services/snmpService');
const mqtt = require('./services/mqttService');

async function main() {
    await server.start();
    snmp.config();
    mqtt.config();
}

main();