CREATE TABLE IF NOT EXISTS equipamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    serieNumber TEXT,
    status TEXT,
    ip TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS oid (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipamento_id INTEGER,
    oid TEXT NOT NULL,
    description TEXT,
    mask TEXT,
    type TEXT,
    FOREIGN KEY (equipamento_id) REFERENCES equipamento (id)
);