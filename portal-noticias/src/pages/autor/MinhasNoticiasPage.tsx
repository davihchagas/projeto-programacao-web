import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./MinhasNoticiasPage.module.css";

import { noticias } from "../../data/noticias";

export default function MinhasNoticiasPage() {
  // Mock: autor logado = id 6
  const autorId = 6;

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("todas");

  const minhasNoticias = noticias.filter((n) => n.autorId === autorId);

  const filtradas = minhasNoticias.filter((n) => {
    const matchBusca = n.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());

    const matchStatus =
      status === "todas" ||
      (status === "publicadas" && n.publicada) ||
      (status === "rascunhos" && !n.publicada);

    return matchBusca && matchStatus;
  });

  function handleDelete(id: number) {
    const confirm = window.confirm("Deseja excluir esta notícia?");
    if (!confirm) return;

    alert("Notícia excluída (simulação)");
  }

  return (
    <PageLayout title="Minhas Notícias">
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Minhas Notícias</h2>

          <Link
            to="/autor/noticias/nova"
            className={styles.newButton}
          >
            + Nova Notícia
          </Link>
        </div>

        {/* FILTROS */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="publicadas">Publicadas</option>
            <option value="rascunhos">Rascunhos</option>
          </select>
        </div>

        {/* TABELA */}
        {filtradas.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Status</th>
                <th>Visualizações</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filtradas.map((n) => (
                <tr key={n.id}>
                  <td>{n.titulo}</td>
                  <td>{n.criadoEm}</td>
                  <td>
                    {n.publicada ? "Publicada" : "Rascunho"}
                  </td>
                  <td>{n.visualizacoes}</td>

                  <td className={styles.actions}>
                    <Link to={`/noticia/${n.id}`} title="Ver">
                      👁
                    </Link>

                    <Link
                      to={`/autor/noticias/${n.id}/editar`}
                      title="Editar"
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() => handleDelete(n.id)}
                      title="Excluir"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <p>Você ainda não escreveu nenhuma notícia</p>

            <Link
              to="/autor/noticias/nova"
              className={styles.newButton}
            >
              Criar primeira notícia
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
}