const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'telemetry.db');
const migrationPath = path.resolve(__dirname, 'migrations.sql');

const db = new sqlite3.Database(dbPath);

const migration = fs.readFileSync(migrationPath, 'utf8');
db.exec(migration, (err) => {
  if (err) {
    console.error('Erro ao executar migration:', err);
  }
});

module.exports = {
  db
};