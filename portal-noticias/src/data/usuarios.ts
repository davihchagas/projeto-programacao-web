import type { Usuario } from "../types";

export const usuarios: Usuario[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  nome: `Usuário ${i + 1}`,
  email: `user${i + 1}@email.com`,
  perfil:
    i < 5
      ? "LEITOR"
      : i < 10
      ? "AUTOR"
      : i < 13
      ? "EDITOR"
      : "SUPERADMIN",
  cidadeId: (i % 10) + 1,
  ativo: true,
  criadoEm: "2026-01-01"
}));