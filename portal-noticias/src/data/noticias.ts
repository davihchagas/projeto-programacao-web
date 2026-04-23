import type { Noticia } from "../types";

export const noticias: Noticia[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  titulo: `Título da notícia ${i + 1}`,
  subtitulo: `Subtítulo da notícia ${i + 1}`,
  conteudo: `
Parágrafo 1 da notícia ${i + 1}.
Parágrafo 2 da notícia ${i + 1}.
Parágrafo 3 da notícia ${i + 1}.
  `,
  imagemCapa: "https://via.placeholder.com/800x400",
  autorId: (i % 10) + 6,
  cidadeId: (i % 10) + 1,
  tags: [1, 2, 3].filter((_, idx) => idx <= (i % 3)),
  publicada: i < 20,
  criadoEm: "2026-01-01",
  atualizadoEm: "2026-01-02",
  visualizacoes: Math.floor(Math.random() * 1000)
}));