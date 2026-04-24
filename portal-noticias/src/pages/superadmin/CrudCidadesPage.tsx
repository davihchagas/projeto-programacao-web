import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CrudCidadesPage.module.css";

import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { noticias } from "../../data/noticias";

export default function CrudCidadesPage() {
  const [busca, setBusca] = useState("");
  const [ufFiltro, setUfFiltro] = useState("");

  const filtradas = cidades.filter((c) => {
    const matchBusca = c.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const matchUF =
      !ufFiltro || c.ufId === Number(ufFiltro);

    return matchBusca && matchUF;
  });

  function handleDelete(id: number) {
    const confirm = window.confirm(
      "Deseja excluir esta cidade?"
    );
    if (!confirm) return;

    alert("Cidade excluída (simulação)");
  }

  return (
    <PageLayout title="Cidades">
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Cidades</h2>

          <Link
            to="/admin/cidades/nova"
            className={styles.newButton}
          >
            + Nova Cidade
          </Link>
        </div>

        {/* FILTROS */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Buscar cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            value={ufFiltro}
            onChange={(e) =>
              setUfFiltro(e.target.value)
            }
          >
            <option value="">Todas UFs</option>
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
              <th>ID</th>
              <th>Nome</th>
              <th>UF</th>
              <th>Qtd. Notícias</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((c) => {
              const uf = ufs.find(
                (u) => u.id === c.ufId
              );

              const qtdNoticias = noticias.filter(
                (n) => n.cidadeId === c.id
              ).length;

              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nome}</td>
                  <td>{uf?.sigla}</td>
                  <td>{qtdNoticias}</td>

                  <td className={styles.actions}>
                    <Link
                      to={`/admin/cidades/${c.id}/editar`}
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() => handleDelete(c.id)}
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