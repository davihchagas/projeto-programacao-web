import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CrudNoticiasPage.module.css";

import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export default function CrudNoticiasPage() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [ufFiltro, setUfFiltro] = useState("");
  const [autorFiltro, setAutorFiltro] = useState("");

  const filtradas = noticias.filter((n) => {
    const matchBusca = n.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());

    const matchStatus =
      !status ||
      (status === "publicada" && n.publicada) ||
      (status === "rascunho" && !n.publicada);

    const cidade = cidades.find((c) => c.id === n.cidadeId);
    const uf = ufs.find((u) => u.id === cidade?.ufId);

    const matchUF =
      !ufFiltro || uf?.id === Number(ufFiltro);

    const matchAutor =
      !autorFiltro ||
      n.autorId === Number(autorFiltro);

    return matchBusca && matchStatus && matchUF && matchAutor;
  });

  function handleDelete(id: number) {
    if (!window.confirm("Excluir notícia?")) return;
    alert("Notícia excluída (simulação)");
  }

  function togglePublicacao(publicada: boolean) {
    if (
      !window.confirm(
        publicada
          ? "Despublicar notícia?"
          : "Publicar notícia?"
      )
    )
      return;

    alert(publicada ? "Despublicada" : "Publicada");
  }

  return (
    <PageLayout title="Notícias">
      <div className={styles.container}>
        
        {/* FILTROS */}
        <div className={styles.filters}>
          <input
            placeholder="Buscar título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="publicada">Publicadas</option>
            <option value="rascunho">Rascunhos</option>
          </select>

          <select
            value={ufFiltro}
            onChange={(e) => setUfFiltro(e.target.value)}
          >
            <option value="">UF</option>
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.id}>
                {uf.sigla}
              </option>
            ))}
          </select>

          <select
            value={autorFiltro}
            onChange={(e) =>
              setAutorFiltro(e.target.value)
            }
          >
            <option value="">Autor</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
              </option>
            ))}
          </select>
        </div>

        {/* TABELA */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>UF</th>
              <th>Status</th>
              <th>Data</th>
              <th>Views</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((n) => {
              const autor = usuarios.find(
                (u) => u.id === n.autorId
              );

              const cidade = cidades.find(
                (c) => c.id === n.cidadeId
              );

              const uf = ufs.find(
                (u) => u.id === cidade?.ufId
              );

              return (
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td>{n.titulo}</td>
                  <td>{autor?.nome}</td>
                  <td>{uf?.sigla}</td>
                  <td>
                    {n.publicada
                      ? "Publicada"
                      : "Rascunho"}
                  </td>
                  <td>{n.criadoEm}</td>
                  <td>{n.visualizacoes}</td>

                  <td className={styles.actions}>
                    <Link to={`/noticia/${n.id}`}>
                      👁
                    </Link>

                    <Link
                      to={`/admin/noticias/${n.id}/editar`}
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() =>
                        togglePublicacao(n.publicada)
                      }
                    >
                      {n.publicada ? "🚫" : "✅"}
                    </button>

                    <button
                      onClick={() => handleDelete(n.id)}
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