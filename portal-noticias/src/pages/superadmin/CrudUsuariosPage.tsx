import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CrudUsuariosPage.module.css";

import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export default function CrudUsuariosPage() {
  const [busca, setBusca] = useState("");
  const [perfilFiltro, setPerfilFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [ufFiltro, setUfFiltro] = useState("");

  const filtrados = usuarios.filter((u) => {
    const matchBusca =
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase());

    const matchPerfil =
      !perfilFiltro || u.perfil === perfilFiltro;

    const matchStatus =
      !statusFiltro ||
      (statusFiltro === "ativo" && u.ativo) ||
      (statusFiltro === "inativo" && !u.ativo);

    const cidade = cidades.find((c) => c.id === u.cidadeId);
    const uf = ufs.find((uf) => uf.id === cidade?.ufId);

    const matchUF =
      !ufFiltro || uf?.id === Number(ufFiltro);

    return matchBusca && matchPerfil && matchStatus && matchUF;
  });

  function handleDelete(id: number) {
    if (!window.confirm("Excluir usuário?")) return;
    alert("Usuário excluído (simulação)");
  }

  function toggleStatus(ativo: boolean) {
    if (
      !window.confirm(
        ativo ? "Desativar usuário?" : "Ativar usuário?"
      )
    )
      return;

    alert(ativo ? "Desativado" : "Ativado");
  }

  return (
    <PageLayout title="Usuários">
      <div className={styles.container}>
        
        {/* FILTROS */}
        <div className={styles.filters}>
          <input
            placeholder="Buscar nome ou email..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            value={perfilFiltro}
            onChange={(e) =>
              setPerfilFiltro(e.target.value)
            }
          >
            <option value="">Perfil</option>
            <option value="LEITOR">Leitor</option>
            <option value="AUTOR">Autor</option>
            <option value="EDITOR">Editor</option>
            <option value="SUPERADMIN">Admin</option>
          </select>

          <select
            value={statusFiltro}
            onChange={(e) =>
              setStatusFiltro(e.target.value)
            }
          >
            <option value="">Status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>

          <select
            value={ufFiltro}
            onChange={(e) =>
              setUfFiltro(e.target.value)
            }
          >
            <option value="">UF</option>
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.id}>
                {uf.sigla}
              </option>
            ))}
          </select>
        </div>

        {/* TABELA */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Cidade/UF</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((u) => {
              const cidade = cidades.find(
                (c) => c.id === u.cidadeId
              );
              const uf = ufs.find(
                (uf) => uf.id === cidade?.ufId
              );

              return (
                <tr key={u.id}>
                  
                  {/* AVATAR */}
                  <td>
                    <img
                      src={`https://i.pravatar.cc/40?img=${u.id}`}
                      className={styles.avatar}
                    />
                  </td>

                  <td>{u.nome}</td>
                  <td>{u.email}</td>
                  <td>{u.perfil}</td>
                  <td>
                    {cidade?.nome} / {uf?.sigla}
                  </td>
                  <td>
                    {u.ativo ? "Ativo" : "Inativo"}
                  </td>
                  <td>{u.criadoEm}</td>

                  <td className={styles.actions}>
                    <Link
                      to={`/admin/usuarios/${u.id}/editar`}
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() =>
                        toggleStatus(u.ativo)
                      }
                    >
                      {u.ativo ? "🚫" : "✅"}
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                    >
                      🗑
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </PageLayout>
  );
}