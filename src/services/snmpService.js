const Snmp = require('../classes/Snmp');

const snmp = new Snmp();

exports.config = () => {
    snmp.config();
};

exports.getOid = async (oid) => {
    return await snmp.getOid(oid);
};
