import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CrudUFPage.module.css";

import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import Button from "../../components/ui/Button";

export default function CrudUFPage() {
  const [busca, setBusca] = useState("");

  const filtradas = ufs.filter((uf) =>
    uf.nome.toLowerCase().includes(busca.toLowerCase()) ||
    uf.sigla.toLowerCase().includes(busca.toLowerCase())
  );

  function handleDelete(id: number) {
    const confirm = window.confirm("Deseja excluir esta UF?");
    if (!confirm) return;

    alert("UF excluída (simulação)");
  }

  return (
    <PageLayout title="Unidades Federativas">
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Unidades Federativas</h2>

          <Link to="/admin/ufs/nova" className={styles.newButton}>
            + Nova UF
          </Link>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Buscar por nome ou sigla..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.search}
        />

        {/* TABELA */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sigla</th>
              <th>Nome</th>
              <th>Qtd. Cidades</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((uf) => {
              const qtdCidades = cidades.filter(
                (c) => c.ufId === uf.id
              ).length;

              return (
                <tr key={uf.id}>
                  <td>{uf.id}</td>
                  <td>{uf.sigla}</td>
                  <td>{uf.nome}</td>
                  <td>{qtdCidades}</td>

                  <td className={styles.actions}>
                    <Link to={`/admin/ufs/${uf.id}/editar`}>
                      ✏️
                    </Link>

                    <Button onClick={() => handleDelete(uf.id)}>
                      🗑
                    </Button>
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