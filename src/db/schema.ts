import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const uf = sqliteTable("uf", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull().unique()
});

export const cidade = sqliteTable("cidade", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  ufId: integer("uf_id")
    .notNull()
    .references(() => uf.id, { onDelete: "restrict", onUpdate: "cascade" })
});

export const noticia = sqliteTable("noticia", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  texto: text("texto").notNull(),
  cidadeId: integer("cidade_id")
    .notNull()
    .references(() => cidade.id, { onDelete: "restrict", onUpdate: "cascade" }),
  dataCriacao: text("data_criacao")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
});

export const ufRelations = relations(uf, ({ many }) => ({
  cidades: many(cidade)
}));

export const cidadeRelations = relations(cidade, ({ one, many }) => ({
  uf: one(uf, {
    fields: [cidade.ufId],
    references: [uf.id]
  }),
  noticias: many(noticia)
}));

export const noticiaRelations = relations(noticia, ({ one }) => ({
  cidade: one(cidade, {
    fields: [noticia.cidadeId],
    references: [cidade.id]
  })
}));

export type Uf = typeof uf.$inferSelect;
export type Cidade = typeof cidade.$inferSelect;
export type Noticia = typeof noticia.$inferSelect;