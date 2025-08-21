require('dotenv').config();
const EventEmitter = require('events');
const snmp = require('net-snmp');

class Snmp extends EventEmitter {
    constructor() {
        super();
        this.target = process.env.SNMP_TARGET;
        this.version = snmp.Version2c;
        this.community = process.env.SNMP_COMMUNITY;
        this.session = null;
    }

    config() {
        this.session = snmp.createSession(this.target, this.community, this.version);
        console.log("conectado ao " + this.target);
    }

    getOid(oid) {
        return new Promise((resolve, reject) => {
            this.session.get([oid], (error, varbinds) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
                for (let i = 0; i < varbinds.length; i++) {
                    if (snmp.isVarbindError(varbinds[i])) {
                        console.error(snmp.varbindError(varbinds[i]));
                        return reject(snmp.varbindError(varbinds[i]));
                    } else {
                        return resolve((varbinds[i].value).toString());
                    }
                }
                // Caso nenhum varbind válido seja encontrado
                return reject(new Error("No valid varbinds found"));
            });
        });
    }
}

module.exports = Snmp;