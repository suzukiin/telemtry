const db = require('../db/database').db;

exports.getAllEquipamentos = async () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM equipamento", [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

exports.getAllOids = async () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM oid", [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

exports.getEquipamentoById = async (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM equipamento WHERE id = ?", [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

exports.saveEquipamento = async (equipamento) => {
    return new Promise((resolve, reject) => {
        const { brand, model, serieNumber, ip } = equipamento;
        db.run("INSERT INTO equipamento (brand, model, serieNumber,status, ip) VALUES (?, ?, ?, 'offline', ?)", [brand, model, serieNumber, ip], function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ id: this.lastID, ...equipamento });
        });
    });
};

exports.addOidToEquipamento = async (equipamentoId, oidData) => {
    return new Promise((resolve, reject) => {
        const { oid, description, mask, type } = oidData;
        db.run("INSERT INTO oid (equipamento_id, oid, description, mask, type) VALUES (?, ?, ?, ?, ?)", [equipamentoId, oid, description, mask, type], function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ id: this.lastID, ...oidData });
        });
    });
};
