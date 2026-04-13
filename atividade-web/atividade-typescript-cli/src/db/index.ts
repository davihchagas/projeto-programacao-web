import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sql } from "drizzle-orm";

import {
  cidade,
  noticia,
  uf,
  tag,
  noticiaTag
} from "./schema";

const sqlite = new Database("database.sqlite");

sqlite.pragma("foreign_keys = ON");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS uf (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sigla TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS cidade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    uf_id INTEGER NOT NULL,
    FOREIGN KEY (uf_id)
      REFERENCES uf(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
  );

  CREATE TABLE IF NOT EXISTS noticia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    texto TEXT NOT NULL,
    cidade_id INTEGER NOT NULL,
    data_criacao TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cidade_id)
      REFERENCES cidade(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
  );

  CREATE TABLE IF NOT EXISTS tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS noticia_tag (
    noticia_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,

    PRIMARY KEY (noticia_id, tag_id),

    FOREIGN KEY (noticia_id)
      REFERENCES noticia(id)
      ON DELETE CASCADE,

    FOREIGN KEY (tag_id)
      REFERENCES tag(id)
      ON DELETE CASCADE
  );
`);

export const db = drizzle(sqlite);

export function getDatabaseReadyMessage() {
  return "Banco de dados pronto.";
}

export {
  sqlite,
  sql,
  uf,
  cidade,
  noticia,
  tag,
  noticiaTag
};