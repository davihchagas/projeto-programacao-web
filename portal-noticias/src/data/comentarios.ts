import type { Comentario } from "../types";

export const comentarios: Comentario[] = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  noticiaId: (i % 30) + 1,
  autorId: (i % 10) + 1,
  texto: `Comentário ${i + 1}`,
  criadoEm: "2026-01-01",
  aprovado: i < 25
}));