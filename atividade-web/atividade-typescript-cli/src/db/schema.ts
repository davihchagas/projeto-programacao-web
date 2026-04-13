import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

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
    .references(() => uf.id)
});

export const noticia = sqliteTable("noticia", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  texto: text("texto").notNull(),
  cidadeId: integer("cidade_id")
    .notNull()
    .references(() => cidade.id),

  dataCriacao: text("data_criacao")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
});

export const tag = sqliteTable("tag", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull().unique()
});

export const noticiaTag = sqliteTable(
  "noticia_tag",
  {
    noticiaId: integer("noticia_id")
      .notNull()
      .references(() => noticia.id),

    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id)
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.noticiaId, table.tagId]
    })
  })
);

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

export const noticiaRelations = relations(noticia, ({ one, many }) => ({
  cidade: one(cidade, {
    fields: [noticia.cidadeId],
    references: [cidade.id]
  }),

  noticiaTags: many(noticiaTag)
}));

export const tagRelations = relations(tag, ({ many }) => ({
  noticiaTags: many(noticiaTag)
}));

export const noticiaTagRelations = relations(noticiaTag, ({ one }) => ({
  noticia: one(noticia, {
    fields: [noticiaTag.noticiaId],
    references: [noticia.id]
  }),

  tag: one(tag, {
    fields: [noticiaTag.tagId],
    references: [tag.id]
  })
}));